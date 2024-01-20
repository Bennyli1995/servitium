import { InferSchemaType, model, Schema } from "mongoose";

const reviewSchema = new Schema({
    _id: { type: String, required: true },
    review_id: { type: Number, required: true },
    userID: { type: Number, required: true },
    tradespersonID: { type: Number, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: String, required: true },
}, { timestamps: true });

type Review = InferSchemaType<typeof reviewSchema>;

export default model<Review>("reviews", reviewSchema);
