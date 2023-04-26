import React, { useState, useEffect } from 'react';
import { formatDistanceToNow } from 'date-fns';
import KG from 'date-fns/locale/en-AU';
import PropTypes from 'prop-types';

export default function Task({ text, timeLeft, id, editing, done, date, onDeleted, editTask, saveChanges, onDone }) {
  const [value, setValue] = useState(text);
  const [timer, setTimer] = useState(timeLeft);
  const [countDown, setCountDown] = useState(false);

  useEffect(() => {
    if (countDown) changeTimer();
  }, [timer]);

  let interval = null;

  const changeTimer = () => {
    if (timer > 0) {
      setCountDown(true);
      interval = setTimeout(() => setTimer(timer - 1), 1000);
    }
  };

  const pauseTimer = () => {
    setCountDown(false);
    clearTimeout(interval);
  };

  const editValue = (event) => {
    setValue(event.target.value);
  };

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

  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (timer <= 0) {
    clearInterval(interval);
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
                <button className="icon icon-play" onClick={changeTimer}></button>
                <button className="icon icon-pause" onClick={pauseTimer}></button>
                {`${minutes}:${seconds}`}
              </span>
              <span className="description">{`created ${timeCreated}`}</span>
            </>
          )}
        </label>
        <button className="icon icon-edit" onClick={editTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {liClass === 'editing' && (
        <input type="text" className="edit" value={value} onChange={editValue} onKeyDown={saveChanges} autoFocus />
      )}
    </li>
  );
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
