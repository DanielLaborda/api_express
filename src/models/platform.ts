import { Schema, model } from 'mongoose';

const PlatformSchema = new Schema( {
    icon: { type: String, lowercase:true },
    title: { type: String },
    createAT: { type: Date, default:Date.now },
    updateAT: { type: Date,  default:Date.now }

});

export default model('Platform', PlatformSchema)
