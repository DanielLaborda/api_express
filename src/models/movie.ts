import { Schema, model, Document, Types } from 'mongoose';
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";

type Movie = Document & {
    slug: {type: String},
    image: { type: String, lowercase:true },
    title: { type: String },
    director: { type: String },
    platform: [{
        type: Schema.Types.ObjectId,
        ref: 'Platform'
    }],
    score: {type: Number},
    createAt: { type: Date },
    updateAT: { type: Date },
    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],
};

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

MovieSchema.plugin(mongoosePagination);
const Movie: Pagination<Movie> = model<Movie, Pagination<Movie>>("Movies", MovieSchema);

// export default model('Movie', MovieSchema);
export default Movie;
