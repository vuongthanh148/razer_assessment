
import httpStatus from "http-status";
import { gameService } from "../services/index.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createGame = asyncHandler(async (req, res) => {
    const createdGame = await gameService.createGame(req.body);
    res.status(httpStatus.CREATED).send({ games: createdGame });
});

const queryGames = asyncHandler(async (req, res) => {
    const term = pick(req.query, ['term']);
    const filter = pick(req.query, ['category', 'platform', 'genre'])
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await gameService.queryGames(term, filter, options);
    res.status(httpStatus.SUCCESS).send({ result });
});

const queryOneGame = asyncHandler(async (req, res) => {
    const game = await gameService.queryOneGame(req.params.gameId)
    res.status(httpStatus.SUCCESS).send({ game });
});

const updateGame = asyncHandler(async (req, res) => {
    const updatedGame = await gameService.updateGame(req.params.gameId, req.body)
    res.status(httpStatus.SUCCESS).send({ updatedGame });
});

const deleteGame = asyncHandler(async (req, res) => {
    const deletedGame = await gameService.deleteGame(req.params.gameId)
    res.status(httpStatus.SUCCESS).send({ deletedGame });
});

export default {
    createGame,
    queryGames,
    queryOneGame,
    updateGame,
    deleteGame
}