// Реализуйте приложение "список задач", которое умеет две вещи:
// 1) Добавлять задачи в список
// 2) Удалять задачи из списка

// HTML начальный:
// <div class="col-5">
//   <form action="" class="form-inline">
//     <div class="form-group mx-sm-3">
//       <input type="text" required value="">
//     </div>
//     <button type="submit" class="btn btn-primary btn-sm">Add</button>
//   </form>
// </div>

// HTML после добавления двух задач:
// <div class="col-5">
//   <form action="" class="form-inline">
//     <div class="form-group mx-sm-3">
//       <input type="text" required value="">
//     </div>
//     <button type="submit" class="btn btn-primary btn-sm">Add</button>
//   </form>
//   <div class="mt-3">
//     <ul class="list-group">
//       <li class="list-group-item d-flex">
//         <span class="mr-auto">second Task!</span>
//         <button type="button" class="close">
//           <span>&times;</span>
//         </button>
//       </li>
//       <li class="list-group-item d-flex">
//         <span class="mr-auto">first Task!</span>
//         <button type="button" class="close">
//           <span>&times;</span>
//         </button>
//       </li>
//     </ul>
//   </div>
// </div>

import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const props = {
    text: state.text,
    tasks: state.tasks,
  };
  return props;
};

const actionCreators = {
  updateNewTaskText: actions.updateNewTaskText,
  addTask: actions.addTask,
  removeTask: actions.removeTask,
};

const renderTasks = (removeTask, tasks) => {
  const handleRemoveTask = (e, taskId) => {
    e.preventDefault();
    const task = tasks.filter(({ id }) => id === taskId)[0];
    removeTask(task);
  };

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ text, id }) => {
          const key = id;
          return (
            <li className="list-group-item d-flex" key={key}>
              <span className="mr-auto">{text}</span>
              <button type="button" className="close" onClick={(e) => handleRemoveTask(e, id)}>
                <span>&times;</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const App = ({
  updateNewTaskText,
  addTask,
  removeTask,
  text,
  tasks,
}) => {
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { text, id: _.uniqueId() };
    addTask(task);
  };

  const handleUpdateNewTaskText = (e) => {
    updateNewTaskText(e.target.value);
  };

  return (
    <div className="col-5">
      <form action="" className="form-inline">
        <div className="form-group mx-sm-3">
          <input type="text" required value={text} onChange={handleUpdateNewTaskText} />
        </div>
        <button type="submit" className="btn btn-primary btn-sm" onClick={handleAddTask}>Add</button>
      </form>
      {renderTasks(removeTask, tasks)}
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(App);

/* ../actions/index.js */

export const updateNewTaskText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const addTask = (task) => ({
  type: 'TASK_ADD',
  payload: {
    task,
  },
});

export const removeTask = (task) => ({
  type: 'TASK_REMOVE',
  payload: {
    task,
  },
});

/* ../reducers/index.js */

import { combineReducers } from 'redux';

const text = (state = '', action) => {
  switch (action.type) {
    case 'TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'TASK_ADD': {
      return '';
    }
    default:
      return state;
  }
};

const tasks = (state = [], action) => {
  switch (action.type) {
    case 'TASK_ADD': {
      const { task } = action.payload;
      return [task, ...state];
    }
    case 'TASK_REMOVE': {
      const { task } = action.payload;
      return state.filter((currentTask) => currentTask !== task);
    }
    default:
      return state;
  }
};

export default combineReducers({
  text,
  tasks,
});

/* ../index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const dom = (
  <Provider store={store}>
    <App />
  </Provider>
);

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(dom);

/* __tests__ */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import reducers from '../src/reducers/index.js';
import App from '../src/components/App.jsx';

test('Store', async () => {
  const store = createStore(reducers);

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  render(vdom);

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'my first task');
  expect(screen.getByRole('textbox')).toHaveDisplayValue('my first task');

  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  expect(screen.getByRole('list')).toBeInTheDocument();
  expect(screen.getByText('my first task')).toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'one more');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByText('one more')).toBeInTheDocument();
  expect(screen.getByText('my first task')).toBeInTheDocument();

  const listScope1 = within(screen.getByRole('list'));
  await userEvent.click(listScope1.getAllByRole('button')[0]);
  expect(screen.queryByText('one more')).not.toBeInTheDocument();
  expect(screen.getByText('my first task')).toBeInTheDocument();
  const listScope2 = within(screen.getByRole('list'));
  await userEvent.click(listScope2.getByRole('button'));
  expect(screen.queryByText('my first task')).not.toBeInTheDocument();
  expect(screen.queryByRole('list')).not.toBeInTheDocument();
});
