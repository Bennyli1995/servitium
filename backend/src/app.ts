import "dotenv/config";
import express from "express";
const cors = require("cors");
import bodyParser from 'body-parser';

// import NoteModel from "./models/note";

import WorkerModel from "./models/worker";

import ReviewModel from "./models/review";

import { getWorkerRecommendation, findRecommendations } from "./util/recommendations";
// import TradesPerson from "./models/tradespeople"; // Corrected import

const app = express();
app.use(cors());
app.use(express.json());

// app.use(bodyParser.json()); // Add this line to enable JSON body parsing
// app.use(bodyParser.urlencoded({ extended: true })); // Add this line to enable URL-encoded body parsing

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

    let workerRecommendation = await getWorkerRecommendation(gpt_prompt);

    // workerRecommendation = findRecommendations(workerRecommendation.message.content);

    res.json({ recommendation: workerRecommendation });
    console.log(workerRecommendation.message.content);
  } catch (error: any) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST endpoint to add a review
app.post("/add_review", async (req, res) => {
  try {
    const { userID, tradespersonID, rating, comment, date } = req.body;

    // console.log(userID);

    // Create a new review instance
    const newReview = new ReviewModel({
      review_id: Math.floor(Math.random() * 1000) + 1,
      userID,
      tradespersonID,
      rating,
      comment,
      date,
    });

    // // Save the review to MongoDB
    await newReview.save();

    // // Update the worker's reviews array
    // worker.reviews?.push(newReview);

    // // Save the updated worker to MongoDB
    // await worker.save();

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});



export default app;
