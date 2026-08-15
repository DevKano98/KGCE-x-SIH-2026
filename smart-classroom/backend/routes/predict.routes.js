// backend/routes/predict.routes.js
import { Router } from 'express';
import { getMyRisk, getSubjectRisk } from '../controllers/predict.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/me', requireRole('student'), getMyRisk);
router.get('/subject/:id', requireRole('teacher'), getSubjectRisk);
export default router;
