import { Router } from 'express';
import * as genresController from '../controllers/genres.controller.js';

const router = Router();

// ── Genres routes ────────────────────────────────────
router.get('/', genresController.getAll);
router.get('/create', genresController.create);
router.post('/', genresController.insert);
router.get('/:id/edit', genresController.getById);
router.post('/:id/edit', genresController.update);
router.post('/:id/delete', genresController.remove);

export default router;