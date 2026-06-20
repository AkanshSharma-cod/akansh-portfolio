import { Section } from './Section';
import { Reveal } from './Reveal';
import { experience } from '../data/portfolio';

export function Experience() {
  return (
    <Section id="experience" eyebrow="Career" title="Experience">
      <div className="flex flex-col gap-base">
        {experience.map((job) => (
          <Reveal key={job.role + job.period}>
            <div className="zebra-list-item glass-card relative overflow-hidden rounded-xl p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-title-md tracking-tight text-on-surface">
                  {job.role}
                </h3>
                <span className="font-label text-label-sm text-on-surface-variant opacity-70">
                  {job.period}
                </span>
              </div>
              <p className="mt-1 font-label text-label-sm text-accent-blue">
                {job.company} · {job.location}
              </p>
              <ul className="mt-5 space-y-2.5">
                {job.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 font-body text-body-md leading-relaxed text-on-surface-variant opacity-90"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-blue/70" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
