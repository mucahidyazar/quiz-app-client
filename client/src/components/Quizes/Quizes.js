import React, { useContext, useEffect, useState } from "react";
import moment from "moment";

//Components
import QuizCard from "./QuizCard/QuizCard";
import QuizesContext from "../../context/quizes/quizesContext";
import Spinner from "../Spinner/Spinner";
import InputSelect from "../Layout/InputSelect/InputSelect";

const Quizes = props => {
  const quizesContext = useContext(QuizesContext);
  const {
    quizes,
    searchedQuizes,
    quizesLoading,
    getQuizes,
    searchQuizes,
    sortQuizesByDate,
    sortQuizesByTitle,
    sortQuizesByQuestion
  } = quizesContext;

  const activeQuizNav = () => {
    if (allQuizNav === "active-quiz-nav") {
      return (searchedQuizes ? searchedQuizes : quizes).map((quiz, index) => (
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
            date: moment(quiz.quizDate)
              .startOf("day")
              .fromNow()
          }}
        />
      ));
    } else if (easyQuizNav === "active-quiz-nav") {
      return (searchedQuizes ? searchedQuizes : quizes).map(
        (quiz, index) =>
          quiz.quizDifficulty === "easy" && (
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
                date: moment(quiz.quizDate)
                  .startOf("day")
                  .fromNow()
              }}
            />
          )
      );
    } else if (mediumQuizNav === "active-quiz-nav") {
      return (searchedQuizes ? searchedQuizes : quizes).map(
        (quiz, index) =>
          quiz.quizDifficulty === "medium" && (
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
                date: moment(quiz.quizDate)
                  .startOf("day")
                  .fromNow()
              }}
            />
          )
      );
    } else if (hardQuizNav === "active-quiz-nav") {
      return (searchedQuizes ? searchedQuizes : quizes).map(
        (quiz, index) =>
          quiz.quizDifficulty === "hard" && (
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
                date: moment(quiz.quizDate)
                  .startOf("day")
                  .fromNow()
              }}
            />
          )
      );
    } else {
      return <Spinner />;
    }
  };

  const [allQuizNav, setAllQuizNav] = useState("");
  const [easyQuizNav, setEasyQuizNav] = useState("");
  const [mediumQuizNav, setMediumQuizNav] = useState("");
  const [hardQuizNav, setHardQuizNav] = useState("");

  const onActiveAllQuizes = () => {
    setAllQuizNav("active-quiz-nav");
    setEasyQuizNav("");
    setMediumQuizNav("");
    setHardQuizNav("");
  };
  const onActiveEasyQuizes = () => {
    setAllQuizNav("");
    setEasyQuizNav("active-quiz-nav");
    setMediumQuizNav("");
    setHardQuizNav("");
  };
  const onActiveMediumQuizes = () => {
    setAllQuizNav("");
    setEasyQuizNav("");
    setMediumQuizNav("active-quiz-nav");
    setHardQuizNav("");
  };
  const onActiveHardQuizes = () => {
    setAllQuizNav("");
    setEasyQuizNav("");
    setMediumQuizNav("");
    setHardQuizNav("active-quiz-nav");
  };

  const [sortVisibility, setSortVisibility] = useState(false);
  const [selectedSort, setSelectedSort] = useState("");
  const onSearchQuizes = e => {
    searchQuizes(e.target.value);
  };

  const onSortYourQuizesByDate = () => {
    sortQuizesByDate();
    setSelectedSort("Date");
  };

  const onSortYourQuizesByTitle = () => {
    sortQuizesByTitle();
    setSelectedSort("Title");
  };

  const onSortYourQuizesByQuestion = () => {
    sortQuizesByQuestion();
    setSelectedSort("Question");
  };

  useEffect(() => {
    getQuizes();
    setAllQuizNav("active-quiz-nav");

    if (searchedQuizes === null && quizes === null) {
      props.history.push("/");
    }

    // eslint-disable-next-line
  }, []);

  return quizesLoading ? (
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
            className={`easy-quizes ${easyQuizNav}`}
            onClick={onActiveEasyQuizes}
          >
            Easy
          </div>
          <div
            className={`medium-quizes ${mediumQuizNav}`}
            onClick={onActiveMediumQuizes}
          >
            Medium
          </div>
          <div
            className={`hard-quizes ${hardQuizNav}`}
            onClick={onActiveHardQuizes}
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
                onClick={onSortYourQuizesByDate}
              >
                Date
              </div>

              <div
                className="sort__options--item"
                onClick={onSortYourQuizesByTitle}
              >
                Title
              </div>

              <div
                className="sort__options--item"
                onClick={onSortYourQuizesByQuestion}
              >
                Question
              </div>
            </InputSelect>
          </div>
        </div>
      </div>
      <section className="quizes__board">{activeQuizNav()}</section>
    </div>
  );
};

export default Quizes;

//Category"Books Type:Multiple Difficult:Hard
