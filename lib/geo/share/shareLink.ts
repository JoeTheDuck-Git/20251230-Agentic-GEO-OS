'use client';

/**
 * Gets the current URL (client-only)
 */
export function getCurrentUrl(): string {
  if (typeof window === 'undefined') {
    return '';
  }
  return window.location.href;
}

/**
 * Builds a shareable URL with all query parameters
 */
export function buildShareUrl(pathname: string, searchParams: URLSearchParams): string {
  if (typeof window === 'undefined') {
    return pathname;
  }
  
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();
  const baseUrl = window.location.origin;
  
  return queryString 
    ? `${baseUrl}${pathname}?${queryString}`
    : `${baseUrl}${pathname}`;
}

/**
 * Copies text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (typeof window === 'undefined' || !navigator.clipboard) {
    return false;
  }
  
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch {
      return false;
    }
  }
}

