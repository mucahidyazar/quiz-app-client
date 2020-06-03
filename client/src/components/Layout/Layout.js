import React, { useEffect, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Quizes from "../Quizes/Quizes";
import CreateQuiz from "../CreateQuiz/CreateQuiz";
import Leaderboard from "../Leaderboard/Leaderboard";
import Profile from "../Profile/Profile";
import Settings from "../Settings/Settings";
import QuizPage from "../Quizes/QuizPage/QuizPage";
import ResultPage from "../Quizes/ResultPage/ResultPage";
import Registration from "../Registration/Registration";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import { loadUser, getQuizes, getUsers } from "../../redux/actions";

const Layout = ({ dispatch, quizes }) => {
  useEffect(() => {
    if (localStorage.token) {
      dispatch(loadUser());
    }
    dispatch(getQuizes());
    dispatch(getUsers());
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container">
      <Header />
      <Route path="/" exact component={Home} />
      <Switch>
        <Route path="/quizes" exact component={Quizes} />
        <Route path="/leaderboard" exact component={Leaderboard} />
        <Route path="/create-quiz" component={CreateQuiz} />
        <Route path="/settings" component={Settings} />
        <Route path="/quizes/:id" component={QuizPage} />
        <Route path="/result/:id" component={ResultPage} />
        <Route path="/registration" component={Registration} />
        <Route path="/:id" component={Profile} />
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quizes: state.quiz.quizes,
  users: state.user.users,
});

export default connect(mapStateToProps)(Layout);

//Dark Mode Moon => <i class="fas fa-moon"></i>
