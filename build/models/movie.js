"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_ts_1 = require("mongoose-paginate-ts");
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
MovieSchema.plugin(mongoose_paginate_ts_1.mongoosePagination);
const Movie = (0, mongoose_1.model)("Movies", MovieSchema);
// export default model('Movie', MovieSchema);
exports.default = Movie;
