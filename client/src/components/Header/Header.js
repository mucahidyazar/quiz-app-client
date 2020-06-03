import React, { useState, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import { logoutHandler } from "../../redux/actions";

const Header = ({ dispatch, user }) => {
  const [headerHead, setHeaderHead] = useState("");

  const onHeaderHead = () => {
    if (headerHead === "") {
      setHeaderHead("header-head");
    } else if (headerHead === "header-head") {
      setHeaderHead("");
    }
  };

  return (
    <header className={`header ${headerHead}`}>
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
          <i className="far fa-edit"></i>Create Quiz
        </NavLink>
        <NavLink to="/quizes" activeClassName="header__right--active">
          <i className="far fa-file-alt"></i>Quizes
        </NavLink>
        <NavLink
          to="/leaderboard"
          exact
          activeClassName="header__right--active"
        >
          <i className="fas fa-stream"></i>Leaderboard
        </NavLink>
        {user ? (
          <React.Fragment>
            <NavLink
              to={user.username}
              activeClassName="header__right--active"
              className="header__right--display"
            >
              <i className="fas fa-user"></i>Profile
            </NavLink>
            <NavLink
              to="/settings"
              className="header__right--display"
              activeClassName="header__right--active"
            >
              <i className="fas fa-cog"></i>Settings
            </NavLink>
            <NavLink
              to="/"
              activeClassName="header__right--active"
              className="header__right--display"
              onClick={() => dispatch(logoutHandler())}
            >
              <i className="fas fa-sign-out-alt"></i>Logout
            </NavLink>

            <div className="nav__profile">
              <div className="nav__profile--left">
                <Link
                  to={user.username}
                  className="nav__header"
                  onClick={onHeaderHead}
                >
                  <div className="nav__header--image">
                    {user?.profilePhoto?.filename ? (
                      <img src={`./img/${user.profilePhoto.filename}`} alt="" />
                    ) : (
                      <img src={`./img/profile.jpg`} alt="" />
                    )}
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
                    to="/home"
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
          </React.Fragment>
        ) : (
          <Link to="/registration">Login</Link>
        )}
      </ul>
    </header>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Header);
