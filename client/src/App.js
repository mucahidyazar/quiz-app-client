import React, { useEffect, useContext } from "react";
import Layout from "./components/Layout/Layout";
import { BrowserRouter } from "react-router-dom";
import QuizesState from "./context/quizes/QuizesState";
import CreateQuizState from "./context/createQuiz/CreateQuizState";
import RegistrationState from "./context/registration/RegistrationState";
import axios from "axios";

if (localStorage.token) {
  axios.defaults.headers.common["x-auth-token"] = localStorage.token;
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
