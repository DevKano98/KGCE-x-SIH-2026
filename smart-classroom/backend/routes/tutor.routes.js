// backend/routes/tutor.routes.js
import { Router } from 'express';
import { ask, quiz } from '../controllers/tutor.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.post('/ask', requireRole('student'), ask);
router.post('/quiz', requireRole('student'), quiz);
export default router;
