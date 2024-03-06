import mongoose from 'mongoose';
import { CATEGORY_ENUM, GENRE_ENUM, PLATFORM_ENUM } from '../config/constants.js';
import { paginate, toJSON } from './plugins/index.plugin.js';

const gameSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        thumbnail: {
            type: String,
        },
        category: {
            type: [String],
            enum: CATEGORY_ENUM,
            default: []
        },
        genre: {
            type: [String],
            enum: GENRE_ENUM,
            default: []
        },
        platform: {
            type: [String],
            enum: PLATFORM_ENUM,
            default: []
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
gameSchema.plugin(toJSON);
gameSchema.plugin(paginate)

gameSchema.index({ name: 'text' })

export const Game = mongoose.model('Game', gameSchema);
