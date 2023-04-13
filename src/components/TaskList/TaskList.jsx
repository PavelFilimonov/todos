import React from 'react';
import PropTypes from 'prop-types';

import Task from '../Task';

export default function TaskList({ tasks, onDeleted, editTask, saveChanges, onDone, btnFilter }) {
  let filteredTasks;
  if (btnFilter === 1) {
    filteredTasks = [...tasks];
  } else if (btnFilter === 2) {
    filteredTasks = tasks.filter((task) => !task.done);
  } else if (btnFilter === 3) {
    filteredTasks = tasks.filter((task) => task.done);
  }

  const items = filteredTasks.map((task) => {
    const { id } = task;
    return (
      <Task
        key={id}
        {...task}
        onDeleted={() => onDeleted(id)}
        editTask={() => editTask(id)}
        saveChanges={(event) => saveChanges(id, event)}
        onDone={() => onDone(id)}
      />
    );
  });
  return <ul className="todo-list">{items}</ul>;
}

TaskList.defaultProps = {
  btnFilter: 1,
};

TaskList.propTypes = {
  task: PropTypes.array,
  onDeleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};
