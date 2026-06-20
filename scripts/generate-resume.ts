/**
 * Codegen: turn content/resume.md into a TS module (lib/generated/resume-content.ts)
 * so the Edge chat function can import the resume text without filesystem access.
 *
 * Runs automatically via the `predev` / `prebuild` npm hooks, and can be run manually
 * with `npm run gen`.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

const resumePath = resolve(root, 'content/resume.md');
const outPath = resolve(root, 'lib/generated/resume-content.ts');

const markdown = readFileSync(resumePath, 'utf8').trim();

// Escape for a template literal: backslashes, backticks, and ${ interpolation.
const escaped = markdown
  .replace(/\\/g, '\\\\')
  .replace(/`/g, '\\`')
  .replace(/\$\{/g, '\\${');

const out = `// AUTO-GENERATED from content/resume.md by scripts/generate-resume.ts — do not edit.
export const RESUME_MARKDOWN = \`${escaped}\`;
`;

mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, out, 'utf8');

console.log(`Wrote ${outPath} (${markdown.length} chars from resume.md)`);
