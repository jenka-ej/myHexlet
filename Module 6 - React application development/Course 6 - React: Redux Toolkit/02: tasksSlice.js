// В этом упражнении уже реализовано создание слайса.
// Вам нужно реализовать изменение состояния в редьюсе добавления задачи и подключить редьюсер к хранилищу стора.
// Реализуйте изменение состояния в редьюсе добавления задачи. Задача должна добавляться в начало списка задач.
// Добавьте передачу редьюсера задач в функцию configureStore(). Обратите внимание на то, как используется общее состояние в Tasks.jsx.
// Помните, что имя ключа редьюсера должно совпадать с ключом в общем состоянии, то есть должно быть tasksStore.

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, { payload: { task } }) => {
      state.tasks.unshift(task);
    },
  },
});

export const { addTask } = tasksSlice.actions;

export default tasksSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';

export default configureStore({
  reducer: {
    tasksStore: tasksReducer,
  },
});

/* ../components/App.jsx */

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

/* ../components/NewTaskForm.jsx */

import React, { useState } from 'react';
import _ from 'lodash';
import { useDispatch } from 'react-redux';
import { addTask } from '../slices/tasksSlice.js';

const NewTaskForm = () => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const handleAddTask = (e) => {
    e.preventDefault();
    const task = { text, id: _.uniqueId() };
    dispatch(addTask({ task }));
    setText('');
  };

  const handleUpdateNewTaskText = (e) => setText(e.target.value);

  return (
    <form action="" className="form-inline" onSubmit={handleAddTask}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          data-testid="input"
          required
          value={text}
          onChange={handleUpdateNewTaskText}
        />
      </div>
      <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
    </form>
  );
};

export default NewTaskForm;

/* ../components/Tasks.jsx */

import React from 'react';
import { useSelector } from 'react-redux';

const Tasks = () => {
  const tasks = useSelector((state) => state.tasksStore.tasks);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, text }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="mr-auto">{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;

/* ../index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './components/App.jsx';
import store from './slices/index.js';

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
import userEvent from '@testing-library/user-event';

import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

test('Store', async () => {
  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  const { asFragment } = render(vdom);
  expect(asFragment()).toMatchSnapshot();

  const newTaskInput = screen.getByTestId('input');
  const newTaskSubmit = screen.getByTestId('submit');

  await userEvent.type(newTaskInput, 'na-na');
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(newTaskSubmit);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.type(newTaskInput, 'another task');
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(newTaskSubmit);
  expect(asFragment()).toMatchSnapshot();
});
