import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';

import './index.css';

import NewTaskForm from './components/new-task-form';
import TaskList from './components/task-list';
import Footer from './components/footer';

const domNode = document.getElementById('root');
const root = createRoot(domNode);

class Page extends Component {
  state = {
    todos: [],
    filter: 'All',
  };

  addTask = (text) => {
    const task = {
      id: this.state.todos.length + 1,
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
      const all = filter === 'All';
      const done = filter === 'Completed';
      return all ? true : done ? completed === true : completed === false;
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

root.render(<Page />);
