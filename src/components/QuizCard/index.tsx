import React, { useEffect } from "react";
import "./Questions.scss";
import { FaQuestionCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import Button from "../Button";
import { BiUserCircle } from "react-icons/bi";

interface QuizCardProps {
  id: string;
  onClick: () => void;
  username?: string;
  quizId: string;
  quantity: number;
  onDelete?: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  id,
  onClick,
  username,
  quizId,
  quantity,
  onDelete,
}) => {
  return (
    <li key={id} className="quiz-wrapper">
      <div className="quiz-icon">
        <FaQuestionCircle size={33} color="wheat" />
      </div>
      <div className="delete-icon" style={{ color: "white" }}>
        <MdDeleteOutline
          onClick={onDelete}
          color="tomato"
          size={33}></MdDeleteOutline>
      </div>

      <div className="question">
        <div className="col1">
          <span className="logo">
            <BiUserCircle color="lightblue" style={{ marginRight: "5px" }} />
          </span>
          <span>{username}</span>
        </div>
        <div className="col1">
          <span>Quiz ID:</span>
          <span>{quizId}</span>
        </div>
      </div>
      <div className="col2">
        <div>Number of Questions in this quiz:</div>
        <div className="col2__quantity">{quantity}</div>
      </div>
      <Button label="Open" width="50%" onClick={onClick}></Button>
    </li>
  );
};

export default QuizCard;
