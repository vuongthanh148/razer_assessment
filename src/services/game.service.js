import httpStatus from "http-status";
import { Game } from "../models/game.model.js";
import { ApiError } from "../utils/api-error.js";

/**
 * Create new game
 * @param {Object} userBody
 * @returns {Promise<Game>}
 */
const createGame = async (userBody) => {
    const game = await Game.create(userBody)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot create game")
    return game
}

/**
   * @typedef {Object} Option
   * @property {string} sortBy - Sort option in the format: sortField:(desc|asc)
   * @property {number} limit - Maximum number of results per page (default = 10)
   * @property {number} page - Current page (default = 1)
*/
/**
   * @typedef {Object} QueryResult
   * @property {Document[]} results - Results found
   * @property {number} page - Current page
   * @property {number} limit - Maximum number of results per page
   * @property {number} totalPages - Total number of pages
   * @property {number} totalResults - Total number of documents
   */
/**
 * Query for games
 * @param {Object} filter - Mongo filter
 * @param {Option} options - Query options
 * @returns {Promise<QueryResult>}
 */
const queryGames = async (filter, options) => {
    const game = await Game.paginate(filter, options)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot create game")
    return game
}

/**
 * Query game by gameId
 * @param {ObjectId} gameId - Id of the game
 * @returns {Promise<Game>}
 */
const queryOneGame = async (gameId) => {
    const game = await Game.findById(gameId)
    if (!game) throw new ApiError(httpStatus.BAD_REQUEST, "Cannot find game")
    return game
}

/**
 * Update game by gameId
 * @param {ObjectId} gameId - Id of the game
 * @param {Object} updateBody 
 * @returns {Promise<Game>}
 */
const updateGame = async (gameId, updateBody) => {
    const filter = {
        id: gameId
    }
    const game = await Game.updateOne(filter, updateBody)
    return game
}

/**
 * Delete game by gameId
 * @param {ObjectId} gameId - Id of the game
 * @returns {Promise<Game>}
 */
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