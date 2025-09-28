import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import * as authController from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/register', asyncHandler(authController.register));
router.post('/login', asyncHandler(authController.login));
router.post('/forgot-password', asyncHandler(authController.forgotPassword));
router.post('/reset-password', asyncHandler(authController.resetPassword));
router.get('/verify-email/:token', asyncHandler(authController.verifyEmail));

// Protected routes
router.use(auth);
router.get('/me', asyncHandler(authController.getProfile));
router.put('/me', asyncHandler(authController.updateProfile));
router.post('/change-password', asyncHandler(authController.changePassword));
router.post('/logout', asyncHandler(authController.logout));

export default router;