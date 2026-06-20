import { useEffect, useRef, useState } from 'react';
import { useChatStream } from './useChatStream';
import { ChatMessage, TypingIndicator } from './ChatMessage';
import { SuggestedPrompts } from './SuggestedPrompts';
import { profile } from '../../data/portfolio';

export function ChatWidget({ onClose }: { onClose?: () => void }) {
  const { messages, isStreaming, error, send } = useChatStream();
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  const isEmpty = messages.length === 0;
  const lastMsg = messages[messages.length - 1];
  const showTyping = isStreaming && (!lastMsg || lastMsg.content === '');
  const firstName = profile.name.split(' ')[0];

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, showTyping]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    send(input);
    setInput('');
  }

  return (
    <div className="glass-card flex h-[32rem] max-h-[75vh] w-full flex-col overflow-hidden rounded-2xl shadow-2xl shadow-black/50">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-3">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-blue opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent-blue" />
        </span>
        <div className="flex-1">
          <p className="font-display text-body-md font-semibold text-on-surface">
            Ask my resume anything
          </p>
          <p className="text-[11px] text-on-surface-variant opacity-70">
            A RAG chatbot — answers only about {firstName}'s background
          </p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close chat"
            className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-white/10 hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {isEmpty ? (
          <div className="flex h-full flex-col justify-end gap-4">
            <div className="rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-3 text-body-md text-[14px] text-on-surface-variant ring-1 ring-white/5">
              👋 Hi! I'm {firstName}'s resume assistant. Ask me about his experience,
              projects, or skills — I'll answer from his resume.
            </div>
            <SuggestedPrompts onPick={send} disabled={isStreaming} />
          </div>
        ) : (
          <>
            {messages.map((m, i) => (
              <ChatMessage key={i} message={m} />
            ))}
            {showTyping && <TypingIndicator />}
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="px-4 pb-1 text-[12px] text-error" role="alert">
          {error}
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-white/10 p-3">
        <div className="flex items-end gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask about ${firstName}'s experience…`}
            maxLength={1000}
            disabled={isStreaming}
            className="flex-1 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 font-body text-body-md text-[14px] text-on-surface outline-none transition placeholder:text-on-surface-variant/50 focus:border-accent-blue/60 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isStreaming || !input.trim()}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-secondary-container text-white transition hover:bg-accent-blue disabled:cursor-not-allowed disabled:opacity-40"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}
