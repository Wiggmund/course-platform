class IllegalArgumentException extends Error {
    constructor(funName: string, expected?: string, got?: string) {
        super(`Was passed wrong argument to ${funName}
            ${expected && got ? `\n\t[Expected: ${expected}\tGot:${got}]` : ''}`);
    }
}

export default IllegalArgumentException;