import React, { useContext } from "react";
import { Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import defaultUser from "../../public/png/default-user.png";

const Header = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user, logoutHandler } = registrationContext;

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
            <div className="header__profile--name">
              {user.username ? user.username : "Username"}
            </div>
            <div className="header__profile--options">
              <Link to={user.username} className="header__profile--profile">
                <i class="fas fa-user"></i>Profile
              </Link>
              <div className="header__profile--settings">
                <i class="fas fa-cog"></i>Settings
              </div>
              <div
                className="header__profile--logout"
                onClick={() => logoutHandler()}
              >
                <i class="fas fa-sign-out-alt"></i>Logout
              </div>
            </div>
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
