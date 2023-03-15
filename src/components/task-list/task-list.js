import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './task-list.css';

import Task from '../task';

export default class TaskList extends Component {
  render() {
    const { todos, changeStatus, editTask, deleteTask } = this.props;
    return (
      <ul className="todo-list">
        {todos.map((todo) => (
          <Task key={todo.id} todo={todo} changeStatus={changeStatus} editTask={editTask} deleteTask={deleteTask} />
        ))}
      </ul>
    );
  }
}

TaskList.protoTypes = {
  todos: PropTypes.any,
  changeStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

TaskList.defaultProps = {
  todos: {},
};
