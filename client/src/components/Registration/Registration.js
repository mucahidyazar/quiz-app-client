import React, { useContext, useEffect } from "react";
import RegistrationContext from "../../context/registration/registrationContext";
import Login from "./Login/Login";
import Register from "./Register/Register";

const Registration = props => {
  const registrationContext = useContext(RegistrationContext);
  const {
    sectionLogin,
    sectionRegister,
    user,
    setLoginRegisterActive
  } = registrationContext;

  useEffect(() => {
    if (user !== null) {
      props.history.push("/");
    }
  }, [user]);

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

export default Registration;
