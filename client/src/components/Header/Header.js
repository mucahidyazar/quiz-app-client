import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <div className="header__left">
        <i className="fas fa-feather-alt header__left-icon"></i>
        <div className="header__left-brand">Trillo App</div>
      </div>
      <ul className="header__right">
        <li>
          <Link to="/">Create Quiz</Link>
        </li>
        <li>
          <Link to="/quizes">Quizes</Link>
        </li>
        <li>
          <Link to="/">About</Link>
        </li>
        <li>
          <i className="fas fa-sun"></i>
        </li>
      </ul>
    </header>
  );
};

export default Header;
