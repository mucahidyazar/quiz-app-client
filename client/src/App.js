import React from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import QuizesState from "./context/quizes/QuizesState";
import CreateQuizState from "./context/createQuiz/CreateQuizState";
import RegistrationState from "./context/registration/RegistrationState";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  return (
    <QuizesState>
      <CreateQuizState>
        <RegistrationState>
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </RegistrationState>
      </CreateQuizState>
    </QuizesState>
  );
}

export default App;
