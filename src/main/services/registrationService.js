const getHash = require('./crypto.js').getHash;
const cryptoRandomString = require('crypto-random-string');
const validateStr = require('../util.js').validateStr;

const specialCharRegex = /^[^!@#$%^&*():;"'{}[\]_\-+|\/<>,.?~`]*$/;
/**
 * Service to register new users
 */
class RegistrationService {
    /**
     * Constructor
     * @constructor
     * @param {Object} databaseService - database access layer
     */
    constructor(databaseService) {
        this.dbService = databaseService;
    }

    /**
     * Register new user using request
     * @param {Object} request - New user details
     * @return {Promise} - will return promise
     */
    register(request) {
        validateStr('Username', 4, 60)(request.username);
        validateStr('Password', 6, 24, /^[^"']*$/)(request.password);
        validateStr('First Name', 1, 24, specialCharRegex)(request.firstname);
        validateStr('Last Name', 1, 24, specialCharRegex)(request.lastname);
        const salt = cryptoRandomString(12);
        return this.dbService.register(
            request.username,
            getHash(request.password, salt),
            request.firstname,
            request.lastname,
            salt);
    }
};

module.exports = RegistrationService;
