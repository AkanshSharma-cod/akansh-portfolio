import { primaryStack } from '../data/portfolio';

function StackChips() {
  return (
    <div className="flex shrink-0 gap-gutter pr-gutter">
      {primaryStack.map((item) => (
        <div
          key={item.label}
          className="flex shrink-0 cursor-default items-center gap-3 rounded-full border border-outline-variant/20 bg-surface-container/40 px-6 py-3 transition-colors hover:border-accent-blue/50"
        >
          <span
            className="material-symbols-outlined text-accent-blue"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {item.icon}
          </span>
          <span className="font-label text-label-sm text-on-surface">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/5 bg-surface-container-low/50 py-gutter backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1280px] items-center overflow-hidden px-margin-mobile md:px-margin-desktop">
        <span className="mr-gutter shrink-0 font-label text-label-sm uppercase tracking-[0.2em] text-on-surface-variant">
          Primary Stack
        </span>
        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
          <div className="flex animate-marquee">
            <StackChips />
            <StackChips />
          </div>
        </div>
      </div>
    </section>
  );
}
