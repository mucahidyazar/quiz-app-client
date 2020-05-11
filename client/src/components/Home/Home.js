import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import imgQuizTime from "../../public/img/quiz-time.jpg";
import QuizesContext from "../../context/quizes/quizesContext";
import { Link } from "react-router-dom";
import Spinner from "../Spinner/Spinner";

const Home = () => {
  const quizesContext = useContext(QuizesContext);
  const { quizes, getQuizes } = quizesContext;

  const [randomQuiz, setRandomQuiz] = useState(null);
  const [randomQuizNumber, setRandomQuizNumber] = useState(null);

  useEffect(() => {
    getQuizes();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (quizes !== null) {
      setRandomQuiz(quizes[Math.floor(Math.random() * quizes.length)]);
    }
    // eslint-disable-next-line
    console.log(quizes);
  }, [quizes]);
  useEffect(() => {
    if (randomQuiz !== null) {
      quizes.filter((quiz, index) =>
        quiz._id === randomQuiz._id ? setRandomQuizNumber(index) : null
      );
    }
    // eslint-disable-next-line
  }, [randomQuiz]);

  return randomQuiz ? (
    <section className="section__main">
      <div className="section__left">
        <h2 className="section__left-header">Hey I'm Travia Quiz App</h2>
        <p className="section__left-paragraph">
          I am a full stack app. You can solve some quiz with me. And you can
          create new quizes with me soon. I was designed with React and NodeJS.
          And I am pulling some examples from www.opentdb.com.
        </p>
      </div>
      <div className={`quiz quiz--${randomQuiz.quizDifficulty}`}>
        <div className="quiz__header">
          <div className="quiz__header--date">
            {moment(randomQuiz.quizDate).startOf("day").fromNow()}
          </div>
          <div className="quiz__header--question">
            {randomQuiz.quizQuestions.length} Question
          </div>
          <div className="quiz__header--img">
            <img src={imgQuizTime} alt="Quiz Time" />
          </div>
        </div>

        {/*QUIZ BODY*/}
        <div className="quiz__body">
          <div className="body__header">
            <div className="body__header--title">{randomQuiz.quizTitle}</div>
            <div className="body__header--description">
              {randomQuiz.quizDescription}
            </div>
          </div>

          <div className="body__information">
            <div className="body__information--category">
              {randomQuiz.quizCategory}
            </div>
            <div className="body__information--type">{randomQuiz.quizType}</div>
            <div className="body__information--difficulty">
              {randomQuiz.quizDifficulty}
            </div>
          </div>
        </div>

        <Link
          to={`/quizes/${randomQuizNumber}`}
          className={`quiz__button quiz__button--${randomQuiz.quizDifficulty}`}
        >
          Start
        </Link>
      </div>
    </section>
  ) : (
    <Spinner />
  );
};

export default Home;

//Dark Mode Moon => <i class="fas fa-moon"></i>
