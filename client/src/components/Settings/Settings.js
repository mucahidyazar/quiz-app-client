import React, { useContext, useState } from "react";
import RegistrationContext from "../../context/registration/registrationContext";
import InputSelect from "../Layout/InputSelect/InputSelect";
import moment from "moment";
import { useEffect } from "react";

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
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: birthday,
      checkbox: checkbox
    });
    console.log({
      id: user._id,
      username: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthday: birthday,
      checkbox: checkbox
    });
    props.history.push("/");
  };

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setPassword(user.password);
      setBirthday(moment(user.birthday).format(moment.HTML5_FMT.DATE));
      setCheckbox(user.checkbox);
    }
  }, []);

  return user ? (
    <div className="settings">
      <form className="settings__form" onSubmit={onUpdateUser}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          autoComplete="off"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Firstname"
          name="firstName"
          autoComplete="off"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lastname"
          name="lastName"
          autoComplete="off"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input
          type="date"
          name="birthday"
          value={birthday}
          onChange={e => setBirthday(e.target.value)}
        />
        <label htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            name="checkbox"
            checked={checkbox}
            onChange={e => setCheckbox(!checkbox)}
          />
          Subscribe to Newsletter
        </label>
        <button>Save</button>
      </form>
    </div>
  ) : null;
}
