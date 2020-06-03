import React, { useContext } from "react";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import {} from "../../../redux/actions";

const CreateQuizQuestions = () => {
  return (
    <div className="question">
      <textarea
        className="question__question"
        placeholder='Your question? For example: In which film does Humphrey Bogart say the famous line,
      "Here&#039;s looking at you, kid"?'
      ></textarea>
      <div className="question__answers">
        <div className="question__answer">
          <div>
            <i></i>
          </div>
          <input
            type="text"
            placeholder="Enter your answer as you wish"
            className="question__answer--input"
          />
        </div>
        <div className="question__add">
          <i className="fas fa-plus-square"></i>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(CreateQuizQuestions);
