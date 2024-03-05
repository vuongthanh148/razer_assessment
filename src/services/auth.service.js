import httpStatus from "http-status";
import { ApiError } from "../utils/ApiError.js";
import { userService } from "./index.service.js";

const loginUserWithUsernameAndPassword = async (username, password) => {
    const user = await userService.getUserByUsername(username);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect username or password');
    }
    return user;
};

export default {
    loginUserWithUsernameAndPassword
};
