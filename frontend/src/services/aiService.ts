import api from './api';
import {
  AIGenerationRequest,
  AIGenerationResponse,
  CodeImprovementRequest,
  CodeImprovementResponse,
  CodeExplanationRequest,
  CodeExplanationResponse,
  CodeDebugRequest,
  CodeDebugResponse,
  CodeSuggestionsRequest,
  CodeSuggestionsResponse,
} from '../types/ai';

class AIServiceClient {
  async generateComponent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const response = await api.post('/ai/generate/component', request);
    return response.data;
  }

  async generatePage(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const response = await api.post('/ai/generate/page', request);
    return response.data;
  }

  async generateApp(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    const response = await api.post('/ai/generate/app', request);
    return response.data;
  }

  async improveCode(request: CodeImprovementRequest): Promise<CodeImprovementResponse> {
    const response = await api.post('/ai/improve/code', request);
    return response.data;
  }

  async explainCode(request: CodeExplanationRequest): Promise<CodeExplanationResponse> {
    const response = await api.post('/ai/explain/code', request);
    return response.data;
  }

  async debugCode(request: CodeDebugRequest): Promise<CodeDebugResponse> {
    const response = await api.post('/ai/debug/code', request);
    return response.data;
  }

  async suggestImprovements(request: CodeSuggestionsRequest): Promise<CodeSuggestionsResponse> {
    const response = await api.post('/ai/suggest/improvements', request);
    return response.data;
  }

  // Utility methods for common AI interactions
  async generateFromDescription(
    description: string,
    type: 'component' | 'page' | 'app' = 'component',
    options?: {
      framework?: 'react' | 'vue' | 'angular' | 'vanilla';
      style?: 'tailwind' | 'css' | 'styled-components' | 'scss';
      complexity?: 'simple' | 'medium' | 'complex';
    }
  ): Promise<AIGenerationResponse> {
    const request: AIGenerationRequest = {
      prompt: description,
      framework: options?.framework || 'react',
      style: options?.style || 'tailwind',
      complexity: options?.complexity || 'medium',
    };

    switch (type) {
      case 'component':
        return this.generateComponent(request);
      case 'page':
        return this.generatePage(request);
      case 'app':
        return this.generateApp(request);
      default:
        throw new Error(`Unknown generation type: ${type}`);
    }
  }

  async quickFix(code: string, issue: string): Promise<CodeImprovementResponse> {
    return this.improveCode({
      code,
      instructions: `Fix the following issue: ${issue}`,
    });
  }

  async optimizeCode(code: string): Promise<CodeImprovementResponse> {
    return this.improveCode({
      code,
      instructions: 'Optimize this code for better performance and readability',
    });
  }

  async addAccessibility(code: string): Promise<CodeImprovementResponse> {
    return this.improveCode({
      code,
      instructions: 'Improve accessibility by adding proper ARIA attributes and semantic HTML',
    });
  }

  async convertToTypeScript(code: string): Promise<CodeImprovementResponse> {
    return this.improveCode({
      code,
      instructions: 'Convert this JavaScript code to TypeScript with proper type definitions',
    });
  }

  async addTests(code: string): Promise<CodeImprovementResponse> {
    return this.improveCode({
      code,
      instructions: 'Generate unit tests for this code using modern testing practices',
    });
  }
}

export const aiService = new AIServiceClient();