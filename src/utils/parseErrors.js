const parseErrors = (zodError) => {
    const issues = zodError?.issues ?? zodError?.errors ?? []
    return issues.map(err => ({
        field: err.path[0],
        message: err.message
    }))
}

export default parseErrors