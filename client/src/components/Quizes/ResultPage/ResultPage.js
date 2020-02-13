import React, { useEffect, useState } from "react";

export default function ResultPage(props) {
  const [trueVal, setTrueVal] = useState(0);
  const [passVal, setPassVal] = useState(0);
  const [falseVal, setFalseVal] = useState(0);

  useEffect(() => {
    calcTrue();
    calcFalse();
    calcPass();
  }, []);

  const calcTrue = () => {
    props.location.state.answers.filter((answer, index) =>
      answer === props.location.state.correctAnswers[index]
        ? setTrueVal(prevTrueVal => prevTrueVal + 1)
        : trueVal
    );
  };

  const calcPass = () => {
    if (props.location.state.answers.length < 10) {
      setPassVal(10 - props.location.state.answers.length);
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

  return (
    <div className="section__resultpage">
      <div className="section__resultpage-tfp">
        <div className="tfp__true">
          <div className="tfp__true-point">{trueVal}</div>
          <div className="tfp__true-type">TRUE</div>
        </div>
        <div className="tfp__pass">
          <div className="tfp__pass-point">{passVal}</div>
          <div className="tfp__pass-type">PASS</div>
        </div>
        <div className="tfp__false">
          <div className="tfp__false-point">{falseVal}</div>
          <div className="tfp__false-type">FALSE</div>
        </div>
      </div>
      <div className="section__resultpage-total">
        <div className="tfp__point">{trueVal * 10} / 100</div>
        <div className="tfp__type">POINT</div>
      </div>
    </div>
  );
}
