import React, { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Questions from "./pages/questions";
import PrimaryLayout from "./components/Layout";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import useAuth from "./hooks/useAuth";
import AllQuizes from "./pages/AllQuizes";
import AddQuestion from "./pages/AddQuestion";
import AddQuiz from "./pages/AddQuiz";
import { UserType } from "./types";

function App() {
  const { user } = useAuth();
  const location = useLocation();
  return (
    <div className="App">
      <Routes>
        <Route element={<PrimaryLayout user={user} />}>
          <Route index path="/" element={<Home user={user} />} />
          <Route path="/quiz/questions/:index" element={<Questions />} />

          <Route path="/quiz/all" element={<AllQuizes />} />
          <Route path="/auth/register" element={<Register />} />
          <Route
            path="/quiz/add"
            element={
              user ? (
                <AddQuestion user={user as UserType} />
              ) : (
                <Navigate to="/auth/login" state={{ from: location }} replace />
              )
            }
          />

          <Route
            path={"/quiz/new"}
            element={
              user ? (
                <AddQuiz user={user as any} />
              ) : (
                <Navigate to="/auth/login" state={{ from: location }} replace />
              )
            }
          />

          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
