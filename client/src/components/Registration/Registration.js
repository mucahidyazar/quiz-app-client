import React, { useContext, useEffect } from "react";
import RegistrationContext from "../../context/registration/registrationContext";
import Login from "./Login/Login";
import Register from "./Register/Register";

//REDUX
import { connect } from "react-redux";
//REDUX ACTIONS
import { setLoginRegisterActive } from "../../redux/actions";

const Registration = ({
  dispatch,
  user,
  sectionLogin,
  sectionRegister,
  history,
}) => {
  return (
    <div className="section__registration">
      <div className="registration">
        <div className="registration__header">
          <div
            className={`registration__header--login registration__header--${sectionLogin}`}
            onClick={() => setLoginRegisterActive("login")}
          >
            Login
          </div>
          <div
            className={`registration__header--register registration__header--${sectionRegister}`}
            onClick={() => setLoginRegisterActive("register")}
          >
            Register
          </div>
        </div>
        {sectionLogin === "active" ? <Login /> : <Register />}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    sectionLogin: state.user.sectionLogin,
    sectionRegister: state.user.sectionRegister,
  };
};

export default Registration;
