const getHash = require('./crypto.js').getHash;
const validateStr = require('../util.js').validateStr;

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
        validateStr('Username', 4, 60)(username);
        validateStr('Password', 6, 24, /^[^"']*$/)(password);

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

module.exports = LoginService;
