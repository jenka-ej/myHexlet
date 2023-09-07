// Допишите добавление и удаление задач используя redux-toolkit.
// Реализуйте слайс для работы с задачами. Добавьте методы работы с задачами: добавление новой задачи, удаление задачи.
// Используйте материал из теории для создания асинхронных запросов. В слайсе уже есть метод получения списка задач, используйте его как пример.
// Запрос GET '/api/tasks' возвращает список задач.
// Запрос POST '/api/tasks' принимает данные в виде { name }, где name - это название задачи. Запрос создаёт задачу и возвращает { name, id }.
// Запрос DELETE '/api/tasks/:id' удаляет задачу с таким id.

// Пример данных, которые приходят с сервера:
// {
//   "items": [
//     {
//       "name": "test1",
//       "id": "1"
//     },
//     {
//       "name": "test2",
//       "id": "2"
//     }
//   ]
// }

// Добавьте импорт необходимых действий и реализуйте обработку добавления новой задачи.
// Добавьте импорт необходимых действий и добавьте получение списка задач.
// Реализуйте обработку удаления задачи, для этого создайте функцию handleRemoveTask(), которая будет принимать идентификатор задачи.

import axios from 'axios';

import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import routes from '../routes.js';

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await axios.get(routes.tasksPath());
    return response.data.items;
  },
);

export const sendTask = createAsyncThunk(
  'tasks/sendTask',
  async (data) => {
    const response = await axios.post(routes.tasksPath(), data);
    return response.data;
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id) => {
    await axios.delete(routes.taskPath(id));
    return id;
  },
);

const tasksAdapter = createEntityAdapter();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState({ loadingStatus: 'idle', error: null }),
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.entities.items = action.payload;
        state.ids = action.payload.map(({ id }) => id);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(sendTask.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(sendTask.fulfilled, (state, action) => {
        state.entities.items.push(action.payload);
        state.ids.push(action.payload.id);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(sendTask.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      })
      .addCase(removeTask.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const newEntity = state.entities.items.filter(({ id }) => id !== action.payload);
        const newIds = newEntity.map(({ id }) => id);
        state.entities.items = newEntity;
        state.ids = newIds;
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(removeTask.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export default tasksSlice.reducer;

/* index.js */

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
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
import { useDispatch } from 'react-redux';

// BEGIN (write your solution here)
import { sendTask } from '../slices/tasksSlice.js';
// END

const NewTaskForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = (e) => {
    e.preventDefault();
    dispatch(sendTask({ name }));
    setName('');
  };

  const onChange = (e) => setName(e.target.value);

  return (
    <form action="" className="form-inline" onSubmit={handleAddTask}>
      <div className="form-group mx-sm-3">
        <input
          type="text"
          data-testid="input"
          required
          value={name}
          onChange={onChange}
        />
      </div>
      <input type="submit" data-testid="submit" className="btn btn-primary btn-sm" value="Add" />
    </form>
  );
};

export default NewTaskForm;

/* ../components/Tasks.jsx */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchTasks, removeTask } from '../slices/tasksSlice.js';

const Tasks = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.entities.items);
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleRemoveTask = (id) => dispatch(removeTask(id));

  return tasks && (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, name }) => (
          <li key={id} className="list-group-item d-flex">
            <span className="mr-auto">{name}</span>
            <button type="button" className="close" onClick={() => handleRemoveTask(id)}>
              <span>&times;</span>
            </button>
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

/* ../routes.js */

const routes = {
  tasksPath: () => '/api/tasks',
  taskPath: (id) => `/api/tasks/${id}`,
};

export default routes;

/* __tests__ */

import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import uniqueId from 'lodash/uniqueId';
import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

test('Work 1', async () => {
  const items = [
    { name: 'test1', id: uniqueId() },
    { name: 'test2', id: uniqueId() },
  ];
  const server = setupServer(
    rest.get('/api/tasks', (req, res, ctx) => res(ctx.json({ items }))),
    rest.post('/api/tasks', (req, res, ctx) => res(ctx.json({ ...req.body, id: uniqueId() }))),
    rest.delete('/api/tasks/:taskId', (req, res, ctx) => {
      const { taskId } = req.params;
      return res(ctx.text(taskId));
    }),
  );

  server.listen({
    onUnhandledRequest(req) {
      // eslint-disable-next-line
      console.warn(
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );

  render(vdom);
  items.forEach(async (item) => expect(await screen.findByText(item.name)).toBeInTheDocument());

  const newTaskInput = await screen.getByTestId('input');
  const newTaskSubmit = await screen.getByTestId('submit');

  await userEvent.type(newTaskInput, 'na-na');
  await userEvent.click(newTaskSubmit);

  expect(await screen.findByText(/na-na/i)).toBeInTheDocument();
  expect(screen.queryByText('test1')).toBeInTheDocument();

  const closeButtons = await screen.findAllByText('×');
  await userEvent.click(closeButtons[0]);
  await waitFor(async () => {
    await expect(screen.queryByText('test1')).not.toBeInTheDocument();
  }, { timeout: 5000 });
});
