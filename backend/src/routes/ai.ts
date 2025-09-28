import express from 'express';
import { asyncHandler } from '../middleware/errorHandler';
import * as aiController from '../controllers/aiController';
import { auth } from '../middleware/auth';

const router = express.Router();

// All AI routes require authentication
router.use(auth);

router.post('/generate/component', asyncHandler(aiController.generateComponent));
router.post('/generate/page', asyncHandler(aiController.generatePage));
router.post('/generate/app', asyncHandler(aiController.generateApp));
router.post('/improve/code', asyncHandler(aiController.improveCode));
router.post('/explain/code', asyncHandler(aiController.explainCode));
router.post('/debug/code', asyncHandler(aiController.debugCode));
router.post('/suggest/improvements', asyncHandler(aiController.suggestImprovements));

export default router;