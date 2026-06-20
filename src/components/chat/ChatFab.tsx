import { useEffect } from 'react';
import { ChatWidget } from './ChatWidget';

export function ChatFab({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, setOpen]);

  return (
    <>
      {/* Panel */}
      <div
        className={`fixed bottom-28 right-4 z-50 w-[calc(100vw-2rem)] max-w-[420px] origin-bottom-right transition-all duration-300 sm:right-10 ${
          open
            ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
            : 'pointer-events-none translate-y-4 scale-95 opacity-0'
        }`}
        aria-hidden={!open}
      >
        <ChatWidget onClose={() => setOpen(false)} />
      </div>

      {/* Floating action button */}
      <div className="group fixed bottom-10 right-4 z-50 flex items-center gap-4 sm:right-10">
        {!open && (
          <span className="pointer-events-none translate-x-4 rounded-full border border-white/10 bg-surface-container-highest/80 px-5 py-2 font-label text-label-sm text-on-surface opacity-0 shadow-xl backdrop-blur-md transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            Chat with me
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close chat' : 'Open chat'}
          className="glow-button flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-secondary-container/90 text-white shadow-2xl backdrop-blur-lg transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="material-symbols-outlined text-[28px]">
            {open ? 'close' : 'chat_bubble'}
          </span>
        </button>
      </div>
    </>
  );
}
