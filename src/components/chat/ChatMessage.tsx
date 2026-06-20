import ReactMarkdown from 'react-markdown';
import type { ChatMessage as ChatMessageType } from './useChatStream';

export function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[14px] leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-secondary-container/20 text-secondary'
            : 'rounded-bl-sm bg-white/[0.04] text-on-surface ring-1 ring-white/5'
        }`}
      >
        {isUser ? (
          <span className="whitespace-pre-wrap">{message.content}</span>
        ) : (
          <div className="prose-chat">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-white/[0.04] px-4 py-3 ring-1 ring-white/5">
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-on-surface-variant" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-on-surface-variant" />
        <span className="typing-dot h-1.5 w-1.5 rounded-full bg-on-surface-variant" />
      </div>
    </div>
  );
}
