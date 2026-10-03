/**
 * Security validation and sanitization utilities.
 * Provides shared validation helpers for API routes, form processing, and database operations.
 */

/**
 * Escapes HTML special characters to prevent Cross-Site Scripting (XSS)
 * in HTML email templates and rendered markup.
 *
 * @param str - The raw string to escape.
 * @returns The escaped HTML string with entity replacements.
 */
export function escapeHtml(str: string): string {
  if (typeof str !== 'string') {
    return '';
  }
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Sanitizes an untrusted input by verifying it is a string, trimming leading and
 * trailing whitespace, and truncating it to a maximum allowed length.
 * Non-string inputs (objects, arrays, null, undefined) return an empty string,
 * preventing NoSQL query selector injection and type-confusion attacks.
 *
 * @param input - The untrusted value from a request payload or form data.
 * @param maxLength - The maximum allowed character count.
 * @returns A safe, trimmed string capped at `maxLength`.
 */
export function sanitizeString(input: unknown, maxLength: number): string {
  if (typeof input !== 'string') {
    return '';
  }
  return input.trim().slice(0, maxLength);
}

/**
 * Validates an email address format, length, and rejects newline characters
 * to prevent SMTP/email header injection attacks.
 *
 * @param email - The email string to validate.
 * @returns `true` if valid and safe, `false` otherwise.
 */
export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') {
    return false;
  }
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) {
    return false;
  }
  if (/[\r\n]/.test(trimmed)) {
    return false;
  }
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

/**
 * Validates that a string is a secure HTTPS URL.
 * Rejects non-HTTPS schemes (e.g. `http:`, `javascript:`, `data:`, `file:`).
 *
 * @param url - The URL string to validate.
 * @returns `true` if valid HTTPS URL, `false` otherwise.
 */
export function validateUrl(url: string): boolean {
  if (typeof url !== 'string') {
    return false;
  }
  const trimmed = url.trim();
  if (!trimmed.startsWith('https://')) {
    return false;
  }
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validates whether a given string is a valid 24-character hexadecimal MongoDB ObjectId.
 * Helps prevent malformed ID queries and NoSQL injection attempts.
 *
 * @param id - The ID string to test.
 * @returns `true` if valid 24-character hex string, `false` otherwise.
 */
export function validateMongoId(id: string): boolean {
  if (typeof id !== 'string') {
    return false;
  }
  return /^[a-fA-F0-9]{24}$/.test(id.trim());
}

/**
 * File upload validation constants
 */
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB in bytes
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
export const ALLOWED_EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

/**
 * Validates an uploaded File against size, MIME type, and file extension restrictions.
 *
 * @param file - The uploaded File object.
 * @returns An error message string if validation fails, or `null` if valid.
 */
export function validateFileUpload(file: File): string | null {
  if (!file || typeof file.size !== 'number') {
    return 'No image file provided';
  }

  // 1. File size check (max 5MB)
  if (file.size > MAX_FILE_SIZE) {
    return 'Image must be under 5MB';
  }

  // 2. MIME type check
  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return 'Only JPEG, PNG, WebP, and GIF images are allowed';
  }

  // 3. File extension check
  const ext = file.name ? file.name.split('.').pop()?.toLowerCase() : '';
  if (!ext || !ALLOWED_EXTENSIONS.includes(ext)) {
    return 'Only files with .jpg, .jpeg, .png, .webp, or .gif extensions are allowed';
  }

  return null;
}

