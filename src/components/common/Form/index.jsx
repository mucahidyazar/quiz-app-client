import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
import Input from "../Input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const { error } = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({
      ...this.state,
      data,
      errors,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.doSomething(e);
  };

  renderButton(label) {
    return (
      <button
        disabled={this.validate()}
        className="registration__login--button"
      >
        {label}
      </button>
    );
  }

  renderInput(name, placeholder, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        className="registration__login--password"
        error={errors[name]}
        name={name}
        onChange={this.handleChange}
        placeholder={placeholder}
        type={type}
        value={data[name]}
      />
    );
  }
}

export default Form;
