// Centraliza el manejo de errores de toda la aplicación
// Debe registrarse ÚLTIMO en app.js después de todas las rutas
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.status ?? 500;
    const message = err.message ?? 'Error interno del servidor';

    res.status(status).render('error', {
        status,
        message
    });
}
// Captura rutas que no existen y las deriva al errorHandler
// Debe registrarse ANTES del errorHandler en app.js
const notFound = (req, res, next) => {
    const err = new Error(`Ruta ${req.originalUrl} no encontrada`);

    err.status = 404;

    next(err);
};

export { errorHandler, notFound };