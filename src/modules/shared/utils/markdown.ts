import marked from 'marked';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

// NOTE: I Don't why but I have to put 'as any' to make it work
const domPurify = DOMPurify((new JSDOM('') as any).window);

export function markdownToHTML(md: string) {
  return domPurify.sanitize(marked(md));
}
