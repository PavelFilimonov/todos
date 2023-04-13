import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm';
import TaskList from './components/TaskList';
import Footer from './components/Footer';

export default class App extends Component {
  state = {
    tasks: [],
    buttons: [
      { id: 1, value: 'All', active: true },
      { id: 2, value: 'Active', active: false },
      { id: 3, value: 'Completed', active: false },
    ],
    btnFilter: 1,
  };

  createTask = (text, minutes, seconds) => {
    return {
      id: this.state.tasks.length + 1,
      editing: false,
      done: false,
      date: new Date(),
      text,
      timeLeft: Number(minutes) * 60 + Number(seconds),
    };
  };

  addTask = (text, minutes, seconds) => {
    const newTask = this.createTask(text, minutes, seconds);
    this.setState(({ tasks }) => {
      const newData = [...tasks, newTask];
      return { tasks: newData };
    });
  };

  deleteTask = (idx) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((task) => task.id !== idx);
      return { tasks: newTasks };
    });
  };

  editTask = (idx) => {
    this.setState(({ tasks }) => {
      const newTasks = tasks.map((task) => {
        if (task.id === idx) {
          return { ...task, editing: true };
        } else {
          return { ...task };
        }
      });
      return { tasks: newTasks };
    });
  };

  saveChanges = (idx, event) => {
    if (event.key === 'Enter') {
      this.setState(({ tasks }) => {
        const newTasks = tasks.map((task) => {
          if (task.id === idx) {
            return { ...task, editing: false, text: event.target.value };
          } else {
            return { ...task };
          }
        });
        return { tasks: newTasks };
      });
    }
  };

  onDone = (idx) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((task) => task.id === idx);
      const checkedTask = tasks[index];
      const onDoneTask = { ...checkedTask, done: !checkedTask.done };
      const newTasks = [...tasks.slice(0, index), onDoneTask, ...tasks.slice(index + 1)];
      return { tasks: newTasks };
    });
  };

  activeBtn = (idx) => {
    this.setState(({ buttons }) => {
      const newButtons = buttons.map((button) => {
        if (button.id === idx) {
          return { ...button, active: true };
        } else {
          return { ...button, active: false };
        }
      });
      return { buttons: newButtons };
    });
  };

  filteredTasks = (idx) => {
    this.setState({ btnFilter: idx });
    this.activeBtn(idx);
  };

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newTask = tasks.filter((task) => !task.done);
      return { tasks: newTask };
    });
  };

  render() {
    const backlogTasks = this.state.tasks.filter(({ done }) => !done).length;
    return (
      <section className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            tasks={this.state.tasks}
            onDeleted={this.deleteTask}
            editTask={this.editTask}
            saveChanges={this.saveChanges}
            onDone={this.onDone}
            btnFilter={this.state.btnFilter}
          />
          <Footer
            buttons={this.state.buttons}
            backlogTasks={backlogTasks}
            activeBtn={this.activeBtn}
            filteredTasks={this.filteredTasks}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    );
  }
}
