/**
 * Object for validation exceptions
 */
class ValidationException {
    /**
     * Constructor
     * @constructor
     * @param {string} message - message of the exception
     */
    constructor(message) {
        this.message = message;
        this.name = 'ValidationException';
    };
}

module.exports = {
    validationExceptionIf: (cond, msg) => {
        if (cond === true) {
            throw new ValidationException(msg);
        }
    },
    ValidationException: ValidationException,
};
