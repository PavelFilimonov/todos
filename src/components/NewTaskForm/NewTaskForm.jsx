import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NewTaskForm extends Component {
  state = {
    text: '',
    minutes: '',
    seconds: '',
  };

  testFunc = () => {
    let test = 0;
  }

  changeText = (event) => {
    this.setState(() => {
      return { text: event.target.value };
    });
  };

  changeMinutes = (event) => {
    this.setState(() => {
      return { minutes: event.target.value };
    });
  };

  changeSeconds = (event) => {
    this.setState(() => {
      return { seconds: event.target.value };
    });
  };

  createTask = (event) => {
    event.preventDefault();
    const { text, minutes, seconds } = this.state;
    if (this.state.text) {
      this.props.addTask(text, minutes, seconds);
    }
    this.setState(() => {
      return { text: '', minutes: '', seconds: '' };
    });
  };

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form className="new-todo-form" onSubmit={this.createTask}>
          <input
            className="new-todo"
            placeholder="Task"
            type="text"
            value={this.state.text}
            onChange={this.changeText}
            autoFocus
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            type="text"
            value={this.state.minutes}
            onChange={this.changeMinutes}
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            type="text"
            value={this.state.seconds}
            onChange={this.changeSeconds}
          />
          <button type="submit" />
        </form>
      </header>
    );
  }
}

NewTaskForm.protoTypes = {
  addTask: PropTypes.func.isRequired,
};
