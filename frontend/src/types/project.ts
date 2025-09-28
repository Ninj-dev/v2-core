export interface ProjectFile {
  path: string;
  content: string;
  type: 'component' | 'page' | 'style' | 'config' | 'other';
  language: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  userId: string;
  files: ProjectFile[];
  framework: 'react' | 'vue' | 'angular' | 'vanilla';
  template: string;
  isPublic: boolean;
  deploymentUrl?: string;
  previewUrl?: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  framework?: 'react' | 'vue' | 'angular' | 'vanilla';
  template?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  framework?: 'react' | 'vue' | 'angular' | 'vanilla';
  template?: string;
  isPublic?: boolean;
  tags?: string[];
}

export interface CreateFileRequest {
  path: string;
  content: string;
  type?: 'component' | 'page' | 'style' | 'config' | 'other';
  language?: string;
}

export interface UpdateFileRequest {
  content: string;
  type?: 'component' | 'page' | 'style' | 'config' | 'other';
  language?: string;
}

export interface ProjectsResponse {
  projects: Project[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}