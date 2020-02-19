import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import defaultUser from "../../public/png/default-user.png";

const Header = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user } = registrationContext;

  return (
    <header className="header">
      <div className="header__left">
        <i className="fas fa-feather-alt header__left-icon"></i>
        <div className="header__left-brand">
          <Link to="/">Trillo App</Link>
        </div>
      </div>
      <ul className="header__right">
        <Link className="header__right-create" to="/create-quiz">
          Create Quiz
        </Link>
        <Link to="/quizes">Quizes</Link>
        <Link to="/">Leaderboard</Link>
        {user ? (
          <Link to={user.username} className="header__profile">
            <div className="header__profile--image">
              <img src={defaultUser} alt="" />
            </div>
            <div className="header__profile--name">{user.username}</div>
          </Link>
        ) : (
          <Link to="/registration">Login</Link>
        )}

        <i className="fas fa-sun"></i>
      </ul>
    </header>
  );
};

export default Header;
