import { Section } from './Section';
import { Reveal } from './Reveal';
import { skillGroups, certifications } from '../data/portfolio';

export function Skills() {
  return (
    <Section id="skills" eyebrow="Toolbox" title="Skills & Certifications">
      <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => (
          <Reveal key={group.label}>
            <div className="glass-card h-full rounded-xl p-6">
              <h3 className="font-label text-label-sm uppercase tracking-wider text-accent-blue">
                {group.label}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/5 bg-white/[0.04] px-3 py-1.5 font-body text-body-md text-[13px] text-on-surface-variant"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="glass-card mt-gutter rounded-xl p-8">
          <h3 className="font-label text-label-sm uppercase tracking-wider text-accent-blue">
            Certifications
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="flex items-start gap-3 font-body text-body-md text-on-surface-variant opacity-90"
              >
                <span className="material-symbols-outlined text-[18px] text-accent-blue/80">
                  verified
                </span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
