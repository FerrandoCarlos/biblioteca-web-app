import express from 'express';
import dotenv from 'dotenv';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { errorHandler, notFound } from './src/middlewares/error.middleware.js';
import genresRoutes from './src/routes/genres.routes.js';
import authorsRoutes from './src/routes/authors.routes.js';
import booksRoutes from './src/routes/books.routes.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT ?? 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ── Middlewares ──────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'src/public')));

// ── Template engine ──────────────────────────────────
app.set('view engine', 'pug');
app.set('views', join(__dirname, 'src/views'));

// ── Routes ───────────────────────────────────────────
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/', (req, res) => {
    res.render('index');
});
app.use('/genres', genresRoutes);
app.use('/authors', authorsRoutes);
app.use('/books', booksRoutes);

// ── Error handling ───────────────────────────────────
// Debe ir SIEMPRE al final, después de todas las rutas
app.use(notFound);
app.use(errorHandler);

// ── Server ───────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`Servidor corriendo desde http://localhost:${PORT}`);
}).on('error', err => {
    console.error(`Error al iniciar el servidor:${err.message}`);
});