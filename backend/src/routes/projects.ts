import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import * as projectController from '../controllers/projectController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.get('/public', asyncHandler(projectController.getPublicProjects));
router.get('/public/:id', asyncHandler(projectController.getPublicProject));

// Protected routes
router.use(auth); // All routes below require authentication

router.get('/', asyncHandler(projectController.getUserProjects));
router.post('/', asyncHandler(projectController.createProject));
router.get('/:id', asyncHandler(projectController.getProject));
router.put('/:id', asyncHandler(projectController.updateProject));
router.delete('/:id', asyncHandler(projectController.deleteProject));
router.post('/:id/files', asyncHandler(projectController.addFile));
router.put('/:id/files/:filePath', asyncHandler(projectController.updateFile));
router.delete('/:id/files/:filePath', asyncHandler(projectController.deleteFile));
router.post('/:id/deploy', asyncHandler(projectController.deployProject));
router.post('/:id/duplicate', asyncHandler(projectController.duplicateProject));

export default router;