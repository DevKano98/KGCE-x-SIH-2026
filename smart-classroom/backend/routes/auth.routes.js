// backend/routes/auth.routes.js
import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { requireAuth, requireRole } from '../middleware/auth.middleware.js';
const router = Router();
router.post('/login', login);
router.post('/register', requireAuth, requireRole('admin'), register);
export default router;