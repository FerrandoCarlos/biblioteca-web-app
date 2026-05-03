import db from '../config/db.js';

class BooksModel {
    async getAll() {
        try {
            const { rows } = await db.query('SELECT * FROM get_all_books()');
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener libros: ${error.message}`);
        }
    }

    async getByIsbn(isbn) {
        try {
            const { rows } = await db.query('SELECT * FROM get_books_by_isbn($1)', [isbn]);
            return rows[0] ?? null;
        } catch (error) {
            throw new Error(`Error al obtener libro: ${error.message}`);
        }
    }

    async getByMinPages(min_pages) {
        try {
            const { rows } = await db.query('SELECT * FROM get_books_by_min_pages($1)', [min_pages]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener libros por páginas: ${error.message}`);
        }
    }

    async getAuthorsByBook(isbn) {
        try {
            const { rows } = await db.query('SELECT * FROM get_authors_by_book($1)', [isbn]);
            return rows;
        } catch (error) {
            throw new Error(`Error al obtener autores del libro: ${error.message}`);
        }
    }

    async insert(isbn, title, description, genre_id, year, pages, author_ids, percentages) {
        try {
            await db.query('CALL books_insert_with_authors($1,$2,$3,$4,$5,$6,$7,$8)',
                [isbn, title, description, genre_id, year, pages, author_ids, percentages]
            );
        } catch (error) {
            throw new Error(`Error al insertar libro: ${error.message}`);
        }
    }

    async update(isbn, title, description, genre_id, year, pages, author_ids, percentages) {
        try {
            await db.query('CALL books_insert_with_authors($1,$2,$3,$4,$5,$6,$7,$8)',
                [isbn, title, description, genre_id, year, pages, author_ids, percentages]
            );
        } catch (error) {
            throw new Error(`Error al insertar libro: ${error.message}`);
        }
    }

    async delete(isbn) {
        try {
            await db.query('CALL books_delete_with_authors($1)', [isbn]);
        } catch (error) {
            throw new Error(`Error al eliminar libro: ${error.message}`);
        }
    }
}
export default new BooksModel();