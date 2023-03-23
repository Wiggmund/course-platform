class InternalServerError extends Error {
    constructor(details: string) {
        super(`Something went wrong on the server.\n\tDetails: ${details}`);
    }
}

export default InternalServerError;