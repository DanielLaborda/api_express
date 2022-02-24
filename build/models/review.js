"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    platform: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Platform'
        }],
    author: { type: String },
    body: { type: String },
    score: { type: Number },
    createAt: { type: Date, default: Date.now },
    updateAT: { type: Date, default: Date.now }
});
exports.default = (0, mongoose_1.model)('Review', ReviewSchema);
// id <UID>,
// game <Game>,
// platform <Platform>,
// author <String>,
// body <String>, // Texto de la reseña
// score <Number>, // 0 a 5
// createdAt <Datetime>,
// updatedAt <Datetime>,
// }
