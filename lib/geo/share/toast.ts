'use client';

/**
 * Shows a simple toast notification
 * Uses a simple div-based toast (no external dependencies)
 */
export function showToast(message: string, duration: number = 3000) {
  // Remove existing toast if any
  const existingToast = document.getElementById('geo-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'geo-toast';
  toast.className = 'fixed bottom-4 right-4 z-50 px-4 py-2 bg-gray-900 text-white rounded-md shadow-lg text-sm';
  toast.textContent = message;

  document.body.appendChild(toast);

  // Remove after duration
  setTimeout(() => {
    if (toast.parentNode) {
      toast.parentNode.removeChild(toast);
    }
  }, duration);
}

