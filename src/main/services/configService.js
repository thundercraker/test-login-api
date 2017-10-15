const config = require('config');

/**
 * Class to get config variables wrt to the environment
 */
class ConfigService {
    /**
     * Initialize configuration service
     * @constructor
     */
    constructor() {
        this.env = process.env['NODE_ENV'];
        this.name = config.get('service_name');
        this.version = config.get('service_version');
        this.port = config.get('port');
    }
}

module.exports = ConfigService;
