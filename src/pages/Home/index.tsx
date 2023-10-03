import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { UserType } from "../../types";
import Modal from "../../components/Modal";

export default function Home({ user }: { user: UserType | null }) {
  return (
    <div className="home-container" style={{ position: "relative" }}>
      <div className="content-parent">
        <h1>Geo Quiz</h1>
        <h2>Test your knowledge on GEO</h2>
        <div className="buttons-wrapper">
          <Link className="begin-button" to="quiz/all">
            See All Users Quizes
          </Link>
          <br />
          <Link to="/quiz/new" className="begin-button">
            Make a new Quiz
          </Link>

          {user && (
            <Link to="/quiz/add" className="begin-button">
              Add Question
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
