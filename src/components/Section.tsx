import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

export function Section({
  id,
  eyebrow,
  title,
  intro,
  action,
  children,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto max-w-[1280px] scroll-mt-24 px-margin-mobile py-section-gap md:px-margin-desktop"
    >
      <Reveal>
        <div className="mb-gutter flex flex-col items-start justify-between gap-base md:flex-row md:items-end">
          <div>
            {eyebrow && (
              <p className="mb-3 font-label text-label-sm uppercase tracking-[0.2em] text-accent-blue">
                {eyebrow}
              </p>
            )}
            <h2 className="font-display text-headline-lg-mobile tracking-tight text-on-surface md:text-headline-lg">
              {title}
            </h2>
            {intro && (
              <p className="mt-3 max-w-xl font-body text-body-md text-on-surface-variant opacity-80">
                {intro}
              </p>
            )}
          </div>
          {action}
        </div>
      </Reveal>
      <div className="mt-gutter">{children}</div>
    </section>
  );
}
