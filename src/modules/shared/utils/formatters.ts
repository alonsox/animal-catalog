/**
 * Puts the first letter in a string in uppercase and the rest in lowercase.
 */
export function capitalizeFirst(str: string) {
  if (!str) {
    return '';
  }

  if (typeof str !== 'string') {
    return '';
  }

  return str[0].toUpperCase() + str.substr(1).toLowerCase();
}

/** Converts a string to uppercase */
export function toUpper(str: string): string {
  if (!str) {
    return '';
  }

  return str.toUpperCase();
}

/** Converts a string to lowercase */
export function toLower(str: string): string {
  if (!str) {
    return '';
  }

  return str.toLowerCase();
}

/**
 * Capitalizes all words, i.e., it puts the first letter of every word in
 * uppercase.
 */
export function capitalizeAll(str: string): string {
  if (!str || !str.trim()) {
    return '';
  }

  return str.split(/\s+/).filter(Boolean).map(capitalizeFirst).join(' ');
}
