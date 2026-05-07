import { Router } from "express";
import * as booksController from '../controllers/books.controller.js';

const router = Router();

// ── Books routes ────────────────────────────────────
router.get('/', booksController.getAll);
router.get('/create', booksController.create)
router.post('/', booksController.insert)
router.get('/pages', booksController.getByMinPages)
router.get('/:isbn', booksController.getByIsbn)
router.get('/:isbn/edit', booksController.edit)
router.post('/:isbn/edit', booksController.update)
router.post('/:isbn/delete', booksController.remove)
router.get('/:isbn/authors-photos', booksController.getAuthorPhotos)

export default router