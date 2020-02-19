import React, { useContext } from "react";
import RegistrationContext from "../../../context/registration/registrationContext";

export default function Register() {
  const registrationContext = useContext(RegistrationContext);
  const { registerHandler } = registrationContext;

  const onRegisterHandler = e => {
    e.preventDefault();
    registerHandler({
      username: e.target.elements.username.value,
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      repassword: e.target.elements.repassword.value
    });
  };

  return (
    <form className="registration__register" onSubmit={onRegisterHandler}>
      <input
        type="text"
        className="registration__register--username"
        placeholder="Username"
        name="username"
        autoComplete="off"
      />
      <input
        type="text"
        className="registration__register--email"
        placeholder="Email"
        name="email"
        autoComplete="off"
      />
      <input
        type="password"
        className="registration__register--password"
        placeholder="Password"
        name="password"
        autoComplete="off"
      />
      <input
        type="repassword"
        className="registration__register--password"
        placeholder="Repassword"
        name="repassword"
        autoComplete="off"
      />
      <button className="registration__register--button">Register</button>
    </form>
  );
}
