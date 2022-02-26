import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema( {
    // game: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'game'
    // },
    platform: {
        type: Schema.Types.ObjectId,
        ref: 'Platform'
    },
    author: { type: String },
    body: { type: String },
    score : { type: Number},
    createAT: { type: Date, default:Date.now },
    updateAT: { type: Date,  default:Date.now }

});

export default model('Review', ReviewSchema)
