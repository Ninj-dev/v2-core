/**
 * Utility functions for formatting data
 */

// Date formatting
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diffInSeconds < 2592000) {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else {
    return formatDate(d);
  }
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
};

// Number formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatCredits = (credits: number): string => {
  if (credits >= 1000000) {
    return Math.round(credits / 100000) / 10 + 'M';
  } else if (credits >= 1000) {
    return Math.round(credits / 100) / 10 + 'K';
  }
  return credits.toString();
};

// Text formatting
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const capitalizeFirst = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

export const formatCamelCase = (text: string): string => {
  return text
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
};

// URL/Path formatting
export const formatFilePath = (path: string): string => {
  return path.startsWith('/') ? path.slice(1) : path;
};

export const getFileExtension = (filename: string): string => {
  return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
};

export const getFileName = (path: string): string => {
  return path.split('/').pop() || path;
};

export const getFileIcon = (filename: string): string => {
  const ext = getFileExtension(filename).toLowerCase();
  
  const iconMap: Record<string, string> = {
    js: '📄',
    jsx: '⚛️',
    ts: '📘',
    tsx: '⚛️',
    vue: '💚',
    html: '🌐',
    css: '🎨',
    scss: '🎨',
    sass: '🎨',
    json: '📋',
    md: '📝',
    xml: '📄',
    svg: '🖼️',
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    pdf: '📕',
    zip: '📦',
    folder: '📁',
  };

  return iconMap[ext] || '📄';
};

// Framework/Technology formatting
export const getFrameworkColor = (framework: string): string => {
  const colorMap: Record<string, string> = {
    react: 'blue',
    vue: 'green',
    angular: 'red',
    vanilla: 'yellow',
    typescript: 'blue',
    javascript: 'yellow',
    css: 'blue',
    tailwind: 'cyan',
    scss: 'purple',
  };

  return colorMap[framework.toLowerCase()] || 'gray';
};

// Error formatting
export const formatErrorMessage = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error?.message) return error.message;
  if (error?.response?.data?.error?.message) return error.response.data.error.message;
  return 'An unexpected error occurred';
};