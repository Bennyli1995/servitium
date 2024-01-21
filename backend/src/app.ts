import "dotenv/config";
import express from "express";
const cors = require("cors");
import NoteModel from "./models/note";

import WorkerModel from "./models/worker";

import ReviewModel from "./models/review";

import { getWorkerRecommendation } from "./util/recommendations";
// import TradesPerson from "./models/tradespeople"; // Corrected import

const app = express();
app.use(cors());
app.use(express.json());

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

// POST request for recommendation
app.post('/recommend', async (req, res) => {
  try {
    let workers = await WorkerModel.find().exec();
    
    const { message, trade } = req.body;
    workers = workers.filter(worker => worker.trade === trade);

    const gpt_prompt = "Request: " + message +
    " Choose the top three workers from the list, returning only their worker_ids in the content of your message. " +
    "Worker List: " + JSON.stringify(workers) + 
    "You will give the result of my query in the following format: " + 
    "Result: {cheapest_id: 1, second_cheapest_id: 2, third_cheapest_id: 3}";

    const workerRecommendation = await getWorkerRecommendation(gpt_prompt);

    res.json({ recommendation: workerRecommendation });
    console.log(workerRecommendation.message.content);
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getReviews() {}

export default app;
