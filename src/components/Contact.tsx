import { Reveal } from './Reveal';
import { profile } from '../data/portfolio';

export function Contact() {
  const { email, linkedin, github } = profile.links;
  return (
    <section
      id="contact"
      className="mx-auto mb-section-gap max-w-[1280px] scroll-mt-24 px-margin-mobile md:px-margin-desktop"
    >
      <Reveal>
        <div className="glass-card relative flex flex-col items-center justify-between gap-gutter overflow-hidden rounded-2xl p-gutter md:flex-row md:p-24">
          <div className="pointer-events-none absolute -right-48 -top-48 h-96 w-96 rounded-full bg-accent-blue/20 blur-[120px]" />

          <div className="relative z-10 max-w-xl text-center md:text-left">
            <h2 className="mb-6 font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              Let's build something exceptional
            </h2>
            <p className="font-body text-body-lg leading-relaxed text-on-surface-variant opacity-80">
              I'm open to AI Engineering roles. Reach out — or ask the chatbot anything about
              my background.
            </p>
          </div>

          <div className="relative z-10 flex shrink-0 flex-col gap-6 sm:flex-row">
            <a
              href={`mailto:${email}`}
              className="glow-button flex items-center justify-center gap-3 rounded-lg bg-secondary-container px-10 py-5 font-label text-label-sm text-white"
            >
              <span className="material-symbols-outlined text-[18px]">mail</span>
              Send an Email
            </a>
            <a
              href={linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 px-10 py-5 text-center font-label text-label-sm text-on-surface transition-all hover:border-white/20 hover:bg-white/10"
            >
              LinkedIn
            </a>
            <a
              href={github}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg border border-white/10 bg-white/5 px-10 py-5 text-center font-label text-label-sm text-on-surface transition-all hover:border-white/20 hover:bg-white/10"
            >
              GitHub
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
