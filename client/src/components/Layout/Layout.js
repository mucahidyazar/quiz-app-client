import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Quizes from "../Quizes/Quizes";
import CreateQuiz from "../Quizes/CreateQuiz/CreateQuiz";
import QuizPage from "../Quizes/QuizPage/QuizPage";
import ResultPage from "../Quizes/ResultPage/ResultPage";

const Layout = props => {
  return (
    <div className="container">
      <Header />
      <Route path="/" exact component={Home} />
      <Switch>
        <Route path="/quizes" component={Quizes} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/quiz/:id" component={QuizPage} />
        <Route path="/result/:id" component={ResultPage} />
      </Switch>
    </div>
  );
};

export default Layout;

//Dark Mode Moon => <i class="fas fa-moon"></i>
