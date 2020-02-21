import React from "react";
import imgQuizTime from "../../../public/img/quiz-time.jpg";
import { Link } from "react-router-dom";

const Quiz = props => {
  return (
    <div
      className={`section__quiz section__quiz-${
        props.info ? props.info.difficulty : props.infoY.difficulty
      }`}
    >
      {props.infoY ? (
        <div className="section__quiz--date">{props.infoY.date}</div>
      ) : null}
      <div className="section__quiz-img">
        <img src={imgQuizTime} alt="Quiz Time" />
      </div>
      <div className="section__quiz-header">
        {props.infoY ? props.infoY.title : "Travias Quize"}
      </div>
      <div className="section__quiz-description">
        {props.infoY ? props.infoY.description : "Enjoy by solving"}
      </div>
      <div className="section__quiz--information">
        <div>{props.info ? props.info.category : props.infoY.category}</div>
        <div>{props.info ? props.info.type : props.infoY.type}</div>
        <div>{props.info ? props.info.difficulty : props.infoY.difficulty}</div>
      </div>
      <Link
        to={`/quizes/${props.isComingFrom()}/${props.index}`}
        className="section__quiz-button"
      >
        Start
      </Link>
    </div>
  );
};

export default Quiz;
