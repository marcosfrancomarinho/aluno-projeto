export class Exception extends Error {
    static INVALID = Symbol("INVALID");
    static UNDEFINED = Symbol("UNDEFINED");
    static TIME_PAST = Symbol("TIME_PAST");
    static NO_SPECIALTY = Symbol("NO_SPECIALTY");
    static TIME_NOT_MATCH = Symbol("TIME_NOT_MATCH");
    static NO_EXIST = Symbol("NO_EXIST");

    public constructor(public message: string, public statusCode: number, public code: Symbol) {
        super(message);
    }
}
