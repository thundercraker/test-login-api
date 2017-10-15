require('dotenv').config();
const restify = require('restify');

const {logger, logAction} = require('./services/logger.js');

const ConfigService = require('./services/configService.js');
const DatabaseService = require('./services/databaseService.js');
const LoginService = require('./services/loginService.js');
const RegistrationService = require('./services/registrationService.js');

const configService = new ConfigService();
const databaseService = new DatabaseService();
const loginService = new LoginService(databaseService);
const registrationService = new RegistrationService(databaseService);

const existingUserSqlEx = require('./constants.js').existingUserSqlEx;

const healthcheck = (req, res, next) => {
    logger.info('Healthcheck request received');
    logAction(() => {
        res.send(configService.name);
    });
    next();
};

const login = (req, res, next) => {
    logAction(() => {
        logger.info('Login request received for ' + req.body.username);
        loginService.login(req.body.username, req.body.password)
            .then(
            (result) => {
                res.send({
                    'result': result,
                });
                next();
            })
            .catch((err) => {
                res.send({
                    'error': 'An internal server error occured',
                });
                next();
            });
    }, () => {
        res.send({
            'error': 'An internal server error occured',
        });
        next();
    });
};

const register = (req, res, next) => {
    logAction(() => {
        console.log(req.body);
        const request = req.body;
        logger.info('Registration request received for ' + request.username);
        registrationService.register(request)
            .then(
            (result) => {
                res.send({
                    'result': 'OK',
                });
                next();
            })
            .catch((err) => {
                let message = 'An internal server error occured';
                if (err.message && existingUserSqlEx == err.message) {
                    message = 'The user has already signed up';
                }
                res.send({
                    'error': message,
                });
                next();
            });
    }, () => {
        res.send({
            'error': 'An internal server error occured',
        });
        next();
    });
};

const server = restify.createServer();
server.name = configService.name;
server.version = configService.version;
server.use(restify.plugins.bodyParser({
    mapParams: true,
}));

// routes
server.get('/healthcheck', healthcheck);
server.post('/register', register);
server.post('/login', login);

server.listen(configService.port, () => {
    console.log('%s @ %s', server.name, server.url);
});
