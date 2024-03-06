import httpStatus from "http-status";
import { Game } from "../models/game.model.js";
import { ApiError } from "../utils/apiError.js";

const createGame = async (body) => {
    const game = await Game.create(body)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot create game")
    return game
}

const queryGames = async (term, filter, options) => {
    const game = await Game.paginate(filter, options)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot create game")
    return game
}

const queryOneGame = async (gameId) => {
    const game = await Game.findById(gameId)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot find game")
    return game
}

const updateGame = async (gameId, updateBody) => {
    const filter = {
        id: gameId
    }
    const game = await Game.updateOne(filter, updateBody)
    return game
}

const deleteGame = async (gameId) => {
    const game = await Game.deleteOne(gameId)
    return game
}

export default {
    createGame,
    queryGames,
    queryOneGame,
    updateGame,
    deleteGame
}