declare module "*.module.scss";
export interface UserType {
  token: string | null;
  username?: string | null;
}
interface QuestionType {
  question: string;
  answer: string;
  location: {
    longitude: string;
    latitude: string;
  };
}
interface Quiz {
  quizId: string;
  questions: QuestionType[];
  userId: string;
  username: string;
}
interface QuizType {
  questions: [
    {
      question: string;
      answer: string;
      location: {
        longitude: string;
        latitude: string;
      };
    }
  ];
  userId: string;
  quizId: string;
}
interface QuizResponse {
  quizzes: Quiz[];
}
