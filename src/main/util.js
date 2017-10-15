const {ApiException, ExceptionID} = require('./exceptions.js');

const apiExIf = (cond, msg, type, cause) => {
    if (cond === true) {
        throw new ApiException(msg, type, cause);
    }
};

const validateStr = (name, minlength, maxlength, regex) => {
    return (stringVal) => {
        apiExIf(typeof(stringVal) !== 'string',
            name + ' must be a string',
            ExceptionID.ArgumentMustBeAString,
            name);
        apiExIf(stringVal.length < minlength,
            name + ' cannot have under ' + minlength + ' characters',
            ExceptionID.ArgumentTooShort,
            name);
        apiExIf(stringVal.length > maxlength,
            name + ' cannot have over ' + minlength + ' characters',
            ExceptionID.ArgumentTooLong,
            name);
        regex = (regex) ? regex : /^[a-zA-Z0-9-_@. ]*$/;
        apiExIf(regex.test(stringVal) == false,
            name + ' contains illegal characters.',
            ExceptionID.ArgumentHasSpecialChar,
            name);
    };
};

module.exports = {
    apiExceptionIf: apiExIf,
    validateStr: validateStr,
};
