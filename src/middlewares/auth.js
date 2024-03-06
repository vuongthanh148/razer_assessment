import httpStatus from "http-status";
import passport from "passport";
import { ROLE_PERMISSION } from "../config/roles.js";
import { ApiError } from "../utils/api-error.js";

export const verifyCallback = (req, resolve, reject, requiredPermission) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate'));
    }
    req.user = user;

    if (requiredPermission.length) {
        const userPermissions = ROLE_PERMISSION.get(user.role);
        const hasPermission = requiredPermission.every((requiredRight) => userPermissions.includes(requiredRight));
        if (!hasPermission && req.params.userId !== user.id) {
            return reject(new ApiError(httpStatus.FORBIDDEN, 'Forbidden'));
        }
    }

    resolve();
};

export const auth = (...requiredPermission) => async (req, res, next) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, verifyCallback(req, resolve, reject, requiredPermission))(req, res, next);
    })
        .then(() => next())
        .catch((err) => next(err));
};

