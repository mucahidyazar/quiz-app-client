import React, { useContext, useEffect } from "react";
import CreateQuizContext from "../../context/createQuiz/createQuizContext";

//Components
import CreateQuizInformation from "./CreateQuizInformation/CreateQuizInformation";
import CreateQuizQuestions from "./CreateQuizQuestions/CreateQuizQuestions";

const CreateQuizPage = props => {
  const createQuizContext = useContext(CreateQuizContext);
  const {
    //Values
    quiz,
    quiz_title,
    quiz_description,
    quiz_category,
    quiz_type,
    quiz_difficulty,
    correct_answer,
    question,
    answers,
    error,
    //Func
    previousQuestion,
    setClearCreateQuiz,
    addQuizQuestion,
    addQuizInformation,
    saveQuiz
  } = createQuizContext;

  const hasError = error ? <div className="create__error">{error}</div> : null;

  const isQuestionInformationNull =
    quiz === null ? <CreateQuizInformation /> : <CreateQuizQuestions />;

  const onPreviousQuestion = () => {
    previousQuestion();
  };

  const isAnswerCorrect = () => answers.some(answer => answer === "");

  const isSaveButtonActive =
    quiz_title !== "" &&
    quiz_description !== "" &&
    quiz_category !== "" &&
    quiz_type !== "" &&
    quiz_difficulty !== "" &&
    question !== "" &&
    answers.length > 1 &&
    correct_answer !== null &&
    isAnswerCorrect() !== true
      ? true
      : false;

  const addQuizHandler = () =>
    quiz === null
      ? addQuizInformation(
          quiz_title,
          quiz_description,
          quiz_category,
          quiz_type,
          quiz_difficulty
        )
      : addQuizQuestion(question, answers, correct_answer);

  const onSaveQuiz = () => {
    saveQuiz(
      quiz_title,
      quiz_description,
      quiz_category,
      quiz_type,
      quiz_difficulty
    );
    props.history.push("/");
  };

  useEffect(() => {
    return () => {
      setClearCreateQuiz();
    };
  }, []);

  return (
    <div className="create">
      {hasError}
      {isQuestionInformationNull}
      <div className="create__buttons">
        {quiz !== null ? (
          <div className="create__buttons--back" onClick={onPreviousQuestion}>
            <i className="fas fa-arrow-alt-circle-left"></i>Back
          </div>
        ) : null}
        <div className="create__buttons--next" onClick={addQuizHandler}>
          Next<i className="fas fa-arrow-alt-circle-right"></i>
        </div>
      </div>
      {isSaveButtonActive === true ? (
        <div className="create__save" onClick={onSaveQuiz}>
          <i className="fas fa-save"></i>Save
        </div>
      ) : null}
    </div>
  );
};

export default CreateQuizPage;
