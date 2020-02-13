import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import QuizState from "./context/quiz/QuizState";

function App() {
  return (
    <QuizState>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QuizState>
  );
}

export default App;
