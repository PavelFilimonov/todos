import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './TasksFilter.css';

export default class TasksFilter extends Component {
  render() {
    const { changeFilter, filter } = this.props;
    return (
      <ul className="filters">
        <li>
          <button type="button" className={filter === 'All' ? 'selected' : null} onClick={() => changeFilter('All')}>
            All
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Active' ? 'selected' : null}
            onClick={() => changeFilter('Active')}
          >
            Active
          </button>
        </li>
        <li>
          <button
            type="button"
            className={filter === 'Completed' ? 'selected' : null}
            onClick={() => changeFilter('Completed')}
          >
            Completed
          </button>
        </li>
      </ul>
    );
  }
}

TasksFilter.propTypes = {
  filter: PropTypes.string,
  changeFilter: PropTypes.func.isRequired,
};

TasksFilter.defaultProps = {
  filter: 'All',
};
