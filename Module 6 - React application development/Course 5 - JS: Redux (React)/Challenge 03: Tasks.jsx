// Реализуйте компонент <Tasks />, добавив в него логику переключения "темы". Тема определяет классы, применяемые к конкретной задаче.
// По умолчанию используется светлая тема light. При клике на задачу она должна поменяться на dark. Классы для тем описаны в самом компоненте.

// Задача со светлой темой:
// <div class="mt-3">
//   <ul class="list-group">
//     <li class="list-group-item d-flex bg-light text-dark">
//       <span class="mr-auto">
//         <a href="#" class="text-reset">Текст задачи</a>
//       </span>
//     </li>
//   </ul>
// </div>

// Задача с темной темой:
// <div class="mt-3">
//   <ul class="list-group">
//     <li class="list-group-item d-flex bg-dark text-light">
//       <span class="mr-auto">
//         <a href="#" class="text-reset">Текст задачи</a>
//       </span>
//     </li>
//   </ul>
// </div>

import React from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const props = {
    tasks: state.tasks,
    tasksUIState: state.tasksUIState,
    text: state.text,
  };
  return props;
};

const actionCreators = {
  inverseTaskTheme: actions.inverseTaskTheme,
};

const Tasks = ({
  inverseTaskTheme,
  tasksUIState,
  tasks,
}) => {
  const { byId, allIds } = tasks;
  if (allIds.length === 0) {
    return null;
  }
  return (
    <div className="mt-3">
      <ul className="list-group">
        {allIds.map((id, index) => {
          const key = index;
          const currentTheme = tasksUIState[id];
          const currentTask = byId[id];
          const { text } = currentTask;
          const classValues = cn('list-group-item', 'd-flex', currentTheme);
          const handleInverseTaskTheme = (e) => {
            e.preventDefault();
            inverseTaskTheme({ id });
          };
          return (
            <li className={classValues} key={key}>
              <span className="mr-auto">
                <a href="#" className="text-reset" onClick={handleInverseTaskTheme}>{text}</a>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Tasks);

/* NewTaskForm.jsx */

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

/* App.jsx */

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

/* ../reducers/index.js */

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const tasks = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const { byId, allIds } = state;
    return {
      byId: { ...byId, [task.id]: task },
      allIds: [task.id, ...allIds],
    };
  },
}, { byId: {}, allIds: [] });

const tasksUIState = handleActions({
  [actions.addTask](state, { payload: { task } }) {
    const newTaskUIState = { [task.id]: 'bg-light text-dark' };
    return { ...state, ...newTaskUIState };
  },
  [actions.inverseTaskTheme](state, { payload: { id } }) {
    if (state[id] === 'bg-light text-dark') {
      const darkTaskUIState = { [id]: 'bg-dark text-light' };
      return { ...state, ...darkTaskUIState };
    }
    const lightTaskUIState = { [id]: 'bg-light text-dark' };
    return { ...state, ...lightTaskUIState };
  },
}, {});

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
  tasksUIState,
  text,
});

/* ../actions/index.js */

import { createAction } from 'redux-actions';

export const addTask = createAction('TASK_ADD');
export const updateNewTaskText = createAction('NEW_TASK_TEXT_UPDATE');
export const inverseTaskTheme = createAction('TASK_THEME_INVERSE');

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
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
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

  await userEvent.type(screen.getByRole('textbox'), 'first task');
  expect(screen.getByRole('textbox')).toHaveDisplayValue('first task');

  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  expect(screen.getByRole('link', { name: /first task/i })).toBeInTheDocument();
  expect(screen.getByRole('listitem')).toHaveClass('bg-light', 'text-dark');

  await userEvent.type(screen.getByRole('textbox'), 'second task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('link', { name: /second task/i })).toBeInTheDocument();
  expect(screen.getAllByRole('listitem')[0]).toHaveClass('bg-light', 'text-dark');
  expect(screen.getAllByRole('listitem')[1]).toHaveClass('bg-light', 'text-dark');

  await userEvent.click(screen.getByRole('link', { name: /second task/i }));
  expect(screen.getAllByRole('listitem')[0]).toHaveClass('bg-dark', 'text-light');
  expect(screen.getAllByRole('listitem')[1]).toHaveClass('bg-light', 'text-dark');

  await userEvent.click(screen.getByRole('link', { name: /first task/i }));
  expect(screen.getAllByRole('listitem')[0]).toHaveClass('bg-dark', 'text-light');
  expect(screen.getAllByRole('listitem')[1]).toHaveClass('bg-dark', 'text-light');

  await userEvent.click(screen.getByRole('link', { name: /first task/i }));
  expect(screen.getAllByRole('listitem')[0]).toHaveClass('bg-dark', 'text-light');
  expect(screen.getAllByRole('listitem')[1]).toHaveClass('bg-light', 'text-dark');
});
