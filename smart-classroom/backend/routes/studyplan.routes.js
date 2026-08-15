import { Router } from 'express';
import { getMyStudyPlan } from '../controllers/studyplan.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';

const router = Router();
router.get('/me', requireRole('student'), getMyStudyPlan);

export default router;
