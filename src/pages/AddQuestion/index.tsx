import React, { useEffect, useState } from "react";
import Input from "../../components/Input";
import useQuiz from "../../hooks/useQuiz";
import Button from "../../components/Button";
import Info from "../../components/Info";
import useLocation from "../../hooks/useLocation";
import {
  useNavigate,
  useSearchParams,
  useLocation as useRouterLocation,
} from "react-router-dom";
import { UserType } from "../../types";

interface Location {
  latitude: number;
  longitude: number;
}

interface QuestionFormData {
  question: string;
  answer: string;
  name: string | undefined;
  userId?: string | undefined | null;
  location: Location;
}
// Reset the input fields after submission
const resetFormData: QuestionFormData = {
  question: "",
  answer: "",
  name: "",
  location: { latitude: 0, longitude: 0 }, // setting default value
};
export default function AddQuestion({ user }: { user: UserType | null }) {
  const { addQuestionToQuiz, addQuestionError } = useQuiz();
  const [successed, setSuccessed] = useState(false);
  const { location, permissionError, fetchLocation } = useLocation();
  const [formError, setFormError] = useState<string | null>(null);
  const [quizName, setQuizName] = useState<string>("");
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<QuestionFormData>({
    question: "",
    answer: "",
    name: "",
    location: { latitude: 0, longitude: 0 }, // setting default value
  });
  const navigate = useNavigate();
  const name = searchParams[0].get("name");
  useEffect(() => {
    fetchLocation();
  }, []);

  // Handle name from searchParams
  useEffect(() => {
    if (name) {
      setQuizName(name);
    }
  }, [name]);

  // Update formData.name whenever quizName changes
  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: quizName,
    }));
  }, [quizName]);

  useEffect(() => {
    if (location) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        location: {
          latitude: location.latitude || 0,
          longitude: location.longitude || 0,
        },
      }));
    }
  }, [location]);

  // Function to handle input changes and set state
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const onClick: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // Validation
    if (
      !formData.name ||
      !formData.question ||
      !formData.answer ||
      formData.location.latitude === 0 ||
      formData.location.longitude === 0
    ) {
      setFormError("All fields must be filled out!"); // Set error message
      return; // Do not proceed
    } else {
      setFormError(null); // Clear any previous error message
    }

    try {
      const res: any = await addQuestionToQuiz({
        ...(formData as any),
      });
      if (res.success === true) {
        setSuccessed(true);
        setTimeout(() => {
          setFormData({ ...resetFormData, name: quizName ? quizName : "" });
          setSuccessed(false);
        }, 1500);
      }
    } catch (error) {
      setSuccessed(false);
    }

    setFormData(resetFormData);
  };

  return (
    <div>
      <h1>Add Question</h1>
      {permissionError ? (
        <Info type="error">{permissionError}</Info>
      ) : (
        <form onSubmit={onClick} style={{ width: "80%", margin: "auto" }}>
          <Input
            placeholder={quizName}
            label="Write the quiz name"
            name="name"
            value={quizName || formData.name}
            handleChange={handleInputChange}
          />
          <Input
            placeholder="Question"
            label="Write your question"
            name="question"
            value={formData.question}
            handleChange={handleInputChange}
          />
          <Input
            placeholder="Answer"
            label="Write the answer"
            name="answer"
            value={formData.answer}
            handleChange={handleInputChange}
          />

          {addQuestionError && <Info type="error">OBS! Error</Info>}
          {successed && <Info type="successed">Question Saved</Info>}
          <Button width="70%" type="submit" label="Add the question"></Button>
        </form>
      )}
    </div>
  );
}
