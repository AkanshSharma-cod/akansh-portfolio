import { Section } from './Section';
import { Reveal } from './Reveal';
import { projects } from '../data/portfolio';

const projectIcons = [
  'smart_toy',
  'hub',
  'auto_awesome',
  'workspace_premium',
  'speed',
  'monitoring',
];

export function Projects() {
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Featured Projects"
      intro="Production AI systems and data platforms I've shipped."
    >
      <div className="grid grid-cols-1 gap-gutter md:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal key={project.title}>
            <article className="project-card glass-card group flex h-full flex-col overflow-hidden rounded-xl">
              {/* Header band with subtle accent + icon (no stock imagery) */}
              <div className="relative flex h-40 items-center justify-center overflow-hidden border-b border-white/5 bg-gradient-to-br from-surface-container to-surface-container-low">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-blue/10 blur-3xl transition-all duration-500 group-hover:bg-accent-blue/25" />
                <span className="material-symbols-outlined relative text-[44px] text-on-surface-variant transition-colors duration-500 group-hover:text-accent-blue">
                  {projectIcons[i % projectIcons.length]}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-8">
                <h3 className="mb-3 font-display text-title-md tracking-tight text-on-surface">
                  {project.title}
                </h3>
                <p className="mb-gutter flex-1 font-body text-body-md leading-relaxed text-on-surface-variant opacity-80">
                  {project.blurb}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-white/5 pt-6">
                  {project.tags.map((tag) => (
                    <span key={tag} className="font-label text-label-sm text-accent-blue/80">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
