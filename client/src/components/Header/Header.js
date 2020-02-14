import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <i className="fas fa-feather-alt header__left-icon"></i>
        <div className="header__left-brand">
          <Link to="/">Trillo App</Link>
        </div>
      </div>
      <ul className="header__right">
        <Link to="/create-quiz">Create Quiz</Link>

        <Link to="/quizes">Quizes</Link>

        <Link to="/">About</Link>

        <i className="fas fa-sun"></i>
      </ul>
    </header>
  );
};

export default Header;
