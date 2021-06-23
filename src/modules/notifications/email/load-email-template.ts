import ejs from 'ejs';
import path from 'path';

/**
 * Loads an email template with the necessary data.
 */
export function loadEmailTemplate<T>(
  template: string,
  templateData: T,
): Promise<string> {
  const templateName = `templates/${template}.ejs`;

  return ejs.renderFile(path.join(__dirname, templateName), templateData, {});
}
