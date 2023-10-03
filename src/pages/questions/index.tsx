import React, { useEffect, useState } from "react";
import "./Questions.scss";

import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Map from "../../components/Map";
import Info from "../../components/Info";
import useQuiz from "../../hooks/useQuiz";
import Loading from "../../components/Loading";

interface Question {
  question: string;
  answer: string;
  location?: {
    longitude: number;
    latitude: number;
  };
}

export default function Questions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [question, setQuestion] = useState<Question>();
  const params = useParams<{ index: string; questionNumber: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const { fetchQuestionById } = useQuiz();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getQuiz();
  }, [searchParams, params]);

  async function getQuiz() {
    setLoading(true);
    try {
      const res: any = await fetchQuestionById(params.index as string);
      setLoading(false);
      if (res.questions) {
        setQuestions([...res.questions]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  }

  useEffect(() => {
    setQuestion(
      questions.find(
        (q, i) => i + 1 === parseInt(searchParams.get("quizNumber") as any)
      )
    );
  }, [searchParams, questions]);

  if (!question && loading)
    return (
      <div className="warning">
        <Loading></Loading>
      </div>
    );
  if (!question && !loading)
    return (
      <div className="warning">
        <Info type="error">Quiz Is Done</Info>
        <Link style={{ color: "white" }} to="/quiz/all">
          Go back
        </Link>
      </div>
    );

  return (
    <div className="map-list" style={{ color: "wheat", listStyle: "none" }}>
      <div className="question">
        <span>Question number: </span>
        <span>{searchParams.get("quizNumber")}</span>
      </div>
      <div className="question">
        <span>Question:</span>
        <span>{question?.question}</span>
      </div>
      {question?.location?.longitude && question?.location?.latitude && (
        <Map
          lng={question?.location.longitude}
          lat={question?.location.latitude}
        />
      )}
      <div style={{ width: "30%", margin: "auto" }}>
        <span>Answer:</span>
        <span>{question?.answer}</span>
      </div>
      <button
        onClick={() =>
          setSearchParams(
            (e) => `quizNumber=${parseInt(e.get("quizNumber") as any) + 1}`
          )
        }>
        <span>Next Question</span> <span>{">>"}</span>
      </button>
    </div>
  );
}
