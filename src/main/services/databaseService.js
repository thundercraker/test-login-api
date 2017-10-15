const {Client} = require('pg');
const {logger} = require('./logger.js');

/**
 * Database access layer
 */
class DatabaseService {
    /**
     * @constructor
     */
    constructor() {
        this.client = new Client();
    }

    /**
     * Connect to the database
     */
    connect() {
        if (!this.connected ) {
            this.client.connect();
            this.connected = true;
        }
    }

    /**
     * @param {string} username - Username
     * @param {string} passwordHash - hash of the users password + salt
     * @param {string} firstname - The first name (column is not null)
     * @param {string} lastname - The last name (column is nullable)
     * @param {string} salt - The salt for the passwordHash
     * @return {Promise} - A promise that completes when the query is complete
     */
    register(username, passwordHash, firstname, lastname, salt) {
        const auth = passwordHash + salt;
        return new Promise((resolve, reject) => {
            this.connect();
            this.client.query(`SELECT * from register_user(
                cast($1 as varchar(60)),
                cast($2 as int2),
                cast($3 as varchar(100)),
                cast($4 as varchar(100)),
                cast($5 as varchar(100))
            );`, [username, 1, auth, firstname, lastname], (err, res) => {
                this.client.end();
                if (err) {
                    logger.error(err);
                    reject(err);
                } else {
                    logger.info('Successful [register]');
                    resolve();
                }
            });
        });
    }

    /**
     * Update the last login time
     * @param {string} username - The username
     * @param {int} authType - The authType
     * @return {Promise} - A promise that completes when the query is complete
     */
    getAuthInfoByUsernameAndType(username, authType) {
        return new Promise((resolve, reject) => {
            this.connect();
            this.client.query(`select * from get_auth_by_username_type(
                cast($1 as varchar(60)), 
                cast($2 as int2));`,
            [username, authType],
            (err, res) => {
                this.client.end();
                if (err) {
                    logger.error(err);
                    reject(err);
                } else {
                    logger.info('Successful [getAuthInfoByUsernameAndType]');
                    resolve(res.rows[0]);
                }
            });
        });
    }

    /**
     * Update the last login time
     * @param {int} userid - The user id
     * @return {Promise} - A promise that completes when the query is complete
     */
    updateLastLogin(userid) {
        return new Promise((resolve, reject) => {
            this.connect();
            this.client.query(`select * from update_login_time($1);`, [userid],
            (err, res) => {
                this.client.end();
                if (err) {
                    logger.error(err);
                    reject(err);
                } else {
                    logger.info('Successful [updateLastLogin]');
                    resolve();
                }
            });
        });
    }
};

module.exports = DatabaseService;
