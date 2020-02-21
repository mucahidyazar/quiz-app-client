import React, { useContext, useEffect, useState } from "react";
import Quiz from "./Quiz/Quiz";
import QuizesContext from "../../context/quizes/quizesContext";
import Spinner from "../Spinner/Spinner";

const Quizes = props => {
  const quizesContext = useContext(QuizesContext);
  const {
    setValidQuizes,
    allQuizes,
    yourQuizes,
    traviasQuizes,
    quizesLoading,
    getTraviasQuizes,
    getYourQuizes,
    activeAllQuizes,
    activeYourQuizes,
    activeTraviasQuizes,
    searchQuizes
  } = quizesContext;

  const activeQuizNav = () => {
    if (yourQuizNav === "active-quiz-nav") {
      return yourQuizes.map((quiz, index) => (
        <Quiz
          key={index + 1}
          index={index + 1}
          quiz={quiz.quizQuestions}
          isComingFrom={isComingFrom}
          infoY={{
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
          index={index + 1}
          quiz={quiz}
          info={quiz[0]}
        />
      ));
    } else if (allQuizNav === "active-quiz-nav") {
      return allQuizes.map((quiz, index) => (
        <Quiz
          key={index + 1}
          isComingFrom={() => (quiz[0] ? "travias-quizes" : "your-quizes")}
          index={index}
          quiz={quiz}
          info={quiz[0]}
          infoY={{
            title: quiz.quizTitle ? quiz.quizTitle : "Travias Quize",
            description: quiz.quizDescription
              ? quiz.quizDescription
              : "Enjoy by solving",
            category: quiz.quizCategory,
            type: quiz.quizType,
            difficulty: quiz.quizDifficulty
          }}
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
    if (yourQuizNav !== "") {
      return "your-quizes";
    } else if (traviasQuizNav !== "") {
      return "travias-quizes";
    }
  };

  const onSearchQuizes = e => {
    searchQuizes(e.target.value);
  };

  useEffect(() => {
    if (!traviasQuizes) {
      getTraviasQuizes();
    }
    getYourQuizes();
    setYourQuizNav("active-quiz-nav");
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
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={onSearchQuizes}
          />
          <div className="sort">
            <span className="sort__span">Sort by</span>
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
