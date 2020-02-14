import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import QuizState from "./context/quiz/QuizState";
import CreateQuizState from "./context/createQuiz/CreateQuizState";

function App() {
  return (
    <QuizState>
      <CreateQuizState>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CreateQuizState>
    </QuizState>
  );
}

export default App;
