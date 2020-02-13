import React from "react";
import imgQuizTime from "../../../public/img/quiz-time.jpg";
import { Link } from "react-router-dom";

const Quiz = props => {
  return (
    <div className={`section__quiz section__quiz-${props.info.difficulty}`}>
      <div className="section__quiz-img">
        <img src={imgQuizTime} alt="Quiz Time" />
      </div>
      <div className="section__quiz-header">{props.info.category}</div>
      <div className="section__quiz-description">{props.info.difficulty}</div>
      <Link to={`/quiz/${props.index}`} className="section__quiz-button">
        Start
      </Link>
    </div>
  );
};

export default Quiz;
