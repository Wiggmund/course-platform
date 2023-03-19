class IllegalArgumentException extends Error {
    constructor(functionName: string) {
        super(`Illegal argument exception for ${functionName} function`);
    }
}

export default IllegalArgumentException;