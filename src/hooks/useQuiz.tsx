import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { getToken } from "../utils/getToken";
import { Quiz, QuizResponse, QuizType } from "../types";
import { useNavigate } from "react-router-dom";

interface QuizHook {
  getAllQuizes: () => Promise<void>;
  quizes: Quiz[];
  loading: boolean;
  error: Error | null;
  addQuiz: ({ name }: { name: string }) => Promise<QuizType>;
  addQuestionToQuiz: React.MouseEventHandler<HTMLButtonElement>;
  getQuizByNameAndId: (userId: string, quizId: string) => Promise<void>;
  getUserQuiz: (query: string) => void;
  addQuestionError: string;
  quizName: string;
  deleteQuizById: (quizId: string) => Promise<void>;
  addQuizError: string;
  fetchQuestionById: (userId: string) => Promise<Quiz | Error>;
}
interface QuizProviderProps {
  children: React.ReactNode;
}
const quizContext = createContext<QuizHook | undefined>(undefined);

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quizes, setQuizes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [addQuestionError, setAddQuestionError] = useState("");
  const [addQuizError, setAddQuizError] = useState("");
  const [deleteQuizError, setDeleteError] = useState("");
  const [quizName, setQuizName] = useState("");

  const endPoint = "https://fk7zu3f4gj.execute-api.eu-north-1.amazonaws.com";
  const axiosInstance = axios.create({
    baseURL: endPoint,
    headers: {
      Authorization: `Bearer ${getToken(document.cookie)}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  async function getUserQuiz(query: string) {
    try {
      setLoading(true);
      const result: AxiosResponse<QuizResponse> = await axios.get(
        `${endPoint}/quiz`,
        { headers: { "Content-Type": "application/json" } }
      );

      const res = result.data.quizzes.filter((result) => {
        return result.quizId.includes(query);
      });

      setQuizes([...res]);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      setError(error);
      console.error(error);
    }
  }
  async function getQuizByNameAndId(userId: string, quizId: string) {
    try {
      const response = await axiosInstance.get(`/quiz/${userId}/${quizId}`);
    } catch (error: any) {
      setError(error);
    }
  }
  async function addQuestionToQuiz<P>(questionData: P) {
    try {
      const response = await axiosInstance.post("/quiz/question", questionData);

      setAddQuestionError("");
      setAddQuestionError("");
      return response.data;
    } catch (error) {
      setAddQuestionError("There was an error");
      return error;
    }
  }

  async function fetchQuestionById(userId: string): Promise<Quiz | Error> {
    try {
      const res: AxiosResponse<QuizResponse> = await axios.get(
        `${endPoint}/quiz`,
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
  async function deleteQuizById(quizName: string) {
    try {
      const response = await axiosInstance.delete(`/quiz/${quizName}`);

      setDeleteError("");
    } catch (error) {
      // Handle any errors

      setDeleteError("There was an error");
      throw Error("There was an error");
    }
  }
  async function addQuiz(requestData: { name: string }) {
    try {
      const res = await axiosInstance.post("/quiz", requestData);
      if (res.data?.quizId) {
        setQuizName(res.data.quizId);
      }
      return res.data;
    } catch (error) {
      setAddQuizError("An error occurred");
      console.error(error);
    }
  }
  async function getAllQuizes() {
    try {
      setLoading(true);
      const res: AxiosResponse<QuizResponse> = await axios.get(
        `${endPoint}/quiz`,
        { headers: { "Content-Type": "application/json" } }
      );

      setQuizes([...res.data.quizzes]);
      setError(null);
      setLoading(false);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const values = {
    getAllQuizes,
    quizes,
    loading,
    error,
    addQuiz,
    addQuestionToQuiz,
    getQuizByNameAndId,
    getUserQuiz,
    addQuestionError,
    quizName,
    deleteQuizById,
    deleteQuizError,
    addQuizError,
    fetchQuestionById,
  };

  return (
    <quizContext.Provider value={values}>{children} </quizContext.Provider>
  );
};

const useQuiz = (): QuizHook => {
  const context = useContext(quizContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useQuiz;
