import React, { useContext, useEffect } from "react";
import CreateQuizContext from "../../context/createQuiz/createQuizContext";

//Components
import CreateQuizInformation from "./CreateQuizInformation/CreateQuizInformation";
import CreateQuizQuestions from "./CreateQuizQuestions/CreateQuizQuestions";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import {} from "../../redux/actions";

const CreateQuizPage = (props) => {
  return (
    <div className="create">
      <div className="create__buttons">
        <div className="create__buttons--back">
          <i className="fas fa-arrow-alt-circle-left"></i>Back
        </div>
        <div className="create__buttons--next">
          Next<i className="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
      <div className="create__save">
        <i className="fas fa-save"></i>Save
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(CreateQuizPage);
