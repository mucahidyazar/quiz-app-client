import React from "react";

//REDUX CONNECTION
import { connect } from "react-redux";
//REDUX ACTIONS
import { register } from "../../../redux/actions";

const Register = ({ dispatch }) => {
  const onregister = (e) => {
    e.preventDefault();
    dispatch(
      register({
        username: e.target.elements.username.value,
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
        repassword: e.target.elements.repassword.value,
      })
    );
  };

  return (
    <form className="registration__register" onSubmit={onregister}>
      <input
        type="text"
        className="registration__register--username"
        placeholder="Username"
        name="username"
        value="mucahidyazar0002"
      />
      <input
        type="text"
        className="registration__register--email"
        placeholder="Email"
        name="email"
        value="mucahidyazar0002@gmail.com"
      />
      <input
        type="password"
        className="registration__register--password"
        placeholder="Password"
        name="password"
        value="05369120161"
      />
      <input
        type="repassword"
        className="registration__register--password"
        placeholder="Repassword"
        name="repassword"
        value="05369120161"
      />
      <button className="registration__register--button">Register</button>
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user.user,
  };
};

export default connect(mapStateToProps)(Register);
