import authorsModel from '../models/authors.model.js';
import authorSchema from '../schemas/authors.schema.js'
import parseErrors from '../utils/parseErrors.js';
import genresModel from '../models/genres.model.js';
const getAll = async (req, res, next) => {
    try {
        const authors = await authorsModel.getAll();
        res.render('authors/index', { authors });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await authorsModel.getById(id);

        if (!author) return res.redirect('/authors');

        const books = await authorsModel.getBooksByAuthor(id);
        res.render('authors/show', { author, books });
    } catch (error) {
        next(error);
    }
};
// getById está mostrando show, no edit
// Necesitamos una función edit separada
const edit = async (req, res, next) => {
    try {
        const { id } = req.params;
        const author = await authorsModel.getById(id);

        if (!author) return res.redirect('/authors');

        res.render('authors/edit', { author, errors: [] });
    } catch (error) {
        next(error);
    }
};
const create = async (req, res, next) => {
    try {
        res.render('authors/create');
    } catch (error) {
        next(error);
    }
};

const insert = async (req, res, next) => {
    try {
        const result = authorSchema.safeParse(req.body);
        if (!result.success) {
            const errors = parseErrors(result.error);
            return res.render('authors/create', { errors });
        }

        const { first_name, last_name, id_card, email, photo } = result.data;
        await authorsModel.insert(first_name, last_name, id_card, email, photo);
        res.redirect('/authors');
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = authorSchema.safeParse(req.body);

        if (!result.success) {
            const errors = parseErrors(result.error);
            const author = await authorsModel.getById(id);
            return res.render('authors/edit', { author, errors });
        }

        const { first_name, last_name, id_card, email, photo } = result.data;
        await authorsModel.update(id, first_name, last_name, id_card, email, photo);
        res.redirect('/authors');

    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await authorsModel.delete(id);
        res.redirect('/authors');
    } catch (error) {
        next(error);
    }
};

const getByGenreParticipation = async (req, res, next) => {
    try {
        const { genre_id } = req.query
        const genres = await genresModel.getAll()
        const authors = genre_id
            ? await authorsModel.getGenreParticipation(genre_id)
            : []
        res.render('authors/by-genre', { authors, genres, genre_id })
    } catch (error) {
        next(error)
    }
}
export { getAll, getById, edit, create, insert, update, remove, getByGenreParticipation };