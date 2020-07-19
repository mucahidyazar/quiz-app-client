import React from "react";
import Joi from "joi-browser";
import Form from "../../common/Form";

//REDUX
import { connect } from "react-redux";
//REDUX ACTIONS
import { login } from "../../../redux/actions";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
  };

  doSomething = (e) => {
    this.props.dispatch(
      login({
        email: e.target.elements.email.value,
        password: e.target.elements.password.value,
      })
    );
  };

  render() {
    const { data, errors } = this.state;

    return (
      <form className="registration__login" onSubmit={this.handleSubmit}>
        {this.renderInput("email", "Email")}
        {this.renderInput("password", "Password", "password")}
        {this.renderButton("Login")}
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

export default connect(mapStateToProps)(Login);
