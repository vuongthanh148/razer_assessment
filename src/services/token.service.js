import jsonwebtoken from 'jsonwebtoken';
import moment from "moment";
import { TOKEN_TYPE } from "../config/constants.js";
import { GlobalConfig } from "../config/globalConfig.js";
import { Token } from "../models/token.model.js";

const generateToken = (userId, expires, type, secret = GlobalConfig.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jsonwebtoken.sign(payload, secret);
};

const verifyToken = async (token, type) => {
    const payload = jwt.verify(token, GlobalConfig.jwt.secret);
    const tokenDoc = await Token.findOne({ token, type, user: payload.sub, blacklisted: false });
    if (!tokenDoc) {
        throw new Error('Token not found');
    }
    return tokenDoc;
};

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type,
        blacklisted,
    });
    return tokenDoc;
};


const generateAuthTokens = async (user) => {
    const accessTokenExpires = moment().add(GlobalConfig.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accessTokenExpires, TOKEN_TYPE.ACCESS);

    const refreshTokenExpires = moment().add(GlobalConfig.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, TOKEN_TYPE.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, TOKEN_TYPE.REFRESH);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

export default {
    generateAuthTokens,
    generateToken,
    verifyToken
};
