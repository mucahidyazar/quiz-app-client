import React, { useState, useContext } from "react";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

const CreateQuizPage = props => {
  const createQuizContext = useContext(CreateQuizContext);
  const {
    correct_answer,
    incorrect_answers,
    question,
    answers,
    setQuestion,
    addNewAnswer,
    trueOrFalseAction,
    setAnswer,
    addNextQuestion,
    error
  } = createQuizContext;

  //   const trueOrFalseAction = () => {
  //     if (tofAction === 1) {
  //       setTofAction([...tofAction, 0]);
  //     } else if (tofAction === 0) {
  //       setTofAction(1);
  //     }
  //   };

  //   const [tofAction, setTofAction] = useState([]);

  const trueOrFalse = index => {
    if (index === correct_answer) {
      return "-double";
    }
    return "";
  };

  const hasError = error ? <div className="create__error">{error}</div> : null;

  return (
    <div className="create">
      {hasError}
      <textarea
        className="section__question"
        placeholder='Your question? For example: In which film does Humphrey Bogart say the famous line,
      "Here&#039;s looking at you, kid"?'
        onChange={e => setQuestion(e.target.value)}
        value={question}
      ></textarea>
      <div className="section__answers">
        {answers && answers.length > 0
          ? answers.map((answer, index) => (
              <div className="section__answer" key={index}>
                <div
                  className={`section__answer-icon ${
                    index === correct_answer ? "checked" : ""
                  }`}
                  onClick={() => trueOrFalseAction(index)}
                >
                  <i
                    className={`fas fa-check${
                      index === correct_answer ? "-double" : ""
                    }`}
                  ></i>
                </div>
                <input
                  type="text"
                  placeholder="Enter your answer as you wish"
                  className="section__answer-input"
                  onChange={e => setAnswer(e.target.value, index)}
                />
              </div>
            ))
          : null}
        {answers && answers.length < 5 ? (
          <div className="section__addAnswer" onClick={() => addNewAnswer()}>
            <i className="fas fa-plus-square"></i>
          </div>
        ) : null}
      </div>
      <div className="create__quiz">
        <div className="create__quiz--back">
          <i class="fas fa-arrow-alt-circle-left"></i>Back
        </div>
        <div
          className="create__quiz--next"
          onClick={() => addNextQuestion(question, answers, correct_answer)}
        >
          Next<i class="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizPage;
