import express from 'express';
import gameController from '../../controllers/game.controller.js';
import { auth } from '../../middlewares/auth.js';
import { PERMISSION } from '../../config/roles.js';
import { validate } from '../../middlewares/validate.js';
import gameValidation from '../../validations/game.validation.js';

const router = express.Router();

router.route('/')
    .get(auth([PERMISSION.GET_GAME]), validate(gameValidation.queryGames), gameController.queryGames)
    .post(auth([PERMISSION.CREATE_GAME]), validate(gameValidation.createGame), gameController.createGame)

router.route('/:gameId')
    .get(auth([PERMISSION.GET_GAME]), validate(gameValidation.queryGame), gameController.queryOneGame)
    .patch(auth([PERMISSION.UPDATE_GAME]), validate(gameValidation.updateGame), gameController.updateGame)
    .delete(auth([PERMISSION.DELETE_GAME]), validate(gameValidation.deleteGame), gameController.deleteGame)

export default router