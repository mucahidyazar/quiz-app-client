import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import RegistrationContext from "../../context/registration/registrationContext";
import defaultUser from "../../public/png/default-user.png";

const Header = () => {
  const registrationContext = useContext(RegistrationContext);
  const { user, logoutHandler } = registrationContext;

  return (
    <header className="header">
      <div className="header__left">
        <i className="fas fa-sun"></i>
        <div className="header__left-brand">
          <Link to="/">Trillo App</Link>
        </div>
      </div>
      <ul className="header__right">
        <NavLink
          to="/create-quiz"
          exact
          activeClassName="header__right--active"
        >
          Create Quiz
        </NavLink>
        <NavLink to="/quizes" activeClassName="header__right--active">
          Quizes
        </NavLink>
        <NavLink
          to="/leaderboard"
          exact
          activeClassName="header__right--active"
        >
          Leaderboard
        </NavLink>
        {user ? (
          <div className="nav__profile">
            <div className="nav__profile--left">
              <Link to={user.username} className="nav__header">
                <div className="nav__header--image">
                  <img src={defaultUser} alt="" />
                </div>
                <div className="nav__header--name">
                  {user.username ? user.username : "Username"}
                </div>
              </Link>

              <div className="nav__options">
                <Link to={user.username} className="nav__options--profile">
                  <i className="fas fa-user"></i>Profile
                </Link>
                <Link to="/settings" className="nav__options--settings">
                  <i className="fas fa-cog"></i>Settings
                </Link>
                <Link
                  to="/"
                  className="nav__options--logout"
                  onClick={() => logoutHandler()}
                >
                  <i className="fas fa-sign-out-alt"></i>Logout
                </Link>
              </div>
            </div>

            <Link
              to="/"
              className="nav__profile--right"
              onClick={() => logoutHandler()}
            >
              <i className="fas fa-sign-out-alt"></i>
            </Link>
          </div>
        ) : (
          <Link to="/registration">Login</Link>
        )}
      </ul>
    </header>
  );
};

export default Header;
