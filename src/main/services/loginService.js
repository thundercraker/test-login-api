const crypto = require('crypto');
const cryptoRandomString = require('crypto-random-string');
const vExIf = require('../util.js').validationExceptionIf;

const validateStr = (name, minlength, maxlength) => {
    return (stringVal) => {
        vExIf(typeof(stringVal) !== 'string', name + ' must be a string');
        vExIf(stringVal.length < minlength,
            name + ' cannot have under ' + minlength + ' characters');
        vExIf(stringVal.length > maxlength,
            name + ' cannot have over ' + minlength + ' characters');
        vExIf(/^[a-zA-Z0-9-_@. ]*$/.test(stringVal) == false,
            name+ ' contains illegal characters.');
    };
};

module.exports = {
    hashPassword: (clearText) => {
        const hash = crypto.createHash('sha256');
        const salt = cryptoRandomString(12);
        hash.update(clearText + salt);
        return {'hash': hash.digest('hex'), 'salt': salt};
    },
    login: (username, password) => {
        validateStr('Username', 1, 60)(username);
        validateStr('Password', 1, 24)(password);
        return false;
    },
};
