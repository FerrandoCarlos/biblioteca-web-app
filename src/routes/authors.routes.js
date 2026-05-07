import { Router } from 'express';
import * as authorsController from '../controllers/authors.controller.js';

const router = Router();

// ── Authors routes ────────────────────────────────────
router.get('/', authorsController.getAll);
router.get('/create', authorsController.create);
router.post('/', authorsController.insert);
router.get('/genre', authorsController.getByGenreParticipation);
router.get('/:id', authorsController.getById);
router.get('/:id/edit', authorsController.edit);
router.post('/:id/edit', authorsController.update);
router.post('/:id/delete', authorsController.remove);

export default router;

