import mongoose from 'mongoose'
import { GlobalConfig } from '../config/globalConfig.js'
import { logger } from '../config/logger.js'
import httpStatus from 'http-status';
import { ApiError } from '../utils/api-error.js';
import { APP_ENV } from '../config/constants.js';

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

export const errorResponseHandler = (err, req, res, next) => {
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