import axios, { AxiosResponse } from "axios";
import { getToken } from "./getToken";

interface Quiz {
  userId: string;
  // Define the rest of the properties in the Quiz object
}

interface FetchAllQuestionsResponse {
  quizzes: Quiz[];
  // Define the rest of the properties in the response
}

export async function fetchAllQuestions(userId: string): Promise<Quiz | Error> {
  try {
    const res: AxiosResponse<FetchAllQuestionsResponse> = await axios.get(
      `https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com/quiz`,
      { headers: { "Content-Type": "application/json" } }
    );

    if (res.data) {
      const quiz: Quiz | undefined = res.data.quizzes.find(
        (q: { userId: string }) => q.userId === userId
      );
      if (quiz) {
        return quiz;
      } else {
        throw new Error("Quiz not found for the given user");
      }
    } else {
      throw new Error("Error fetching all questions");
    }
  } catch (error: any) {
    return error;
  }
}
