import { Schema, model } from 'mongoose';

const ReviewSchema = new Schema( {
    platform: [{
        type: Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    author: { type: String },
    body: { type: String },
    score : { type: Number},
    createAt: { type: Date, default:Date.now },
    updateAT: { type: Date,  default:Date.now }

});

export default model('Review', ReviewSchema)

// id <UID>,
// game <Game>,
// platform <Platform>,
// author <String>,
// body <String>, // Texto de la reseña
// score <Number>, // 0 a 5
// createdAt <Datetime>,
// updatedAt <Datetime>,
// }