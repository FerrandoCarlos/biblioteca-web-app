import genresModel from '../models/genres.model.js';
import genreSchema from '../schemas/genres.schema.js';
import parseErrors from '../utils/parseErrors.js';

const getAll = async (req, res, next) => {
    try {
        const genres = await genresModel.getAll();
        res.render('genres/index', { genres });
    } catch (error) {
        next(error);
    }
};

const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const genre = await genresModel.getById(id);

        if (!genre) return res.redirect('/genres');

        res.render('genres/edit', { genre });
    } catch (error) {
        next(error);
    }
};

const create = async (req, res, next) => {
    try {
        res.render('genres/create');
    } catch (error) {
        next(error);
    }
};

const insert = async (req, res, next) => {
    try {
        const result = genreSchema.safeParse(req.body);

        if (!result.success) {
            const errors = parseErrors(result.error);
            return res.render('genres/create', { errors });
        }
        await genresModel.insert(result.data.description);
        res.redirect('/genres');
    } catch (error) {
        next(error);
    }
};

const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = genreSchema.safeParse(req.body);

        if (!result.success) {
            const errors = parseErrors(result.error);

            const genre = await genresModel.getById(id);
            return res.render('genres/edit', { genre, errors });
        }

        await genresModel.update(id, result.data.description);
        res.redirect('/genres');
    } catch (error) {
        next(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await genresModel.delete(id)
        res.redirect('/genres');
    } catch (error) {
        next(error);
    }
};

export { getAll, getById, create, insert, update, remove };