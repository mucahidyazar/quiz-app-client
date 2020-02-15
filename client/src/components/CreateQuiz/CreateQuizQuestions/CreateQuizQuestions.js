import React, { useContext } from "react";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

const CreateQuizQuestions = () => {
  const createQuizContext = useContext(CreateQuizContext);
  const {
    correct_answer,
    question,
    answers,
    setQuestion,
    addNewAnswer,
    trueOrFalseAction,
    setAnswer
  } = createQuizContext;

  return (
    <div className="question">
      <textarea
        className="question__question"
        placeholder='Your question? For example: In which film does Humphrey Bogart say the famous line,
      "Here&#039;s looking at you, kid"?'
        onChange={e => setQuestion(e.target.value)}
        value={question}
      ></textarea>
      <div className="question__answers">
        {answers && answers.length > 0
          ? answers.map((answer, index) => (
              <div className="question__answer" key={index}>
                <div
                  className={`question__answer--icon ${
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
                  className="question__answer--input"
                  onChange={e => setAnswer(e.target.value, index)}
                  value={answer}
                />
              </div>
            ))
          : null}
        {answers && answers.length < 5 ? (
          <div className="question__add" onClick={() => addNewAnswer()}>
            <i className="fas fa-plus-square"></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CreateQuizQuestions;
