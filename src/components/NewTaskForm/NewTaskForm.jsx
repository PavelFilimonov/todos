import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './NewTaskForm.css';

export default class NewTaskForm extends Component {
  state = {
    value: '',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value.trim()) {
      this.props.addTask(this.state.value);
    }
    this.setState({ value: '' });
  };

  render() {
    const { placeholder } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="new-todo"
            placeholder={placeholder}
            value={this.state.value}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

NewTaskForm.protoTypes = {
  placeholder: PropTypes.string,
};

NewTaskForm.defaultProps = {
  placeholder: 'What needs to be done?',
};
