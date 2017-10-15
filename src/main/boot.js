const restify = require('restify');

const ConfigService = require('./services/configService.js');

const configService = new ConfigService();

const healthcheck = (req, res, next) => {
    res.send(configService.name);
};

const server = restify.createServer();
server.name = configService.name;

// routes
server.get('/healthcheck', healthcheck);

server.listen(configService.port, () => {
    console.log('%s @ %s', server.name, server.url);
});
