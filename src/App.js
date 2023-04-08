import React, { Component } from 'react';

import NewTaskForm from './components/NewTaskForm/';
import TaskList from './components/TaskList/';
import Footer from './components/Footer/';

export default class App extends Component {
  state = {
    todos: [],
    filter: 'All',
  };

  addTask = (text) => {
    const task = {
      id: this.state.todos.length + 2,
      label: text,
      completed: false,
      date: new Date(),
    };
    this.setState(({ todos }) => ({ todos: [...todos, task] }));
  };

  deleteTask = (idx) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(({ id }) => id !== idx),
    }));
  };

  changeStatus = (idx, data) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (idx === todo.id) {
          todo.completed = data;
        }
        return todo;
      }),
    }));
  };

  editTask = (idx, text) => {
    this.setState(({ todos }) => ({
      todos: todos.map((todo) => {
        if (todo.id === idx) {
          todo.label = text;
        }
        return todo;
      }),
    }));
  };

  clearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter((task) => !task.completed),
    }));
  };

  filteredItems = () => {
    const { todos, filter } = this.state;
    return todos.filter(({ completed }) => {
      if (filter === 'All') {
        return true;
      } else if (filter === 'Completed') {
        return completed === true;
      } else {
        return completed === false;
      }
    });
  };

  changeFilter = (status) => {
    this.setState({ filter: status });
  };

  render() {
    return (
      <section className="todoapp">
        <NewTaskForm placeholder="What needs to be done?" addTask={this.addTask} />
        <section className="main">
          <TaskList
            todos={this.filteredItems()}
            changeStatus={this.changeStatus}
            editTask={this.editTask}
            deleteTask={this.deleteTask}
          />
          <Footer
            backlogTasks={this.state.todos.filter(({ completed }) => !completed).length}
            clearCompleted={this.clearCompleted}
            changeFilter={this.changeFilter}
            filter={this.state.filter}
          />
        </section>
      </section>
    );
  }
}
