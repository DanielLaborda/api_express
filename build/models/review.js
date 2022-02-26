"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    // game: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'game'
    // },
    platform: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Platform'
    },
    author: { type: String },
    body: { type: String },
    score: { type: Number },
    createAT: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Review', ReviewSchema);
