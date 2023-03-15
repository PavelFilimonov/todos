import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TasksFilter from '../tasks-filter';

export default class Footer extends Component {
  render() {
    const { backlogTasks, clearCompleted, changeFilter, filter } = this.props;
    return (
      <footer className="footer">
        <span className="todo-count">
          {backlogTasks} {backlogTasks > 1 ? 'items' : 'item'} left
        </span>
        <TasksFilter changeFilter={changeFilter} filter={filter} />
        <button type="button" className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    );
  }
}

Footer.propTypes = {
  backlogTasks: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  changeFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

Footer.defaultProps = {
  backlogTasks: 0,
  filter: 'All',
};
