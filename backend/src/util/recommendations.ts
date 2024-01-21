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
    let recommendations = findRecommendations(JSON.stringify(response.data.choices[0].message.content));
    if (recommendations) {
      return recommendations
    } else {
      return null;
    }

  } catch (error: any) {
    console.error("OpenAI Error:", error.message);
    throw new Error("Failed to get worker recommendation from OpenAI.");
  }
}

export type ResultObject = {
  first_recommended_id: number;
  second_recommended_id: number;
  third_recommended_id: number;
};

export function findRecommendations(response: string) {
  try {
    // Extract the numbers from the string using a regular expression
    const matches = response.match(/\d+/g);

    if (matches && matches.length >= 3) {
      // Return the first three numbers found
      return [parseInt(matches[0], 10), parseInt(matches[1], 10), parseInt(matches[2], 10)];
    }

    return null;
  } catch (error: any) {
    console.error('Error parsing result string:', error.message);
    return null;
  }
}

