// Реализуйте мидлвару addDate(), которая будет добавлять к названию задачи текущую дату.
// Например, при вводе имени задачи Новая задача, должна сформироваться задача с именем Задача на 14.02.2022: Новая задача.

const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  console.groupEnd();
  return result;
};

const addDate = (store) => (next) => (action) => {
  const result = next(action);
  const date = new Date().toLocaleDateString('ru-RU');
  if (action.type === 'TASK_ADD') {
    result.payload.task.text = `Задача на ${date}: ${result.payload.task.text}`;
    return result;
  }
  return result;
};

export default { logger, addDate };

/* reducers/index.js */

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    return [...state, task];
  },
}, []);

const text = handleActions({
  [actions.addTask]() {
    return '';
  },
  [actions.updateNewTaskText](state, { payload }) {
    return payload.text;
  },
}, '');

export default combineReducers({
  tasks,
  text,
});

/* actions/index.js */

import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');

/* components/App.jsx */

import React from 'react';
import NewTaskForm from './NewTaskForm.jsx';
import Tasks from './Tasks.jsx';

const App = () => (
  <div className="col-5">
    <NewTaskForm />
    <Tasks />
  </div>
);
export default App;

/* components/newTaskForm.jsx */

import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
};

const NewTaskForm = ({
  addTask,
  text,
  updateNewTaskText,
}) => {
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { text, id: _.uniqueId(), state: 'active' };
    addTask({ task });
  };

  const handleUpdateNewTaskText = (e) => {
    updateNewTaskText({ text: e.target.value });
  };

  return (
    <form action="" className="form-inline" onSubmit={handleAddTask}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          required
          value={text}
          onChange={handleUpdateNewTaskText}
        />
      </div>
      <input type="submit" className="btn btn-primary btn-sm" value="Add" />
    </form>
  );
};

export default connect(mapStateToProps, actionCreators)(NewTaskForm);

/* components/Tasks.jsx */

import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = (state) => state;

const Tasks = ({ tasks }) => {
  const renderTask = (task) => (
    <li key={task.id} className="list-group-item d-flex">
      <span className="mr-auto">
        <a href="#" className="text-reset">{task.text}</a>
      </span>
    </li>
  );

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(renderTask)}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps)(Tasks);

/* index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';

import middlewares from './middlewares.js';

const store = createStore(
  reducers,
  compose(
    applyMiddleware(
      middlewares.logger,
      middlewares.addDate,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (args) => args,
  ),
);

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);

/* __tests__ */

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import reducers from '../src/reducers/index.js';
import middlewares from '../src/middlewares';
import App from '../src/components/App.jsx';

test('Store', async () => {
  const store = configureStore({ reducer: reducers, middleware: [middlewares.addDate] });

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(vdom);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'first task');
  expect(screen.getByRole('textbox')).toHaveDisplayValue('first task');

  const today = new Date();
  const formatedDate = today.toLocaleDateString('ru-RU');
  await userEvent.click(screen.getByRole('button', { name: /Add/i }));
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  expect(screen.getByRole('link', { name: `Задача на ${formatedDate}: first task` })).toBeInTheDocument();
});
