const parseErrors = (zodError) => {
    zodError.errors.map(err => ({
        field: err.path[0],
        message: err.message
    }));
};

export default parseErrors;