import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isVerified: boolean;
  plan: 'free' | 'pro' | 'enterprise';
  credits: number;
  apiUsage: {
    date: Date;
    requests: number;
  }[];
  preferences: {
    theme: 'light' | 'dark';
    defaultFramework: 'react' | 'vue' | 'angular' | 'vanilla';
    autoSave: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  comparePassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  username: { 
    type: String, 
    required: true, 
    unique: true, 
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  firstName: { type: String, trim: true },
  lastName: { type: String, trim: true },
  avatar: { type: String },
  isVerified: { type: Boolean, default: false },
  plan: { 
    type: String, 
    enum: ['free', 'pro', 'enterprise'], 
    default: 'free' 
  },
  credits: { type: Number, default: 100 },
  apiUsage: [{
    date: { type: Date, default: Date.now },
    requests: { type: Number, default: 0 }
  }],
  preferences: {
    theme: { 
      type: String, 
      enum: ['light', 'dark'], 
      default: 'light' 
    },
    defaultFramework: { 
      type: String, 
      enum: ['react', 'vue', 'angular', 'vanilla'], 
      default: 'react' 
    },
    autoSave: { type: Boolean, default: true }
  }
}, {
  timestamps: true
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function(password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ username: 1 });

export default mongoose.model<IUser>('User', UserSchema);