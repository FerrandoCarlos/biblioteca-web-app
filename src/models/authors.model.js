import db from '../config/db.js';

class AuthorsModel {
    async getAll() {
        try {
            const { rows } = await db.query('SELECT * FROM get_all_authors()');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener autores: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const { rows } = await db.query('SELECT * FROM get_author_by_id($1)', [id]);
            return rows[0] ?? null;
        } catch (error) {
            throw new Error(`Error al obtener autor: ${error.message}`);
        }
    }
    async insert(first_name, last_name, id_card, email, photo) {
        try {
            await db.query('CALL insert_author($1,$2,$3,$4,$5)', [first_name, last_name, id_card, email, photo]);
        } catch (error) {
            throw new Error(`Error al insertar autor: ${error.message}`);
        }
    }
    async update(id, first_name, last_name, id_card, email, photo) {
        try {
            await db.query('CALL update_author($1,$2,$3,$4,$5,$6)', [id, first_name, last_name, id_card, email, photo]);
        } catch (error) {
            throw new Error(`Error al actualizar autor: ${error.message}`);
        }
    }
    async delete(id) {
        try {
            await db.query('CALL delete_author($1)', [id]);
        } catch (error) {
            throw new Error(`Error al eliminar autor: ${error.message}`);
        }
    }
    async getBooksByAuthor(id) {
        try {
            const { rows } = await db.query('SELECT * FROM get_books_by_author($1)', [id]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener libros del autor: ${error.message}`);
        }
    }
    async getPhotosByBook(isbn) {
        try {
            const { rows } = await db.query('SELECT * FROM get_author_photos_by_book($1)', [isbn]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener fotos de autores: ${error.message}`);
        }
    }

    async getGenreParticipation(genre_id) {
        try {
            const { rows } = await db.query('SELECT * FROM get_author_by_genre_participation($1)', [genre_id]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener autores por género: ${error.message}`);
        }
    }
}

export default new AuthorsModel();