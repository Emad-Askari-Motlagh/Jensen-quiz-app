import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useQuiz from "../../hooks/useQuiz"; // Correct the import path based on your project structure
import Button from "../../components/Button";
import Info from "../../components/Info";
import { useNavigate } from "react-router-dom";

interface User {
  userId?: string | undefined;
  token: string;
}

interface QuizFormData {
  name: string;
}

export default function AddQuiz({ user }: { user: User | null }) {
  const { addQuiz, quizName, addQuizError } = useQuiz();
  const [successed, setSuccessed] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState<QuizFormData>({
    name: "",
  });

  // Function to handle input changes and set state
  const handleInputChange: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onClick: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Access the values from formData and pass them to addQuestionToQuiz
    try {
      const res = await addQuiz(formData);
      // Reset the input fields after submission
      const resetFormData: QuizFormData = {
        name: "",
      };
      if (res?.quizId) {
        setSuccessed(true);
      }
      setFormData(resetFormData);
    } catch (error) {
      setSuccessed(false);
    }
  };

  return (
    <div>
      <h1>Add Quiz</h1>

      <form onSubmit={onClick} style={{ width: "80%", margin: "auto" }}>
        {/* Update the value and onChange for each input */}
        <Input
          placeholder="Quiz Name"
          label="Choose a name for the quiz"
          name="name"
          value={formData.name}
          handleChange={handleInputChange}
        />

        {addQuizError && <Info type="error">{addQuizError}</Info>}
        {successed && (
          <div>
            <Info type="successed">Quiz Created</Info>
            <Button
              width="80%"
              label="Add Question"
              onClick={() => navigate(`/quiz/add?name=${quizName}`)}></Button>
          </div>
        )}
        <Button width="70%" type="submit" label="Create the Quiz"></Button>
      </form>
    </div>
  );
}
