// HOF (Higher Order Function) que recibe un schema de Zod
// y retorna un middleware que valida req.body antes de llegar al controller
// Si la validación falla retorna los errores, si pasa limpia los datos
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
        const errors = result.error.errors.map(err => ({
            field: err.path[0],
            message: err.message
        }));
        return res.status(400).json({ errors });
    }

    req.body = result.data;
    next();
};

export default validate;