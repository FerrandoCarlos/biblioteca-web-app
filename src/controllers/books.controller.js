import booksModel from '../models/books.model.js'
import genresModel from '../models/genres.model.js'
import authorsModel from '../models/authors.model.js'
import bookSchema from '../schemas/books.schema.js'
import parseErrors from '../utils/parseErrors.js'

const getAll = async (req, res, next) => {
    try {
        const books = await booksModel.getAll();
        res.render('books/index', { books });
    } catch (error) {
        next(error);
    }
};

const getByIsbn = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const book = await booksModel.getByIsbn(isbn);

        if (!book) return res.redirect('/books');

        const authors = await booksModel.getAuthorsByBook(isbn);
        res.render('books/show', { book, authors });
    } catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        // Necesitamos genres y authors para los selects del formulario
        const genres = await genresModel.getAll();
        const authors = await authorsModel.getAll();
        res.render('books/create', { genres, authors });
    } catch (error) {
        next(error);
    }
};

const insert = async (req, res, next) => {
    try {
        const result = bookSchema.safeParse(req.body);

        if (!result.success) {
            const errors = parseErrors(result.error);
            const genres = await genresModel.getAll();
            const authors = await authorsModel.getAll();
            return res.render('books/create', { errors, genres, authors });
        }

        const { isbn, title, description, genre_id, year, pages_number, author_ids, percentages } = result.data;
        await booksModel.insert(isbn, title, description, genre_id, year, pages_number, author_ids, percentages);
        res.redirect('/books');
    } catch (error) {
        next(error);
    }
};

const edit = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const book = await booksModel.getByIsbn(isbn);

        if (!book) return res.redirect('/books');

        const genres = await genresModel.getAll();
        const authors = await authorsModel.getAll();
        const bookAuthors = await booksModel.getAuthorsByBook(isbn);
        res.render('books/edit', { book, genres, authors, bookAuthors });
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        const result = bookSchema.safeParse(req.body);

        if (!result.success) {
            const errors = parseErrors(result.error);
            const book = await booksModel.getByIsbn(isbn);
            const genres = await genresModel.getAll();
            const authors = await authorsModel.getAll();
            const bookAuthors = await booksModel.getAuthorsByBook(isbn);
            return res.render('books/edit', { book, genres, authors, bookAuthors, errors });
        }

        const { title, description, genre_id, year, pages_number, author_ids, percentages } = result.data;
        await booksModel.update(isbn, title, description, genre_id, year, pages_number, author_ids, percentages);
        res.redirect('/books');
    } catch (error) {
        next(error);
    }
};
const remove = async (req, res, next) => {
    try {
        const { isbn } = req.params;
        await booksModel.delete(isbn);
        res.redirect('/books');
    } catch (error) {
        next(error);
    }
}

const getByMinPages = async (req, res, next) => {
    try {
        const { min_pages } = req.params;
        const books = await booksModel.getByMinPages(min_pages);
        res.render('books/by-pages', { books, min_pages });
    } catch (error) {
        next(error);
    }
}

export { getAll, getByIsbn, create, insert, edit, update, remove, getByMinPages };