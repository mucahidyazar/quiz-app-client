import React, { useContext } from "react";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import {} from "../../../redux/actions";

const CreateQuizInformation = () => {
  return (
    <div className="information">
      <label htmlFor="file" className="information__image">
        <img src="" alt=""></img>
        <i className="fas fa-image"></i>Upload an image
        <input id="file" type="file" className="form-control" name="file" />
      </label>

      <input
        type="text"
        name="quiztitle"
        placeholder="Quiz Title"
        className="information__title"
      />
      <textarea
        type="text"
        name="quizdescription"
        placeholder="Quiz Desctiption"
        className="information__description"
      ></textarea>
      <div className="information__informations">
        <select className="information__informations--category">
          <option value="general">General</option>
          <option value="books">Books</option>
          <option value="film">Film</option>
          <option value="music">Music</option>
          <option value="musical & theatres">Musical & Theatres</option>
        </select>
        <select className="information__informations--type">
          <option value="multiple">Multiple</option>
        </select>
        <select className="information__informations--difficulty">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(CreateQuizInformation);
