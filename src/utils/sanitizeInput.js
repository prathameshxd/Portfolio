/**
 * Sanitizes a string by removing any HTML tags and limiting length.
 * @param {string} input - The input string to sanitize
 * @param {number} maxLength - The maximum allowed length
 * @returns {string} The sanitized string
 */
export function sanitizeInput(input, maxLength) {
  if (typeof input !== 'string') return '';
  
  // Remove HTML tags using a DOM Parser (safer than regex)
  const doc = new DOMParser().parseFromString(input, 'text/html');
  const textOnly = doc.body.textContent || "";
  
  // Trim and limit length
  return textOnly.trim().slice(0, maxLength);
}
