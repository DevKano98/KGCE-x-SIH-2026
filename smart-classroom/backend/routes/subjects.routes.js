// backend/routes/subjects.routes.js
import { Router } from 'express';
import { getSubjects, createSubject } from '../controllers/subjects.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', getSubjects);
router.post('/', requireRole('admin'), createSubject);
export default router;