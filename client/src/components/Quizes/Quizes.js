import React, { useContext, useEffect, useState } from "react";
import Quiz from "./Quiz/Quiz";
import QuizesContext from "../../context/quizes/quizesContext";
import Spinner from "../Spinner/Spinner";

const Quizes = () => {
  const quizesContext = useContext(QuizesContext);
  const {
    traviasQuizes,
    yourQuizes,
    quizesLoading,
    getTraviasQuizes,
    getYourQuizes,
    activeAllQuizes,
    activeYourQuizes,
    activeTraviasQuizes
  } = quizesContext;

  const activeQuizNav = () => {
    if (yourQuizNav === "active-quiz-nav") {
      return yourQuizes.map((quiz, index) => (
        <Quiz
          key={index + 1}
          index={index}
          quiz={quiz.quizQuestions}
          isComingFrom={isComingFrom}
          info={{
            title: quiz.quizTitle,
            description: quiz.quizDescription,
            category: quiz.quizCategory,
            type: quiz.quizType,
            difficulty: quiz.quizDifficulty
          }}
        />
      ));
    } else if (traviasQuizNav === "active-quiz-nav") {
      return traviasQuizes.map((quiz, index) => (
        <Quiz
          key={index + 1}
          isComingFrom={isComingFrom}
          index={index}
          quiz={quiz}
          info={quiz[0]}
        />
      ));
    } else if (allQuizNav === "active-quiz-nav") {
      return traviasQuizes.map((quiz, index) => (
        <Quiz
          key={index + 1}
          isComingFrom={isComingFrom}
          index={index}
          quiz={quiz}
          info={quiz[0]}
        />
      ));
    } else {
      return <Spinner />;
    }
  };

  const [allQuizNav, setAllQuizNav] = useState("");
  const [yourQuizNav, setYourQuizNav] = useState("");
  const [traviasQuizNav, setTraviasQuizNav] = useState("");

  const onActiveAllQuizes = () => {
    setAllQuizNav("active-quiz-nav");
    setYourQuizNav("");
    setTraviasQuizNav("");
    //activeAllQuizes();
  };
  const onActiveYourQuizes = () => {
    setYourQuizNav("active-quiz-nav");
    setAllQuizNav("");
    setTraviasQuizNav("");
    //activeYourQuizes();
  };
  const onActiveTraviasQuizes = () => {
    setTraviasQuizNav("active-quiz-nav");
    setAllQuizNav("");
    setYourQuizNav("");
    //activeTraviasQuizes();
  };

  const isComingFrom = () => {
    if (allQuizNav !== "") {
      return "all";
    } else if (yourQuizNav !== "") {
      return "your-quizes";
    } else if (traviasQuizNav !== "") {
      return "travias-quizes";
    }
  };

  useEffect(() => {
    if (!traviasQuizes) {
      getTraviasQuizes();
    }
    getYourQuizes();
    setAllQuizNav("active-quiz-nav");
  }, []);

  return traviasQuizes === null && quizesLoading ? (
    <Spinner />
  ) : (
    <div className="quizes">
      <div className="quizes__nav">
        <div className="quizes__nav--top">
          <div
            className={`all-quizes ${allQuizNav}`}
            onClick={onActiveAllQuizes}
          >
            All
          </div>
          <div
            className={`your-quizes ${yourQuizNav}`}
            onClick={onActiveYourQuizes}
          >
            Your Quizes
          </div>
          <div
            className={`travias-quizes ${traviasQuizNav}`}
            onClick={onActiveTraviasQuizes}
          >
            Travia's Quizes
          </div>
        </div>
        <div className="quizes__nav--bottom">
          <input type="text" placeholder="Search" className="search" />
          <div className="sort">
            <span className="sort__span">Search by</span>
            <select className="sort__select">
              <option value="Date">Date</option>
            </select>
          </div>
        </div>
      </div>
      <section className="quizes__board">{activeQuizNav()}</section>
    </div>
  );
};

export default Quizes;

//Category"Books Type:Multiple Difficult:Hard
