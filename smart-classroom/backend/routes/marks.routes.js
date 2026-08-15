// backend/routes/marks.routes.js
import { Router } from 'express';
import { getMarks, enterMarks } from '../controllers/marks.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', requireRole('teacher'), getMarks);
router.post('/', requireRole('teacher'), enterMarks);
export default router;