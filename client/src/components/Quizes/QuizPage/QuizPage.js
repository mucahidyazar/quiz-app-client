import React, { useState, useContext, useEffect } from "react";
import QuizesContext from "../../../context/quizes/quizesContext";

const QuizPage = props => {
  // CONTEXTs
  const quizesContext = useContext(QuizesContext);
  const { quizes } = quizesContext;

  useEffect(() => {
    if (quizes === null) {
      props.history.push("/quizes");
    } else {
      setCorrectAnswers(
        quizes[props.match.params.id - 1].quizQuestions.map(que => {
          return que.correct_answer;
        })
      );
    }

    setInterval(() => {
      setCountdown(prevSetCountDown => prevSetCountDown - 1);
    }, 1000);

    return () => {
      clearInterval();
    };

    // eslint-disable-next-line
  }, []);

  // USESTATEs
  const [question, setQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [countdown, setCountdown] = useState(60);
  const [disabledTwoOff, setDisabledTwoOff] = useState(false);
  const [disabledTime, setDisabledTime] = useState(false);
  const [chosenAnswer, setChosenAnswer] = useState([]);

  // SOME SETTINGs
  let quiz = null;
  let answersArray = null;
  if (
    quizes === null &&
    answersArray === null &&
    quiz[question].incorrect_answers === null
  ) {
    props.history.push("/quizes");
  } else {
    quiz = quizes[props.match.params.id - 1].quizQuestions;

    answersArray = [
      ...quiz[question].incorrect_answers,
      quiz[question].correct_answer
    ];
  }

  // CORRECTS AND INCORRECTS
  const corIncor = (quiz, answers) => {
    if (answers === quiz.correct_answer) {
      return "correct";
    } else {
      return "incorrect";
    }
  };

  // SETTING ANSWER
  const setAnswer = (value, index) => {
    if (answers[index]) {
      setAnswers(answers.filter((answer, i) => i !== index).concat(value));
    } else {
      setAnswers([...answers, value]);
    }
  };

  // SETTING CHOSEN
  const setChosen = (index, answer) => {
    if (answers[index] === answer) {
      return "chosen";
    } else {
      return "";
    }
  };

  // PUSH RESULT PAGE
  if (countdown < 1) {
    props.history.push({
      pathname: `/result/${props.match.params.id}`,
      state: {
        answers,
        correctAnswers
      }
    });
  }

  // JOKERS
  const twoOut = () => {
    quiz = quizes[props.match.params.id - 1].quizQuestions;
    answersArray = [
      quiz[question].incorrect_answers[
        Math.floor(Math.random() * quiz[question].incorrect_answers.length)
      ],
      quiz[question].correct_answer
    ];
    setChosenAnswer(answersArray);
  };

  const onClickTwoOut = () => {
    twoOut();
    setDisabledTwoOff(true);
  };

  const onClickPlus15Seconds = () => {
    setCountdown(countdown + 15);
    setDisabledTime(true);
  };

  // NEXT QUESTION
  const onClickNext = () => {
    if (!answers[question]) {
      setAnswers([...answers, "PASS"]);
    }
    if (question > quiz.length - 2) {
      props.history.push({
        pathname: `/result/${props.match.params.id}`,
        state: {
          answers,
          correctAnswers,
          id: quizes[props.match.params.id - 1]._id
        }
      });
    } else {
      setQuestion(question + 1);
      setCountdown(countdown + 15);
      setChosenAnswer([]);
    }
  };

  // ANSWER SECTION
  const answerSection = () => {
    if (chosenAnswer.length > 1) {
      return chosenAnswer.map((answerArray, index) => (
        <div
          className={`section__answers ${corIncor(
            quiz[question],
            answerArray
          )} ${setChosen(question, answerArray)}`}
          key={index}
          onClick={e => setAnswer(e.target.innerHTML, question)}
        >
          {answerArray}
        </div>
      ));
    } else {
      return answersArray.map((answerArray, index) => (
        <div
          className={`section__answers ${corIncor(
            quiz[question],
            answerArray
          )} ${setChosen(question, answerArray)}`}
          key={index}
          onClick={e => setAnswer(e.target.innerHTML, question)}
        >
          {answerArray}
        </div>
      ));
    }
  };

  return quizes ? (
    <div className="section__quizpage">
      <div className="section__information">
        <div className="section__information-countdown">{countdown}</div>
      </div>
      <div className="section__question">{quiz[question].question}</div>
      <div className="section__answers">{answerSection()}</div>
      <div className="section__buttons">
        <div className="jokers">
          <button
            className={`jokers__half ${disabledTwoOff ? "disabled" : ""}`}
            disabled={disabledTwoOff}
            onClick={onClickTwoOut}
          >
            <i className="fas fa-hands-helping"></i> 2 OUT
          </button>
          <button
            className={`jokers__time ${disabledTime ? "disabled" : ""}`}
            disabled={disabledTime}
            onClick={onClickPlus15Seconds}
          >
            <i className="far fa-clock"></i> +15
          </button>
        </div>
        <div className="options">
          <div className="section__buttons-finish">
            <i className="fas fa-times-circle"></i> FINISH
          </div>
          <div className="section__buttons-next" onClick={onClickNext}>
            <i className="fas fa-arrow-circle-right"></i> NEXT
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default QuizPage;
