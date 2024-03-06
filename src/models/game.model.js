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
            default: "https://media.gold.razer.com/goldweb/site/images/logo/razer-gold-silver.png"
        },
        category: {
            type: [String],
            enum: CATEGORY_ENUM,
            required: true,
        },
        genre: {
            type: [String],
            enum: GENRE_ENUM,
            required: true,
        },
        platform: {
            type: [String],
            enum: PLATFORM_ENUM,
            required: true,
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
