import { useCallback, useRef, useState } from 'react';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const API_URL = '/api/chat';

export function useChatStream() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);
  messagesRef.current = messages;

  const send = useCallback(
    async (text: string) => {
      const content = text.trim();
      if (!content || isStreaming) return;

      setError(null);
      setIsStreaming(true);

      const payload: ChatMessage[] = [
        ...messagesRef.current,
        { role: 'user', content },
      ];
      // Show the user message immediately, plus an empty assistant bubble to fill.
      setMessages([...payload, { role: 'assistant', content: '' }]);

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
        });

        if (!res.body) throw new Error('No response stream');

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let acc = '';

        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: 'assistant', content: acc };
            return copy;
          });
        }

        if (!acc.trim()) {
          throw new Error('Empty response');
        }
      } catch (err) {
        console.error(err);
        setError('Something went wrong. Please try again.');
        // Drop the empty assistant bubble on hard failure.
        setMessages((prev) => {
          const copy = [...prev];
          if (copy.length && copy[copy.length - 1].content === '') copy.pop();
          return copy;
        });
      } finally {
        setIsStreaming(false);
      }
    },
    [isStreaming],
  );

  const reset = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return { messages, isStreaming, error, send, reset };
}
