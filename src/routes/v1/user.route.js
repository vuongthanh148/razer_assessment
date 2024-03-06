import express from 'express';
import userController from '../../controllers/user.controller.js';
import { auth } from '../../middlewares/auth.js';
import { validate } from "../../middlewares/validate.js";
import userValidation from "../../validations/user.validation.js";

const router = express.Router();

router
    .route('/')
    .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
    .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);


export default router