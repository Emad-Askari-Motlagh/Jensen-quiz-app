import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { QuizProvider } from "./hooks/useQuiz";
import { LocationProvider } from "./hooks/useLocation";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QuizProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </QuizProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
