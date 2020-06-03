import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";

//Components
import QuizCard from "./QuizCard/QuizCard";
import Spinner from "../Spinner/Spinner";
import InputSelect from "../Layout/InputSelect/InputSelect";

//REDUX ACTIONS
import {
  searchQuizes,
  setQuizDifficulty,
  sortQuizes,
} from "../../redux/actions";

const Quizes = ({ dispatch, quizes, filteredQuizes }) => {
  const [activeNav, setActiveNav] = useState("all");
  const [sortVisibility, setSortVisibility] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");

  useEffect(() => {
    activeQuizNav("all");
  }, [quizes]);

  const activeQuizNav = (difficulty = "all") => {
    dispatch(setQuizDifficulty(difficulty));
    setActiveNav(difficulty);
  };

  const onSearchQuizes = (e) => {
    dispatch(searchQuizes(e.target.value.toLowerCase()));
  };

  const onSortYourQuizesBy = (type) => {
    dispatch(sortQuizes(type));
    setSelectedSort(type);
  };

  function activeNavFunction(value) {
    return activeNav === value ? "active-quiz-nav" : "";
  }

  if (!quizes.length) return <Spinner />;
  return (
    <div className="quizes">
      <div className="quizes__nav">
        <div className="quizes__nav--top">
          <div
            className={`all-quizes ${activeNavFunction("all")}`}
            onClick={() => activeQuizNav("all")}
          >
            All
          </div>
          <div
            className={`easy-quizes ${activeNavFunction("easy")}`}
            onClick={() => activeQuizNav("easy")}
          >
            Easy
          </div>
          <div
            className={`medium-quizes ${activeNavFunction("medium")}`}
            onClick={() => activeQuizNav("medium")}
          >
            Medium
          </div>
          <div
            className={`hard-quizes ${activeNavFunction("hard")}`}
            onClick={() => activeQuizNav("hard")}
          >
            Hard
          </div>
        </div>
        <div className="quizes__nav--bottom">
          <input
            type="text"
            placeholder="Search"
            className="search"
            onChange={onSearchQuizes}
          />
          <div
            className="sort"
            onClick={() => setSortVisibility(!sortVisibility)}
          >
            <span className="sort__span">Sort by</span>
            <InputSelect
              selectedSort={selectedSort}
              sortVisibility={sortVisibility}
            >
              <div
                className="sort__options--item"
                onClick={() => onSortYourQuizesBy("date")}
              >
                Date
              </div>

              <div
                className="sort__options--item"
                onClick={() => onSortYourQuizesBy("title")}
              >
                Title
              </div>

              <div
                className="sort__options--item"
                onClick={() => onSortYourQuizesBy("question")}
              >
                Question
              </div>
            </InputSelect>
          </div>
        </div>
      </div>
      <section className="quizes__board">
        {(filteredQuizes ? filteredQuizes : quizes).map((quiz, index) => (
          <QuizCard
            key={index + 1}
            index={index + 1}
            quiz={quiz.quizQuestions}
            info={{
              id: quiz._id,
              quizAuthor: quiz.quizAuthor,
              imageInformation: quiz.imageInformation,
              title: quiz.quizTitle,
              description: quiz.quizDescription,
              category: quiz.quizCategory,
              type: quiz.quizType,
              difficulty: quiz.quizDifficulty,
              date: moment(quizes[0].quizDate).startOf("day").fromNow(),
            }}
          />
        ))}
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  quizes: state.quiz.quizes,
  filteredQuizes: state.quiz.filteredQuizes,
});

export default connect(mapStateToProps)(Quizes);

//Category"Books Type:Multiple Difficult:Hard
