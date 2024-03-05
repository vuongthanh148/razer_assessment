import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

const createUser = async (userBody) => {
    if (await User.isUsernameTaken(userBody.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Username already taken');
    }
    return User.create(userBody);
};

const getUserByUsername = async (username) => {
    return User.findOne({ username });
};

export default {
    createUser,
    getUserByUsername
}
