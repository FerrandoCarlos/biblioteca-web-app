import db from '../config/db.js';

class GenresModel {

    async getAll() {
        try {
            const { rows } = await db.query('SELECT * FROM get_all_genres()');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener géneros: ${error.message}`);
        }
    }

    async getById(id) {
        try {
            const { rows } = await db.query(
                'SELECT * FROM get_genre_by_id($1)', [id]
            );
            return rows[0] ?? null;
        } catch (error) {
            throw new Error(`Error al obtener género: ${error.message}`);
        }
    }

    async insert(description) {
        try {
            await db.query(
                'CALL insert_genre($1)', [description]
            );
        } catch (error) {
            throw new Error(`Error al insertar género: ${error.message}`);
        }
    }

    async update(id, description) {
        try {
            await db.query(
                'CALL update_genre($1,$2)', [id, description]
            )
        } catch (error) {
            throw new Error(`Error al actualizar género: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            await db.query(
                'CALL delete_genre($1)', [id]
            )
        } catch (error) {
            throw new Error(`Error al eliminar género: ${error.message}`);
        }
    }
}

export default new GenresModel();