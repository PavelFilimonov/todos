import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../TasksFilter';

export default function Footer({ buttons, backlogTasks, activeBtn, filteredTasks, clearCompleted }) {
  const items = buttons.map((button) => {
    const { id, value, active } = button;
    return (
      <TasksFilter
        key={id}
        value={value}
        active={active}
        activeBtn={() => activeBtn(id)}
        filteredTasks={() => filteredTasks(id)}
      />
    );
  });
  return (
    <footer className="footer">
      <span className="todo-count">
        {backlogTasks} {backlogTasks > 1 ? 'items' : 'item'} left
      </span>
      <ul className="filters">{items}</ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  backlogTasks: 0,
};

Footer.propTypes = {
  buttons: PropTypes.array.isRequired,
  backlogTasks: PropTypes.number,
  clearCompleted: PropTypes.func.isRequired,
  filteredTasks: PropTypes.func.isRequired,
};
