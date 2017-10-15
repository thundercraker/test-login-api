const restify = require('restify');

const {logger, logAction} = require('./services/logger.js');
const ConfigService = require('./services/configService.js');

const configService = new ConfigService();

const healthcheck = (req, res, next) => {
    logger.info('Healthcheck request received');
    logAction(() => {
        res.send(configService.name);
    });
};

const server = restify.createServer();
server.name = configService.name;

// routes
server.get('/healthcheck', healthcheck);

server.listen(configService.port, () => {
    console.log('%s @ %s', server.name, server.url);
});
