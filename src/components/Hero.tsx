import { profile } from '../data/portfolio';

export function Hero({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <section
      id="top"
      className="relative mx-auto flex min-h-[90vh] max-w-[1280px] flex-col justify-center px-margin-mobile py-section-gap md:px-margin-desktop"
    >
      <div className="bg-glow-hero" />
      <div className="relative z-10 max-w-4xl">
        <span className="mb-gutter inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container/40 px-4 py-2 font-label text-label-sm text-on-surface-variant">
          <span className="h-2 w-2 rounded-full bg-accent-blue" />
          {profile.name} · Open to AI Engineering roles
        </span>

        <h1 className="mb-gutter font-display text-display-xl-mobile tracking-tight text-on-surface md:text-display-xl">
          Crafting <span className="text-gradient">production AI systems</span>, end&#8209;to&#8209;end
        </h1>

        <p className="mb-gutter max-w-2xl font-body text-body-lg leading-relaxed text-on-surface-variant">
          {profile.tagline}
        </p>

        <div className="flex flex-wrap gap-gutter">
          <a
            href="#work"
            className="glow-button flex items-center gap-3 rounded-lg bg-secondary-container px-10 py-5 font-label text-label-sm text-white"
          >
            View My Work
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </a>
          <button
            type="button"
            onClick={onOpenChat}
            className="flex items-center gap-3 rounded-lg border border-outline/30 px-10 py-5 font-label text-label-sm text-on-surface transition-all duration-300 hover:border-outline hover:bg-surface-container-low"
          >
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            Ask my resume anything
          </button>
        </div>
      </div>
    </section>
  );
}
