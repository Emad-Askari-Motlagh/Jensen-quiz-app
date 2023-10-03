import React, { useEffect, useState } from "react";
import "./Questions.scss";
import useQuiz from "../../hooks/useQuiz";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/QuizCard";
import Search from "../../components/Search";
import Info from "../../components/Info";
import Loading from "../../components/Loading";
import Modal from "../../components/Modal";

export default function AllQuizes() {
  const { quizes, deleteQuizById, getAllQuizes, getUserQuiz, loading } =
    useQuiz();
  const navigate = useNavigate();
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    getAllQuizes();
  }, []);
  //Delete a specific quiz
  async function deleteQuiz(id: string) {
    try {
      const res: any = await deleteQuizById(id);
      if (res.status === 200) {
        setTimeout(async () => {
          navigate("/quiz/all");
          setDeleteError("");
        }, 1000);
      }
    } catch (error: any) {
      setDeleteError(error.message);
      setTimeout(() => {
        setDeleteError("");
      }, 2000);
    }
  }

  //On click on quiz card
  function onClick(id: string) {
    navigate(`/quiz/questions/${id}?quizNumber=1`);
  }
  //Search pecific quiz
  function onSearch(word: string) {
    getUserQuiz(word);
  }

  return (
    <div className="quizess-wrapper" style={{ position: "relative" }}>
      <h1>Quiz Lists</h1>
      <div>
        <Search placeholder="Search your quiz" onSearch={onSearch} />
      </div>
      {deleteError && (
        <Info type="error">OBS! You are not the quiz owner </Info>
      )}
      <div className="quizess-container">
        {quizes.length > 0 &&
          quizes.map((res, i) => {
            if (res.questions?.length > 0) {
              return (
                <QuizCard
                  onDelete={() => deleteQuiz(res.quizId)}
                  id={res.quizId}
                  username={res.username}
                  quizId={res.quizId}
                  onClick={() => onClick(res?.userId)}
                  quantity={res.questions?.length}
                  key={i}
                />
              );
            }
          })}
      </div>
      {loading && <Loading />}
      {!loading && quizes?.length < 1 && (
        <Info type="error">OBS! No quiz founded</Info>
      )}
    </div>
  );
}
