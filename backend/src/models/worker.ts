import { InferSchemaType, model, Schema } from "mongoose";
import ReviewModel from "./review";

const workerSchema = new Schema({
    worker_id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    trade: { type: String, required: true },
    rate: { type: Number, required: true },
    description: { type: String, required: true },
    skills: { type: [String], required: true },
    years_exp: { type: Number, required: true },
    headshot: { type: String, required: true },
    licenses: { type: [String], required: true },
    reviews: { type: [], required: false }, // Assuming reviews are strings, you can adjust this as needed
    schedule: { type: [String], required: false }, // Assuming schedule information is strings, you can adjust this as needed
    email: { type: String, required: true },
}, { timestamps: true });

type Worker = InferSchemaType<typeof workerSchema>;

export default model<Worker>("workers", workerSchema);





