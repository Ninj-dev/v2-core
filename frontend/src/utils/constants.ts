// App Constants
export const APP_NAME = 'Lovable Clone';
export const APP_DESCRIPTION = 'AI-Powered Web Development Platform';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/me',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  PROJECTS: {
    LIST: '/projects',
    CREATE: '/projects',
    GET: (id: string) => `/projects/${id}`,
    UPDATE: (id: string) => `/projects/${id}`,
    DELETE: (id: string) => `/projects/${id}`,
    DUPLICATE: (id: string) => `/projects/${id}/duplicate`,
    DEPLOY: (id: string) => `/projects/${id}/deploy`,
    FILES: {
      ADD: (projectId: string) => `/projects/${projectId}/files`,
      UPDATE: (projectId: string, filePath: string) => 
        `/projects/${projectId}/files/${encodeURIComponent(filePath)}`,
      DELETE: (projectId: string, filePath: string) => 
        `/projects/${projectId}/files/${encodeURIComponent(filePath)}`,
    },
  },
  AI: {
    GENERATE_COMPONENT: '/ai/generate/component',
    GENERATE_PAGE: '/ai/generate/page',
    GENERATE_APP: '/ai/generate/app',
    IMPROVE_CODE: '/ai/improve/code',
    EXPLAIN_CODE: '/ai/explain/code',
    DEBUG_CODE: '/ai/debug/code',
    SUGGEST_IMPROVEMENTS: '/ai/suggest/improvements',
  },
} as const;

// Supported Frameworks
export const FRAMEWORKS = [
  { value: 'react', label: 'React', color: 'blue' },
  { value: 'vue', label: 'Vue.js', color: 'green' },
  { value: 'angular', label: 'Angular', color: 'red' },
  { value: 'vanilla', label: 'Vanilla JS', color: 'yellow' },
] as const;

// Supported Styling Options
export const STYLING_OPTIONS = [
  { value: 'tailwind', label: 'Tailwind CSS', color: 'cyan' },
  { value: 'css', label: 'Plain CSS', color: 'blue' },
  { value: 'styled-components', label: 'Styled Components', color: 'pink' },
  { value: 'scss', label: 'SCSS/Sass', color: 'purple' },
] as const;

// Complexity Levels
export const COMPLEXITY_LEVELS = [
  { value: 'simple', label: 'Simple', description: 'Basic functionality' },
  { value: 'medium', label: 'Medium', description: 'Moderate features' },
  { value: 'complex', label: 'Complex', description: 'Advanced features' },
] as const;

// User Plans
export const USER_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    credits: 100,
    features: [
      '100 AI credits per month',
      'Basic code generation',
      'Public projects only',
      'Community support',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 29,
    credits: 1000,
    features: [
      '1000 AI credits per month',
      'Advanced code generation',
      'Private projects',
      'Real-time collaboration',
      'Priority support',
      'Custom templates',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99,
    credits: 5000,
    features: [
      '5000 AI credits per month',
      'All Pro features',
      'Team management',
      'SSO integration',
      'Dedicated support',
      'Custom integrations',
    ],
  },
} as const;

// File Extensions to Language Mapping
export const FILE_EXTENSIONS = {
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.vue': 'vue',
  '.html': 'html',
  '.css': 'css',
  '.scss': 'scss',
  '.sass': 'sass',
  '.json': 'json',
  '.md': 'markdown',
  '.yml': 'yaml',
  '.yaml': 'yaml',
  '.xml': 'xml',
  '.svg': 'xml',
} as const;

// Socket Events
export const SOCKET_EVENTS = {
  // Connection
  CONNECT: 'connect',
  DISCONNECT: 'disconnect',
  
  // Project collaboration
  JOIN_PROJECT: 'join-project',
  LEAVE_PROJECT: 'leave-project',
  USER_JOINED: 'user-joined',
  USER_LEFT: 'user-left',
  
  // Code editing
  CODE_CHANGE: 'code-change',
  CODE_CHANGED: 'code-changed',
  CURSOR_MOVE: 'cursor-move',
  CURSOR_MOVED: 'cursor-moved',
  
  // File operations
  FILE_CREATED: 'file-created',
  FILE_DELETED: 'file-deleted',
  FILE_RENAMED: 'file-renamed',
  
  // Chat
  CHAT_MESSAGE: 'chat-message',
  CHAT_MESSAGE_BROADCAST: 'chat-message-broadcast',
  
  // AI Generation
  AI_GENERATION_START: 'ai-generation-start',
  AI_GENERATION_COMPLETE: 'ai-generation-complete',
  
  // Typing indicators
  TYPING_START: 'typing-start',
  TYPING_STOP: 'typing-stop',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  RECENT_PROJECTS: 'recent-projects',
  EDITOR_SETTINGS: 'editor-settings',
} as const;