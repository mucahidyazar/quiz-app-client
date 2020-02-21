import React, { useContext } from "react";
import RegistrationContext from "../../../context/registration/registrationContext";

export default function Login(props) {
  const registrationContext = useContext(RegistrationContext);
  const { loginHandler } = registrationContext;

  const onLoginHandler = e => {
    e.preventDefault();
    loginHandler({
      email: e.target.elements.email.value,
      password: e.target.elements.password.value
    });
  };

  return (
    <form className="registration__login" onSubmit={onLoginHandler}>
      <input
        type="text"
        className="registration__login--email"
        placeholder="Email"
        name="email"
      />
      <input
        type="password"
        className="registration__login--password"
        placeholder="Password"
        name="password"
      />
      <button className="registration__login--button">Login</button>
    </form>
  );
}
