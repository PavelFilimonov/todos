import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function NewTaskForm({ addTask }) {
  const [text, setText] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const changeText = (event) => {
    setText(event.target.value);
  };

  const changeMinutes = (event) => {
    setMinutes(event.target.value);
  };

  const changeSeconds = (event) => {
    setSeconds(event.target.value);
  };

  const createTask = (event) => {
    event.preventDefault();
    if (text) {
      addTask(text, minutes, seconds);
    }
    setText('');
    setMinutes('');
    setSeconds('');
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form className="new-todo-form" onSubmit={createTask}>
        <input className="new-todo" placeholder="Task" type="text" value={text} onChange={changeText} autoFocus />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          type="text"
          value={minutes}
          onChange={changeMinutes}
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          type="text"
          value={seconds}
          onChange={changeSeconds}
        />
        <button type="submit" />
      </form>
    </header>
  );
}

NewTaskForm.protoTypes = {
  addTask: PropTypes.func.isRequired,
};
