class InterceptorException extends Error {
    constructor(type: string) {
        super(`Exception in ${type} interceptopr`);
    }
}

export default InterceptorException;