const mongoose = require('mongoose');
const httpStatus = require('http-status');
const GlobalConfig = require('../config/globalConfig')
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const { APP_ENV } = require('../config/constants');

export const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

export const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (GlobalConfig.env === APP_ENV.PROD && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const response = {
        code: statusCode,
        message,
        ...(GlobalConfig.env === APP_ENV.DEV && { stack: err.stack }),
    };

    if (GlobalConfig.env === APP_ENV.DEV) {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};