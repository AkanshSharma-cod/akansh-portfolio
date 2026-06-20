import { profile } from '../data/portfolio';

const links = [
  { href: '#work', label: 'Work' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export function Nav({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <nav className="fixed top-0 left-1/2 z-50 flex w-full max-w-[1280px] -translate-x-1/2 items-center justify-between border-b border-white/5 bg-background/80 px-margin-mobile py-5 backdrop-blur-md md:px-margin-desktop">
      <a
        href="#top"
        className="font-display text-xl font-bold tracking-tight text-on-surface"
      >
        {profile.name}
        <span className="text-accent-blue">.</span>
      </a>

      <div className="hidden items-center gap-gutter md:flex">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="font-body text-body-md text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            {link.label}
          </a>
        ))}
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="ml-base flex items-center gap-2 rounded-lg bg-secondary-container px-gutter py-2.5 font-label text-label-sm text-on-secondary-container transition-all duration-150 hover:shadow-lg hover:shadow-secondary-container/20 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Resume
        </a>
      </div>

      <button
        type="button"
        onClick={onOpenChat}
        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2 font-label text-label-sm text-on-surface transition-all hover:bg-white/10 md:hidden"
      >
        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
        Ask AI
      </button>
    </nav>
  );
}
