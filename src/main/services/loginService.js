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

const getHash = (clearText, salt) => {
    const hash = crypto.createHash('sha256');
    hash.update(clearText + salt);
    return hash.digest('hex');
};

/**
 * Service for login actions
 */
class LoginService {
    /**
     * Constructor
     * @constructor
     * @param {object} databaseService - an object that gives access
     * to the database layer
     */
    constructor(databaseService) {
        this.dbService = databaseService;
    }

    /**
     * Login with username and password
     * @param {string} username - Username
     * @param {string} password - Password
     * @return {boolean} true or false
     */
    login(username, password) {
        validateStr('Username', 1, 60)(username);
        validateStr('Password', 1, 24)(password);

        const userAuthRow = this.dbService.getAuthInfo(username, 1);
        if (userAuthRow != null) {
            const hashAndSalt = userAuthRow.auth.split('/');
            return hashAndSalt[0] === getHash(password, hashAndSalt[1]);
        }
        return false;
    }
}

/*
hashPassword: (clearText, salt) => {
        const hash = crypto.createHash('sha256');
        const salt = cryptoRandomString(12);
        hash.update(clearText + salt);
        return {'hash': hash.digest('hex'), 'salt': salt};
    },
*/

module.exports = {
    getHash: getHash,
    LoginService: LoginService,
};
