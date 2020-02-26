import React, { useContext, useState } from "react";
import RegistrationContext from "../../context/registration/registrationContext";
import InputSelect from "../Layout/InputSelect/InputSelect";
import moment from "moment";

export default function Settings(props) {
  const registrationContext = useContext(RegistrationContext);
  const { user, userUpdate } = registrationContext;

  if (!user) {
    props.history.push("/");
  }

  const onUpdateUser = e => {
    e.preventDefault();
    userUpdate({
      id: user._id,
      username: e.target.username.value,
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      birthday: e.target.birthday.value,
      checkbox: e.target.checkbox.checked
    });
    props.history.push("/");
  };

  return user ? (
    <div className="settings">
      <form className="settings__form" onSubmit={onUpdateUser}>
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
          name="firstName"
          autoComplete="off"
          value={user.firstName ? user.firstName : null}
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastName"
          autoComplete="off"
          value={user.lastName ? user.lastName : null}
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
        <input
          type="date"
          name="birthday"
          value={moment(user.birthday).format("MMMM Do YYYY")}
        />
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={user.checkbox}
          />
          Subscribe to Newsletter
        </label>
        <button>Save</button>
      </form>
    </div>
  ) : null;
}
