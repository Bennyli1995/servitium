import "dotenv/config";
import express from "express";
const cors = require("cors");
import NoteModel from "./models/note";

import WorkerModel from "./models/worker";

import ReviewModel from "./models/review";
// import TradesPerson from "./models/tradespeople"; // Corrected import

const app = express();
app.use(cors());

app.get("/service_workers", async (req, res) => {
  try {
    const workers = await WorkerModel.find().exec();

    const reviews = await ReviewModel.find().exec();

    const result = [];

    for (const worker of workers) {
      const id = worker.worker_id;
      for (const review of reviews) {
        if (id === review.tradespersonID) {
          // console.log(review);

          worker.reviews?.push(review);
        }
      }
      result.push(worker);
    }

    // console.log(result);

    res.status(200).json(result);

    // res.status(200).json([workers, reviews]);
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

function getReviews() {}

export default app;
