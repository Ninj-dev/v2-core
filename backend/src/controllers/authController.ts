import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { validateRegistration, validateLogin } from '../utils/validation';

interface AuthRequest extends Request {
  user?: IUser;
}

const generateToken = (userId: string) => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined');
  }
  return jwt.sign({ userId }, jwtSecret, { expiresIn: '7d' });
};

export const register = async (req: Request, res: Response) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const { email, username, password, firstName, lastName } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ 
    $or: [{ email }, { username }] 
  });
  
  if (existingUser) {
    return res.status(400).json({ 
      error: { message: 'User with this email or username already exists' } 
    });
  }

  const user = new User({
    email,
    username,
    password,
    firstName,
    lastName
  });

  await user.save();

  const token = generateToken(user._id.toString());

  res.status(201).json({
    message: 'User registered successfully',
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      plan: user.plan,
      credits: user.credits
    }
  });
};

export const login = async (req: Request, res: Response) => {
  const { error } = validateLogin(req.body);
  if (error) {
    return res.status(400).json({ 
      error: { message: error.details[0].message } 
    });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ 
      error: { message: 'Invalid email or password' } 
    });
  }

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) {
    return res.status(401).json({ 
      error: { message: 'Invalid email or password' } 
    });
  }

  const token = generateToken(user._id.toString());

  res.json({
    message: 'Login successful',
    token,
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      plan: user.plan,
      credits: user.credits,
      preferences: user.preferences
    }
  });
};

export const getProfile = async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  res.json({
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      plan: user.plan,
      credits: user.credits,
      preferences: user.preferences,
      isVerified: user.isVerified
    }
  });
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  const user = req.user!;
  const updates = req.body;
  
  // Prevent updating sensitive fields
  delete updates.password;
  delete updates.email;
  delete updates.credits;
  delete updates.plan;

  Object.assign(user, updates);
  await user.save();

  res.json({
    message: 'Profile updated successfully',
    user: {
      id: user._id,
      email: user.email,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      preferences: user.preferences
    }
  });
};

export const changePassword = async (req: AuthRequest, res: Response) => {
  const { currentPassword, newPassword } = req.body;
  const user = req.user!;

  const isValidPassword = await user.comparePassword(currentPassword);
  if (!isValidPassword) {
    return res.status(400).json({ 
      error: { message: 'Current password is incorrect' } 
    });
  }

  user.password = newPassword;
  await user.save();

  res.json({ message: 'Password updated successfully' });
};

export const logout = async (req: AuthRequest, res: Response) => {
  // In a real app, you might want to blacklist the token
  res.json({ message: 'Logged out successfully' });
};

export const forgotPassword = async (req: Request, res: Response) => {
  // TODO: Implement password reset functionality
  res.json({ message: 'Password reset email sent (not implemented)' });
};

export const resetPassword = async (req: Request, res: Response) => {
  // TODO: Implement password reset functionality
  res.json({ message: 'Password reset successful (not implemented)' });
};

export const verifyEmail = async (req: Request, res: Response) => {
  // TODO: Implement email verification
  res.json({ message: 'Email verified (not implemented)' });
};