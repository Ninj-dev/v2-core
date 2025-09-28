import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        error: { message: 'Access denied. No token provided.' } 
      });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('JWT_SECRET is not defined in environment variables');
      return res.status(500).json({ 
        error: { message: 'Server configuration error.' } 
      });
    }

    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ 
        error: { message: 'Invalid token. User not found.' } 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      error: { message: 'Invalid token.' } 
    });
  }
};