import { logger } from "../config/logger.js"

export const auth = (...requiredPermission) => async (req, res, next) => {
    logger.info(requiredPermission)
    next()
}
