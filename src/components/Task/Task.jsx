import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

import './Task.css';

export default class Task extends Component {
  state = {
    editing: false,
    value: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const {
      editTask,
      todo: { id },
    } = this.props;
    editTask(id, this.state.value);
    this.setState({ editing: false, value: '' });
  };

  render() {
    const { todo, changeStatus, deleteTask } = this.props;
    const { id, label, completed, date } = todo;
    return (
      <li className={completed ? 'completed' : this.state.editing ? 'editing' : null}>
        <div className="view">
          <input
            id={id}
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={(event) => changeStatus(id, event.target.checked)}
          />
          <label htmlFor={id}>
            <span className="description">{label}</span>
            <span className="created">{`created ${formatDistanceToNow(date, {
              includeSeconds: true,
              locale: KG,
              addSuffix: true,
            })}`}</span>
          </label>
          <button
            type="button"
            className="icon icon-edit"
            onClick={() =>
              this.setState(({ editing }) => ({
                editing: !editing,
                value: todo.label,
              }))
            }
          ></button>
          <button type="button" className="icon icon-destroy" onClick={() => deleteTask(id)}></button>
        </div>
        {this.state.editing && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              className="edit"
              value={this.state.value}
              onChange={(event) => this.setState({ value: event.target.value })}
            />
          </form>
        )}
      </li>
    );
  }
}

Task.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
    completed: PropTypes.bool,
    date: PropTypes.instanceOf(Date),
  }),
  changeStatus: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
};

Task.defaultProps = {
  todo: {},
};
