import React, { useState, useContext } from "react";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

const CreateQuizPage = props => {
  const createQuizContext = useContext(CreateQuizContext);
  const {
    correct_answer,
    incorrect_answers,
    answers,
    addNewAnswer,
    trueOrFalseAction,
    setAnswer
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

  return (
    <div className="section__quizpage">
      <textarea
        className="section__question"
        placeholder='Your question? For example: In which film does Humphrey Bogart say the famous line,
      "Here&#039;s looking at you, kid"?'
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
                  placeholder="The Maltese Falcon"
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
    </div>
  );
};

export default CreateQuizPage;
