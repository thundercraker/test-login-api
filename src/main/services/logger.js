const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new winston.transports.File({filename: 'combined.log'}),
  ],
});

// TODO uncomment this when api is production ready
// if (process.env.NODE_ENV !== 'production') {
//   logger.add(new winston.transports.Console({
//     format: winston.format.simple()
//   }));
// }

const logAction = (func) => {
    try {
        func();
    } catch (e) {
        logger.log({
            level: 'error',
            message: e,
        });
    }
};

module.exports = {
    logger: logger,
    logAction: logAction,
};
