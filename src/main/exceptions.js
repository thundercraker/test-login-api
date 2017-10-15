const ExceptionID = {
    ArgumentMustBeAString: 1,
    ArgumentTooShort: 2,
    ArgumentTooLong: 3,
    ArgumentHasSpecialChar: 4,
};

/**
 * Object for exceptions
 */
class ApiException {
    /**
     * Constructor
     * @constructor
     * @param {string} message - message of the exception
     * @param {int} type - type of the exception
     * @param {string} cause - cause of the exception
     */
    constructor(message, type, cause) {
        this.message = message;
        this.type = type;
        this.cause = cause;
    };
}

module.exports = {
    ExceptionID: ExceptionID,
    ApiException: ApiException,
};
