import React, { useContext } from "react";
import CreateQuizContext from "../../../context/createQuiz/createQuizContext";

const CreateQuizInformation = () => {
  const createQuizContext = useContext(CreateQuizContext);
  const {
    quiz_title,
    quiz_description,
    quiz_category,
    quiz_type,
    quiz_difficulty,
    changeCreateQuizTitle,
    changeCreateQuizDescription,
    changeCreateQuizCategory,
    changeCreateQuizType,
    changeCreateQuizDifficulty
  } = createQuizContext;

  const onChangeCreateQuizTitle = e => {
    changeCreateQuizTitle(e.target.value);
  };
  const onChangeCreateQuizDescription = e => {
    changeCreateQuizDescription(e.target.value);
  };
  const onChangeCreateQuizCategory = e => {
    changeCreateQuizCategory(e.target.value);
  };
  const onChangeCreateQuizType = e => {
    changeCreateQuizType(e.target.value);
  };
  const onChangeCreateQuizDifficulty = e => {
    changeCreateQuizDifficulty(e.target.value);
  };

  return (
    <div className="information">
      <div className="information__image">
        <label>
          <i className="fas fa-image"></i>Upload an image
          <input type="file" name="quizcoverimage" />
        </label>
      </div>

      <input
        type="text"
        name="quiztitle"
        placeholder="Quiz Title"
        className="information__title"
        value={quiz_title}
        onChange={onChangeCreateQuizTitle}
      />
      <textarea
        type="text"
        name="quizdescription"
        placeholder="Quiz Desctiption"
        className="information__description"
        value={quiz_description}
        onChange={onChangeCreateQuizDescription}
      ></textarea>
      <div className="information__informations">
        <select
          className="information__informations--category"
          value={quiz_category}
          onChange={onChangeCreateQuizCategory}
        >
          <option value="general">General</option>
          <option value="books">Books</option>
          <option value="film">Film</option>
          <option value="music">Music</option>
          <option value="musical & theatres">Musical & Theatres</option>
        </select>
        <select
          className="information__informations--type"
          value={quiz_type}
          onChange={onChangeCreateQuizType}
        >
          <option value="multiple">Multiple</option>
        </select>
        <select
          className="information__informations--difficulty"
          value={quiz_difficulty}
          onChange={onChangeCreateQuizDifficulty}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default CreateQuizInformation;
