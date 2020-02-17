import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import QuizesState from "./context/quizes/QuizesState";
import CreateQuizState from "./context/createQuiz/CreateQuizState";

function App() {
  return (
    <QuizesState>
      <CreateQuizState>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </CreateQuizState>
    </QuizesState>
  );
}

export default App;
