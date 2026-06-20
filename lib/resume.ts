import { RESUME_MARKDOWN } from './generated/resume-content';

export { RESUME_MARKDOWN };

export function getResumeMarkdown(): string {
  return RESUME_MARKDOWN.trim();
}
