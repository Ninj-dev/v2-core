import mongoose, { Schema, Document } from 'mongoose';

export interface IFile {
  path: string;
  content: string;
  type: 'component' | 'page' | 'style' | 'config' | 'other';
  language: string;
}

export interface IProject extends Document {
  name: string;
  description: string;
  userId: string;
  files: IFile[];
  framework: 'react' | 'vue' | 'angular' | 'vanilla';
  template: string;
  isPublic: boolean;
  deploymentUrl?: string;
  previewUrl?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const FileSchema = new Schema<IFile>({
  path: { type: String, required: true },
  content: { type: String, default: '' },
  type: { 
    type: String, 
    enum: ['component', 'page', 'style', 'config', 'other'], 
    default: 'other' 
  },
  language: { type: String, default: 'javascript' }
});

const ProjectSchema = new Schema<IProject>({
  name: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  userId: { type: String, required: true },
  files: [FileSchema],
  framework: { 
    type: String, 
    enum: ['react', 'vue', 'angular', 'vanilla'], 
    default: 'react' 
  },
  template: { type: String, default: 'blank' },
  isPublic: { type: Boolean, default: false },
  deploymentUrl: { type: String },
  previewUrl: { type: String },
  tags: [{ type: String }]
}, {
  timestamps: true
});

// Indexes
ProjectSchema.index({ userId: 1, createdAt: -1 });
ProjectSchema.index({ isPublic: 1, createdAt: -1 });
ProjectSchema.index({ tags: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema);