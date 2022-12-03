import mongoose from "mongoose";

mongoose.set('toJSON', {
    virtuals: true,
    transform: (doc, converted) => {
        delete converted._id;
    }
});
const offersSchema = new mongoose.Schema({
    investor: { type: String },
    amount: { type: Number },
    equity: { type: Number },
    comment: { type: String },
}, { versionKey: false })

const pitchesSchema = new mongoose.Schema({
    entrepreneur: { type: String},
    pitchTitle: { type: String},
    pitchIdea: { type: String },
    askAmount: { type: Number },
    equity: { type: Number },
    offers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'offers' }]
}, { timestamps: true, versionKey: false })

export const Pitches = new mongoose.model("pitches", pitchesSchema)
export const Offers = new mongoose.model('offers', offersSchema)