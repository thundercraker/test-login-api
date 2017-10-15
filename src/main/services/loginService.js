const getHash = require('./crypto.js').getHash;
const validateStr = require('../util.js').validateStr;
const logger = require('./logger.js');

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
     * @return {Promise} promise with true or false
     */
    login(username, password) {
        validateStr('Username', 4, 60)(username);
        validateStr('Password', 6, 24, /^[^"']*$/)(password);

        return this.dbService.getAuthInfoByUsernameAndType(username, 1)
            .then((userAuthRow) => {
                if (userAuthRow != null) {
                    const hashAndSalt = userAuthRow.r_auth.split('/');
                    if (hashAndSalt[0] === getHash(password, hashAndSalt[1])) {
                        this.dbService.updateLastLogin(userAuthRow.r_user_id);
                        return true;
                    }
                    return false;
                }
                return false;
            })
            .catch((err) => {
                logger.error(err);
            });
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
