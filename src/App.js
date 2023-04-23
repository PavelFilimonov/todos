import React, { useState } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [buttons, setButtons] = useState([
    { id: 1, value: 'All', active: true },
    { id: 2, value: 'Active', active: false },
    { id: 3, value: 'Completed', active: false },
  ]);
  const [btnFilter, setBtnFilter] = useState(1);

  const createTask = (text, minutes, seconds) => {
    return {
      id: tasks.length + 1,
      editing: false,
      done: false,
      date: new Date(),
      text,
      timeLeft: Number(minutes) * 60 + Number(seconds),
    };
  };

  const addTask = (text, minutes, seconds) => {
    const newTask = createTask(text, minutes, seconds);
    setTasks(() => {
      const newData = [...tasks, newTask];
      return newData;
    });
  };

  const deleteTask = (idx) => {
    setTasks(() => {
      const newTasks = tasks.filter((task) => task.id !== idx);
      return newTasks;
    });
  };

  const editTask = (idx) => {
    setTasks(() => {
      const newTasks = tasks.map((task) => {
        if (task.id === idx) {
          return { ...task, editing: true };
        } else {
          return { ...task };
        }
      });
      return newTasks;
    });
  };

  const saveChanges = (idx, event) => {
    if (event.key === 'Enter') {
      setTasks(() => {
        const newTasks = tasks.map((task) => {
          if (task.id === idx) {
            return { ...task, editing: false, text: event.target.value };
          } else {
            return { ...task };
          }
        });
        return newTasks;
      });
    }
  };

  const onDone = (idx) => {
    setTasks(() => {
      const index = tasks.findIndex((task) => task.id === idx);
      const checkedTask = tasks[index];
      const onDoneTask = { ...checkedTask, done: !checkedTask.done };
      const newTasks = [...tasks.slice(0, index), onDoneTask, ...tasks.slice(index + 1)];
      return newTasks;
    });
  };

  const activeBtn = (idx) => {
    setButtons(() => {
      const newButtons = buttons.map((button) => {
        if (button.id === idx) {
          return { ...button, active: true };
        } else {
          return { ...button, active: false };
        }
      });
      return newButtons;
    });
  };

  const filteredTasks = (idx) => {
    setBtnFilter(idx);
    activeBtn(idx);
  };

  const clearCompleted = () => {
    setTasks(() => {
      const newTask = tasks.filter((task) => !task.done);
      return newTask;
    });
  };

  const backlogTasks = tasks.filter(({ done }) => !done).length;
  return (
    <section className="todoapp">
      <NewTaskForm addTask={addTask} />
      <section className="main">
        <TaskList
          tasks={tasks}
          onDeleted={deleteTask}
          editTask={editTask}
          saveChanges={saveChanges}
          onDone={onDone}
          btnFilter={btnFilter}
        />
        <Footer
          buttons={buttons}
          backlogTasks={backlogTasks}
          activeBtn={activeBtn}
          filteredTasks={filteredTasks}
          clearCompleted={clearCompleted}
        />
      </section>
    </section>
  );
}
