import Joi from "joi";
import { CATEGORY_ENUM, GENRE_ENUM, PLATFORM_ENUM } from "../config/constants.js";
import { objectId } from "./custom.validation.js";

const createGame = {
    body: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.array().valid(...CATEGORY_ENUM).default([]),
        genre: Joi.array().valid(...GENRE_ENUM).default([]),
        platform: Joi.array().valid(...PLATFORM_ENUM).default([]),
    }),
};

const queryGame = {
    params: Joi.object().keys({
        gameId: Joi.string().custom(objectId),
    }),
};

const queryGames = {
    query: Joi.object().keys({
        name: Joi.string(),
        category: Joi.array().items(Joi.string()).single(),
        platform: Joi.array().items(Joi.string()).single(),
        genre: Joi.array().items(Joi.string()).single(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateGame = {
    params: Joi.object().keys({
        gameId: Joi.string().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            name: Joi.string(),
            category: Joi.array().valid(...CATEGORY_ENUM),
            genre: Joi.array().valid(...GENRE_ENUM),
            platform: Joi.array().valid(...PLATFORM_ENUM),
        })
        .min(1),
};

const deleteGame = {
    params: Joi.object().keys({
        gameId: Joi.string().custom(objectId),
    }),
};


export default {
    createGame,
    queryGames,
    queryGame,
    updateGame,
    deleteGame,
}