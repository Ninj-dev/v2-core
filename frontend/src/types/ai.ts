export interface AIGenerationRequest {
  prompt: string;
  framework?: 'react' | 'vue' | 'angular' | 'vanilla';
  style?: 'tailwind' | 'css' | 'styled-components' | 'scss';
  complexity?: 'simple' | 'medium' | 'complex';
}

export interface AIGenerationResponse {
  success: boolean;
  code?: string;
  files?: GeneratedFile[];
  creditsRemaining: number;
}

export interface GeneratedFile {
  path: string;
  content: string;
  type: 'component' | 'page' | 'style' | 'config' | 'other';
  language: string;
}

export interface CodeImprovementRequest {
  code: string;
  instructions: string;
}

export interface CodeImprovementResponse {
  success: boolean;
  improvedCode: string;
  creditsRemaining: number;
}

export interface CodeExplanationRequest {
  code: string;
}

export interface CodeExplanationResponse {
  success: boolean;
  explanation: string;
}

export interface CodeDebugRequest {
  code: string;
  error?: string;
}

export interface CodeDebugResponse {
  success: boolean;
  debugInfo: string;
  creditsRemaining: number;
}

export interface CodeSuggestionsRequest {
  code: string;
}

export interface CodeSuggestionsResponse {
  success: boolean;
  suggestions: string[];
}