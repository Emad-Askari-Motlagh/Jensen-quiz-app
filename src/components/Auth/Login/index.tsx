import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./Login.scss";
import Input from "../../Input";
import Button from "../../Button";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Info from "../../Info";
interface LocationState {
  from: {
    pathname: string;
  };
}
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState("");
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { login, loginError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = (location.state as LocationState) || {
    from: { pathname: "/" },
  };
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic email format validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);
    if (email === "") {
      setIsFormValid(false);
      setError("Email is not a valid email");
    } else if (password === "") {
      setIsFormValid(false);
      setError("Fill the password please");
    } else {
      setIsFormValid(true);
      setError("");
      try {
        await login({ username: email, password });
        setIsSucceeded(true);
        setTimeout(() => {
          navigate(from.pathname);
        }, 1000);
      } catch (error) {
        setIsSucceeded(false);
        setIsFormValid(false);
        setError("Error on login");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter your email"
          label="Email"
          value={email}
          handleChange={handleEmailChange}
        />
        <Input
          type="password"
          placeholder="Enter your Password"
          label="Password"
          value={password}
          handleChange={handlePasswordChange}
        />

        {(!isFormValid && error) ||
          (loginError && <p style={{ color: "red" }}>{error || loginError}</p>)}
        {isSucceeded && <Info type="successed">Succeeded</Info>}
        <Button type="submit" width="100%" label="Login" />
      </form>
      <div
        style={{
          marginTop: "20%",
          color: "tomato",
          width: "fit-content",
          marginLeft: "auto",
        }}>
        <Link
          style={{
            color: "tomato",
          }}
          to="/auth/register">
          Don't you have an account? Register Now
        </Link>
      </div>
    </div>
  );
}
