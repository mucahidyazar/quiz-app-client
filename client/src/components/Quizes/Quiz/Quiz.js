import React from "react";
import imgQuizTime from "../../../public/img/quiz-time.jpg";
import { Link } from "react-router-dom";

const Quiz = props => {
  return (
    <div
      className={`quiz quiz--${
        props.info ? props.info.difficulty : props.infoY.difficulty
      }`}
    >
      <div className="quiz__header">
        {props.infoY ? (
          <div className="quiz__header--date">{props.infoY.date}</div>
        ) : null}
        <div className="quiz__header--question">
          {props.quiz.length} Question
        </div>
        <div className="quiz__header--img">
          {props.infoY.imageInformation ? (
            <img
              src={`./img/${props.infoY.imageInformation.filename}`}
              alt=""
            ></img>
          ) : (
            <img src={imgQuizTime} alt="Quiz Time" />
          )}
        </div>
      </div>

      {/*QUIZ BODY*/}
      <div className="quiz__body">
        <div className="body__header">
          <div className="body__header--title">
            {props.infoY ? props.infoY.title : "Travias Quize"}
          </div>
          <div className="body__header--description">
            {props.infoY ? props.infoY.description : "Enjoy by solving"}
          </div>
        </div>

        <div className="body__information">
          <div className="body__information--category">
            {props.info ? props.info.category : props.infoY.category}
          </div>
          <div className="body__information--type">
            {props.info ? props.info.type : props.infoY.type}
          </div>
          <div className="body__information--difficulty">
            {props.info ? props.info.difficulty : props.infoY.difficulty}
          </div>
        </div>
      </div>

      <Link
        to={`/quizes/${props.isComingFrom()}/${props.index}`}
        className={`quiz__button quiz__button--${
          props.info ? props.info.difficulty : props.infoY.difficulty
        }`}
      >
        Start
      </Link>
    </div>
  );
};

export default Quiz;
