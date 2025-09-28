import api from './api';
import { 
  Project, 
  ProjectsResponse, 
  CreateProjectRequest, 
  UpdateProjectRequest,
  CreateFileRequest,
  UpdateFileRequest
} from '../types/project';

class ProjectService {
  async getUserProjects(page = 1, limit = 10): Promise<ProjectsResponse> {
    const response = await api.get(`/projects?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getPublicProjects(page = 1, limit = 10): Promise<ProjectsResponse> {
    const response = await api.get(`/projects/public?page=${page}&limit=${limit}`);
    return response.data;
  }

  async getProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/${id}`);
    return response.data.project;
  }

  async getPublicProject(id: string): Promise<Project> {
    const response = await api.get(`/projects/public/${id}`);
    return response.data.project;
  }

  async createProject(projectData: CreateProjectRequest): Promise<Project> {
    const response = await api.post('/projects', projectData);
    return response.data.project;
  }

  async updateProject(id: string, projectData: UpdateProjectRequest): Promise<Project> {
    const response = await api.put(`/projects/${id}`, projectData);
    return response.data.project;
  }

  async deleteProject(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  }

  async duplicateProject(id: string): Promise<Project> {
    const response = await api.post(`/projects/${id}/duplicate`);
    return response.data.project;
  }

  // File operations
  async addFile(projectId: string, fileData: CreateFileRequest): Promise<void> {
    await api.post(`/projects/${projectId}/files`, fileData);
  }

  async updateFile(projectId: string, filePath: string, fileData: UpdateFileRequest): Promise<void> {
    const encodedPath = encodeURIComponent(filePath);
    await api.put(`/projects/${projectId}/files/${encodedPath}`, fileData);
  }

  async deleteFile(projectId: string, filePath: string): Promise<void> {
    const encodedPath = encodeURIComponent(filePath);
    await api.delete(`/projects/${projectId}/files/${encodedPath}`);
  }

  // Deployment
  async deployProject(id: string): Promise<{ deploymentUrl: string }> {
    const response = await api.post(`/projects/${id}/deploy`);
    return response.data;
  }

  // Search and filtering
  async searchProjects(query: string, filters?: {
    framework?: string;
    tags?: string[];
    isPublic?: boolean;
  }): Promise<Project[]> {
    const params = new URLSearchParams({ q: query });
    
    if (filters?.framework) {
      params.append('framework', filters.framework);
    }
    
    if (filters?.tags) {
      filters.tags.forEach(tag => params.append('tags', tag));
    }
    
    if (filters?.isPublic !== undefined) {
      params.append('isPublic', filters.isPublic.toString());
    }

    const response = await api.get(`/projects/search?${params}`);
    return response.data.projects;
  }
}

export const projectService = new ProjectService();