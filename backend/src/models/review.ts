import { InferSchemaType, model, Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    review_id: { type: Number, required: true },
    userID: { type: String, required: true },
    tradespersonID: { type: Number, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

type Review = InferSchemaType<typeof reviewSchema>;

// reviewSchema.set('validateBeforeSave', false);

export default model<Review>("reviews", reviewSchema);
