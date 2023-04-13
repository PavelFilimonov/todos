import React from 'react';
import PropTypes from 'prop-types';

export default function TasksFilter({ value, active, filteredTasks }) {
  let btnClass = '';
  if (active) {
    btnClass = 'selected';
  }
  return (
    <li>
      <button className={btnClass} onClick={filteredTasks}>
        {value}
      </button>
    </li>
  );
}

TasksFilter.defaultProps = {
  active: false,
};

TasksFilter.propTypes = {
  value: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  filteredTasks: PropTypes.func.isRequired,
};
