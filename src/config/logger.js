const winston = require('winston')
const GlobalConfig = require('./globalConfig')
const { APP_ENV } = require('./constants')

const enumerateErrorFormat = winston.format((info) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack })
    }
})

export const logger = winston.createLogger({
    level: GlobalConfig.env === APP_ENV.DEV ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        GlobalConfig.env === APP_ENV.DEV ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf(({ level, message }) => `${level}: ${message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error']
        })
    ]
})
