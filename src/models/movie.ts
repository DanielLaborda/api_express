import { Schema, model } from 'mongoose';

const MovieSchema = new Schema( {
    slug: {type: String},
    image: { type: String, lowercase:true },
    title: { type: String },
    director: { type: String },
    platform: [{
        type: Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    score: {type: Number},
    createAt: { type: Date, default:Date.now },
    updateAT: { type: Date,  default:Date.now },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

});

export default model('Movie', MovieSchema)
