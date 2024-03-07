import httpStatus from "http-status";
import { Game } from "../models/game.model.js";
import { ApiError } from "../utils/api-error.js";

/**
 * Create new game
 * @param {Object} gameBody
 * @returns {Promise<Game>}
 */
const createGame = async (gameBody) => {
    if (await Game.isGameNameTaken(gameBody.username)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Game already taken');
    }
    const game = await Game.create(gameBody)
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
   * @property {Document[]} data - Results found
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
const getGameById = async (gameId) => {
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
    const game = await getGameById(gameId)
    if (!game) throw new ApiError(httpStatus.NOT_FOUND, 'Game not found')
    if (updateBody.name && (await Game.isGameNameTaken(updateBody.name, gameId))) throw new ApiError(httpStatus.BAD_REQUEST, 'Game name already taken')
    Object.assign(game, updateBody)
    await game.save()
    return game
}

/**
 * Delete game by gameId
 * @param {ObjectId} gameId - Id of the game
 * @returns {Promise<Game>}
 */
const deleteGame = async (gameId) => {
    const game = await Game.deleteOne({ _id: gameId })
    return game
}

export default {
    createGame,
    queryGames,
    getGameById,
    updateGame,
    deleteGame
}