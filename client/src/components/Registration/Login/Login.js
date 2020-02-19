import React, { useContext, useState } from "react";
import RegistrationContext from "../../../context/registration/registrationContext";

export default function Login() {
  const registrationContext = useContext(RegistrationContext);
  const { loginHandler } = registrationContext;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLoginHandler = e => {
    e.preventDefault();
    loginHandler({
      email,
      password
    });
  };

  return (
    <form className="registration__login" onSubmit={onLoginHandler}>
      <input
        type="text"
        className="registration__login--email"
        placeholder="Email"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="registration__login--password"
        placeholder="Password"
        name="password"
        onChange={e => setPassword(e.target.value)}
      />
      <button className="registration__login--button">Login</button>
    </form>
  );
}
