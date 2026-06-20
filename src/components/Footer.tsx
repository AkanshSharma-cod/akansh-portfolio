import { profile } from '../data/portfolio';

export function Footer() {
  const { email, linkedin, github } = profile.links;
  return (
    <footer className="border-t border-white/5 bg-surface-container-low/30">
      <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-8 px-margin-mobile py-12 md:flex-row md:px-margin-desktop">
        <div className="font-display text-xl font-bold tracking-tight text-on-surface">
          {profile.name}
          <span className="text-accent-blue">.</span>
        </div>

        <div className="flex gap-gutter">
          <a
            href={github}
            target="_blank"
            rel="noreferrer"
            className="font-label text-label-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            GitHub
          </a>
          <a
            href={linkedin}
            target="_blank"
            rel="noreferrer"
            className="font-label text-label-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${email}`}
            className="font-label text-label-sm text-on-surface-variant transition-colors duration-200 hover:text-primary"
          >
            Email
          </a>
        </div>

        <div className="text-center font-label text-label-sm text-on-surface-variant opacity-60 md:text-right">
          © {new Date().getFullYear()} {profile.name}
        </div>
      </div>
    </footer>
  );
}
