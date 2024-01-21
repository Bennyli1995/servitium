import "dotenv/config";
import express from "express";
const cors = require("cors");
import bodyParser from "body-parser";

// import NoteModel from "./models/note";

import WorkerModel from "./models/worker";

import ReviewModel from "./models/review";
import axios from "axios";

import {
  getWorkerRecommendation,
  findRecommendations,
} from "./util/recommendations";
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
app.post("/recommend", async (req, res) => {
  try {
    const workers = await WorkerModel.find().exec();

    const { message } = req.body;

    const gpt_prompt =
      "Request: " +
      message +
      " Choose the top three workers from the list, returning only their worker_ids in the content of your message. " +
      "Worker List: " +
      JSON.stringify(workers) +
      "You will give the result of my query in this exact format: " +
      "Result: {first_recommended_id: 1, second_recommended_id: 2, third_recommended_id: 3}";

    let workerRecommendation;
    let attempts = 0;
    const maxAttempts = 3;
    while (workerRecommendation == null && attempts < maxAttempts) {
      try {
        workerRecommendation = await getWorkerRecommendation(gpt_prompt);
      } catch {
        // pass
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      attempts++;
    }

    console.log(workerRecommendation);
    res.json({ response: workerRecommendation });
  } catch (error: any) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST route for Google Places search
app.post("/google-places-search", async (req, res) => {
  const { query, location } = req.body;
  const apiKey = process.env.GOOGLE_PLACES_API_KEY; // Ensure you have this in your .env file
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${
    location.lat
  },${location.lng}&radius=5000&keyword=${encodeURIComponent(
    query
  )}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error in Google Places API Request:", error);
    res.status(500).send("Error in fetching data from Google Places API");
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

    res.status(201).json({ message: "Review added successfully" });
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

app.get("/service_workers/:trade", async (req, res) => {
  try {
    const tradeSpecification = req.params.trade;
    console.log(tradeSpecification);
    const workers = await WorkerModel.find({
      trade: new RegExp(tradeSpecification, "i"),
    }).exec();

    const reviews = await ReviewModel.find().exec();

    const result = [];

    for (const worker of workers) {
      const id = worker.worker_id;
      for (const review of reviews) {
        if (id === review.tradespersonID) {
          worker.reviews?.push(review);
        }
      }
      result.push(worker);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
  }
});

export default app;
