// Centralizamos los errores
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.status ?? 500;
    const message = err.message ?? 'Error interno del servidor';

    res.status(status).render('error', {
        status,
        message
    });
}
// Capturar rutas inexistentes
const notFound = (req, res, next) => {
    const err = new Error(`Ruta ${req.originalUrl} no encontrada`);

    err.status = 404;

    next(err);
};

export { errorHandler, notFound };