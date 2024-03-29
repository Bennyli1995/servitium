import { InferSchemaType, model, Schema } from "mongoose";

// const noteSchema = new Schema({
//     title: { type: String, required: true},
//     text: {type: String, required: false},

    

// }, {timestamps: true});


const noteSchema = new Schema({
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
    reviews: { type: [String], required: false }, // Assuming reviews are strings, you can adjust this as needed
    schedule: { type: [String], required: false }, // Assuming schedule information is strings, you can adjust this as needed
}, { timestamps: true });



type Note = InferSchemaType<typeof noteSchema>;

export default model<Note>("workers", noteSchema);





