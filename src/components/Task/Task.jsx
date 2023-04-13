import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

export default class Task extends Component {
  state = {
    value: this.props.text,
    timer: this.props.timeLeft,
  };

  interval = null;

  changeTimer = () => {
    if (this.state.timer > 0) {
      this.interval = setInterval(() => this.setState({ timer: this.state.timer - 1 }), 1000);
    }
  };

  pauseTimer = () => {
    clearInterval(this.interval);
  };

  editValue = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { id, editing, done, date, text, onDeleted, editTask, saveChanges, onDone } = this.props;
    let liClass = '';
    let liChecked = '';
    if (done) {
      liClass = 'completed';
      liChecked = 'checked';
    }
    if (editing) {
      liClass = 'editing';
    }

    let timeCreated = formatDistanceToNow(date, {
      includeSeconds: true,
      locale: KG,
      addSuffix: true,
    });

    let minutes = Math.floor(this.state.timer / 60);
    let seconds = this.state.timer % 60;
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (this.state.timer <= 0) {
      clearInterval(this.interval);
    }

    return (
      <li className={liClass}>
        <div className="view">
          <input className="toggle" type="checkbox" id={id} onChange={onDone} checked={liChecked} />
          <label htmlFor={id}>
            {text && (
              <>
                <span className="title">{text}</span>
                <span className="description">
                  <button className="icon icon-play" onClick={this.changeTimer}></button>
                  <button className="icon icon-pause" onClick={this.pauseTimer}></button>
                  {`${minutes}:${seconds}`}
                </span>
                <span className="description">{`created ${timeCreated}`}</span>
              </>
            )}
          </label>
          <button className="icon icon-edit" onClick={editTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {
          (liClass = 'editing' && (
            <input
              type="text"
              className="edit"
              value={this.state.value}
              onChange={this.editValue}
              onKeyDown={saveChanges}
              autoFocus
            />
          ))
        }
      </li>
    );
  }
}

Task.defaultProps = {
  done: false,
  edit: false,
};

Task.propTypes = {
  id: PropTypes.number,
  editing: PropTypes.bool,
  done: PropTypes.bool,
  date: PropTypes.instanceOf(Date).isRequired,
  text: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  editTask: PropTypes.func.isRequired,
  saveChanges: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
};
