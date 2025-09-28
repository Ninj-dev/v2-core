import { Request, Response } from 'express';
import Project, { IProject, IFile } from '../models/Project';
import { IUser } from '../models/User';
import { validateProject, validateFile } from '../utils/validation';

interface AuthRequest extends Request {
  user?: IUser;
}

export const getUserProjects = async (req: AuthRequest, res: Response) => {
  const userId = req.user!._id.toString();
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find({ userId })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-files.content'); // Exclude file content for list view

  const total = await Project.countDocuments({ userId });

  res.json({
    projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};

export const getPublicProjects = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const skip = (page - 1) * limit;

  const projects = await Project.find({ isPublic: true })
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit)
    .select('-files.content')
    .populate('userId', 'username firstName lastName');

  const total = await Project.countDocuments({ isPublic: true });

  res.json({
    projects,
    pagination: {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit)
    }
  });
};

export const getProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id.toString();

  const project = await Project.findOne({
    _id: id,
    $or: [{ userId }, { isPublic: true }]
  });

  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  res.json({ project });
};

export const getPublicProject = async (req: Request, res: Response) => {
  const { id } = req.params;

  const project = await Project.findOne({ _id: id, isPublic: true })
    .populate('userId', 'username firstName lastName');

  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  res.json({ project });
};

export const createProject = async (req: AuthRequest, res: Response) => {
  const { error } = validateProject(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const userId = req.user!._id.toString();
  const { name, description, framework, template, isPublic, tags } = req.body;

  // Check if user already has a project with this name
  const existingProject = await Project.findOne({ userId, name });
  if (existingProject) {
    return res.status(400).json({ 
      error: { message: 'Project with this name already exists' } 
    });
  }

  const project = new Project({
    name,
    description,
    userId,
    framework,
    template,
    isPublic,
    tags,
    files: getTemplateFiles(framework, template)
  });

  await project.save();

  res.status(201).json({
    message: 'Project created successfully',
    project
  });
};

export const updateProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id.toString();

  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  const updates = req.body;
  delete updates.userId; // Prevent changing owner

  Object.assign(project, updates);
  await project.save();

  res.json({
    message: 'Project updated successfully',
    project
  });
};

export const deleteProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id.toString();

  const project = await Project.findOneAndDelete({ _id: id, userId });
  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  res.json({ message: 'Project deleted successfully' });
};

export const addFile = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id.toString();

  const { error } = validateFile(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  // Check if file already exists
  const existingFile = project.files.find(f => f.path === req.body.path);
  if (existingFile) {
    return res.status(400).json({ 
      error: { message: 'File already exists at this path' } 
    });
  }

  project.files.push(req.body);
  await project.save();

  res.status(201).json({
    message: 'File added successfully',
    file: project.files[project.files.length - 1]
  });
};

export const updateFile = async (req: AuthRequest, res: Response) => {
  const { id, filePath } = req.params;
  const userId = req.user!._id.toString();

  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  const fileIndex = project.files.findIndex(f => f.path === decodeURIComponent(filePath));
  if (fileIndex === -1) {
    return res.status(404).json({ 
      error: { message: 'File not found' } 
    });
  }

  Object.assign(project.files[fileIndex], req.body);
  await project.save();

  res.json({
    message: 'File updated successfully',
    file: project.files[fileIndex]
  });
};

export const deleteFile = async (req: AuthRequest, res: Response) => {
  const { id, filePath } = req.params;
  const userId = req.user!._id.toString();

  const project = await Project.findOne({ _id: id, userId });
  if (!project) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  const fileIndex = project.files.findIndex(f => f.path === decodeURIComponent(filePath));
  if (fileIndex === -1) {
    return res.status(404).json({ 
      error: { message: 'File not found' } 
    });
  }

  project.files.splice(fileIndex, 1);
  await project.save();

  res.json({ message: 'File deleted successfully' });
};

export const deployProject = async (req: AuthRequest, res: Response) => {
  // TODO: Implement deployment logic
  res.json({ message: 'Deployment initiated (not implemented)' });
};

export const duplicateProject = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const userId = req.user!._id.toString();

  const originalProject = await Project.findOne({
    _id: id,
    $or: [{ userId }, { isPublic: true }]
  });

  if (!originalProject) {
    return res.status(404).json({ 
      error: { message: 'Project not found' } 
    });
  }

  const newProject = new Project({
    name: `${originalProject.name} (Copy)`,
    description: originalProject.description,
    userId,
    framework: originalProject.framework,
    template: originalProject.template,
    files: originalProject.files,
    tags: originalProject.tags,
    isPublic: false
  });

  await newProject.save();

  res.status(201).json({
    message: 'Project duplicated successfully',
    project: newProject
  });
};

// Helper function to get template files
const getTemplateFiles = (framework: string, template: string): IFile[] => {
  const baseFiles: IFile[] = [
    {
      path: 'package.json',
      content: getPackageJson(framework),
      type: 'config',
      language: 'json'
    },
    {
      path: 'README.md',
      content: '# My Project\n\nGenerated with Lovable Clone',
      type: 'other',
      language: 'markdown'
    }
  ];

  if (framework === 'react') {
    baseFiles.push(
      {
        path: 'src/App.jsx',
        content: getReactAppTemplate(),
        type: 'component',
        language: 'javascript'
      },
      {
        path: 'src/index.js',
        content: getReactIndexTemplate(),
        type: 'other',
        language: 'javascript'
      },
      {
        path: 'public/index.html',
        content: getHtmlTemplate(),
        type: 'other',
        language: 'html'
      }
    );
  }

  return baseFiles;
};

const getPackageJson = (framework: string) => {
  const base = {
    name: 'my-project',
    version: '1.0.0',
    private: true
  };

  if (framework === 'react') {
    return JSON.stringify({
      ...base,
      dependencies: {
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        'react-scripts': '5.0.1'
      },
      scripts: {
        start: 'react-scripts start',
        build: 'react-scripts build',
        test: 'react-scripts test',
        eject: 'react-scripts eject'
      }
    }, null, 2);
  }

  return JSON.stringify(base, null, 2);
};

const getReactAppTemplate = () => `
import React from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to My Project</h1>
        <p>Built with Lovable Clone</p>
      </header>
    </div>
  );
}

export default App;
`.trim();

const getReactIndexTemplate = () => `
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
`.trim();

const getHtmlTemplate = () => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>My Project</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
`.trim();