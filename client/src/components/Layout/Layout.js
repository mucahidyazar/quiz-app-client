import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Quizes from "../Quizes/Quizes";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import TraviasQuizPage from "../Quizes/TraviasQuizPage/TraviasQuizPage";
import YourQuizPage from "../Quizes/YourQuizPage/YourQuizPage";
import ResultPage from "../Quizes/ResultPage/ResultPage";
import Registration from "../Registration/Registration";

const Layout = props => {
  return (
    <div className="container">
      <Header />
      <Route path="/" exact component={Home} />
      <Switch>
        <Route path="/quizes" exact component={Quizes} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/quizes/all/:id" component={TraviasQuizPage} />
        <Route path="/quizes/travias-quizes/:id" component={TraviasQuizPage} />
        <Route path="/quizes/your-quizes/:id" component={YourQuizPage} />
        <Route path="/result/:id" component={ResultPage} />
        <Route path="/registration" component={Registration} />
      </Switch>
    </div>
  );
};

export default Layout;

//Dark Mode Moon => <i class="fas fa-moon"></i>
