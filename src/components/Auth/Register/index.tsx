import React, { useState, ChangeEvent, FormEvent } from "react";
import "./Register.scss";
import Input from "../../Input";
import Button from "../../Button";
import useAuth from "../../../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";
import Info from "../../Info";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { register, registerError } = useAuth();

  const navigate = useNavigate();

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRepeatPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRepeatPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Basic email format validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailPattern.test(email);

    if (email === "") {
      setIsFormValid(false);
      setError("Email is not a valid email");
    } else if (password === "" || repeatPassword === "") {
      setIsFormValid(false);
      setError("Fill the password please");
    } else {
      setIsFormValid(true);
      setError("");
      try {
        await register({ username: email, password });
        setIsSucceeded(true);
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      } catch (error) {
        setIsFormValid(false);
        setIsSucceeded(false);
        setError("Error on registration");
      }
    }
  };

  return (
    <div className="register-container">
      <h1>Register</h1>
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
        <Input
          type="password"
          placeholder="Repeat your Password"
          label="Password Repeat"
          value={repeatPassword}
          handleChange={handleRepeatPasswordChange}
        />
        {(!isFormValid && error) ||
          (registerError && <Info type="error">{error || registerError}</Info>)}
        {isSucceeded && <Info type="successed">Succeeded</Info>}
        <Button type="submit" width="100%" label="Register now" />
        <Link style={{ marginTop: "1rem", color: "tomato" }} to="/auth/login">
          Do you already have an account?
        </Link>
      </form>
    </div>
  );
}
