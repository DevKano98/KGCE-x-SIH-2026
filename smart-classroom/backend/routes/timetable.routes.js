// backend/routes/timetable.routes.js
import { Router } from 'express';
import { getTimetable, generate, updateSlot, getMyTimetable } from '../controllers/timetable.controller.js';
import { requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.get('/', requireRole('admin'), getTimetable);
router.get('/me', requireRole('student'), getMyTimetable);
router.post('/generate', requireRole('admin'), generate);
router.put('/:id', requireRole('admin'), updateSlot);
export default router;
