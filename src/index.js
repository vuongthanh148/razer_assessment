import mongoose from 'mongoose'
import { app } from './app.js';
import { GlobalConfig } from './config/globalConfig.js';
import { logger } from './config/logger.js';

let server;
mongoose.connect(GlobalConfig.mongoose.url, GlobalConfig.mongoose.options).then(() => {
    logger.info('Connected to MongoDB');
    server = app.listen(GlobalConfig.port, () => {
        logger.info(`Listening to port ${GlobalConfig.port}`);
    });
}).catch(error => {
    logger.error(error)
});

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
