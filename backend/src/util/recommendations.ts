import axios from "axios";
import { OpenAI } from "openai";

const openai = new OpenAI();

export async function getWorkerRecommendation(userMessage: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  const headers = { Authorization: `Bearer ${apiKey}` };

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        messages: [
          {
            role: "user",
            content: userMessage,
          },
        ],
        model: "gpt-3.5-turbo",
      },
      { headers }
    );

    // Extract and return the recommended worker_id from the OpenAI response
    return response.data.choices[0];
  } catch (error: any) {
    console.error("OpenAI Error:", error.message);
    throw new Error("Failed to get worker recommendation from OpenAI.");
  }
}
