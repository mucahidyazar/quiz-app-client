import React, { useContext } from "react";
import RegistrationContext from "../../context/registration/registrationContext";

export default function Settings(props) {
  const registrationContext = useContext(RegistrationContext);
  const { user } = registrationContext;

  if (!user) {
    props.history.push("/");
  }

  return user ? (
    <div className="settings">
      <form className="settings__form">
        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="off"
          value={user.username}
        />
        <input
          type="text"
          placeholder="Firstname"
          name="firstname"
          autoComplete="off"
          value={user.firstname ? user.firstname : null}
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastname"
          autoComplete="off"
          value={user.lastname ? user.lastname : null}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={user.email}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={user.password}
        />
        <select name="gender" id="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input type="date" />
        <label htmlFor="checkbox">
          <input type="checkbox" id="checkbox" />
          Subscribe to Newsletter
        </label>
        <button>Register</button>
      </form>
    </div>
  ) : null;
}
