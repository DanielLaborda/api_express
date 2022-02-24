"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    slug: { type: String },
    image: { type: String, lowercase: true },
    title: { type: String },
    director: { type: String },
    platform: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Platform'
        }],
    score: { type: Number },
    createAt: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now },
    reviews: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review'
        }],
});
exports.default = (0, mongoose_1.model)('Movie', MovieSchema);
