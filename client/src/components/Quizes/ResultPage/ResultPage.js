import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

export default function ResultPage(props) {
  const createQuizContext = useContext(CreateQuizContext);
  const { saveScores, saveScoreToQuiz } = createQuizContext;

  const [trueVal, setTrueVal] = useState(0);
  const [passVal, setPassVal] = useState(0);
  const [falseVal, setFalseVal] = useState(0);

  useEffect(() => {
    calcTrue();
    calcFalse();
    calcPass();
    // eslint-disable-next-line
  }, []);

  const onSaveScores = () => {
    saveScores(trueVal, passVal, falseVal);
  };

  const calcTrue = () => {
    props.location.state.answers.filter((answer, index) =>
      answer === props.location.state.correctAnswers[index]
        ? setTrueVal(prevTrueVal => prevTrueVal + 1)
        : trueVal
    );
  };

  const calcPass = () => {
    if (
      props.location.state.answers.length <
      props.location.state.correctAnswers.length
    ) {
      setPassVal(
        props.location.state.correctAnswers.length -
          props.location.state.answers.length
      );
    } else {
      props.location.state.answers.filter((answer, index) =>
        answer === "PASS" ? setPassVal(prevPassVal => prevPassVal + 1) : passVal
      );
    }
  };

  const calcFalse = () => {
    props.location.state.answers.filter((answer, index) =>
      answer !== props.location.state.correctAnswers[index] && answer !== "PASS"
        ? setFalseVal(prevFalseVal => prevFalseVal + 1)
        : falseVal
    );
  };

  const calcWidth = value => {
    return (props.location.state.answers.length / value) * 100 + "%";
  };

  const onSaveScoreToQuiz = () => {
    saveScoreToQuiz(props.location.state.id, trueVal, passVal, falseVal);
  };

  return (
    <div className="resultpage">
      <div className="resultpage-tfp">
        <div className="tfp__true" style={{ width: calcWidth(trueVal) }}>
          <div className="tfp__true--point">{trueVal}</div>
          <div className="tfp__true--type">TRUE</div>
        </div>
        <div className="tfp__pass" style={{ width: calcWidth(passVal) }}>
          <div className="tfp__pass--point">{passVal}</div>
          <div className="tfp__pass--type">PASS</div>
        </div>
        <div className="tfp__false" style={{ width: calcWidth(falseVal) }}>
          <div className="tfp__false--point">{falseVal}</div>
          <div className="tfp__false--type">FALSE</div>
        </div>
      </div>
      <div className="resultpage-total">
        <div className="tfp__point">
          {(trueVal * 100) / props.location.state.answers.length}
        </div>
      </div>
      <div className="resultpage__options">
        <Link to="/leaderboard" onClick={onSaveScoreToQuiz}>
          <i className="fas fa-thumbtack"></i>
          <span>Save Your Score</span>
        </Link>
        <Link to="/" onClick={onSaveScores}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
      </div>
    </div>
  );
}
