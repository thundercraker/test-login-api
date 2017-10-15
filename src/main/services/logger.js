const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

const logAction = (func, recover) => {
    try {
        func();
    } catch (e) {
        logger.error(e);
        recover();
    }
};

module.exports = {
    logger: logger,
    logAction: logAction,
};
