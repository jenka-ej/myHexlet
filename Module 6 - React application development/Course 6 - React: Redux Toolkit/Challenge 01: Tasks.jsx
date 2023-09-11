// Частая задача, если данных очень много, показывать их частями, так как контента может быть слишком много.
// Обычно для этого используется постраничный вывод(пагинация) с возможностью переключения страниц и выбором количества элементов на странице.
// В этом упражнении вам надо добавить пагинацию для списка задач.
// Добавьте получение списка задач для текущей страницы через селектор. Добавьте к списку задач aria-label="Список задач".
// Добавьте выбор количества задач на странице: 5, 10, 20 или 50 задач на страницу.
// Используйте для этого селектор, добавьте к нему aria-label="Размер страницы".
// Изменение количества задач через этот элемент должно приводить к открытию первой страницы.
// Добавьте кнопки для переключения страниц.

// Пример страницы:
// <div id="container" class="container m-3">
//   <div class="col-5">
//     <form action="" class="form-inline">
//       <div class="form-group mx-sm-3">
//         <input type="text" data-testid="input" required="" value="" />
//       </div>
//       <input
//         type="submit"
//         data-testid="submit"
//         class="btn btn-primary btn-sm"
//         value="Add"
//       />
//     </form>
//     <div class="mt-3">
//       <ul class="list-group" aria-label="Список задач">
//         <li class="list-group-item d-flex">
//           <span class="mr-auto">Задача № 1</span>
//           <button type="button" class="close"><span>×</span></button>
//         </li>
//         <li class="list-group-item d-flex">
//           <span class="mr-auto">Задача № 2</span>
//           <button type="button" class="close"><span>×</span></button>
//         </li>
//         <li class="list-group-item d-flex">
//           <span class="mr-auto">Задача № 3</span>
//           <button type="button" class="close"><span>×</span></button>
//         </li>
//         <li class="list-group-item d-flex">
//           <span class="mr-auto">Задача № 4</span>
//           <button type="button" class="close"><span>×</span></button>
//         </li>
//         <li class="list-group-item d-flex">
//           <span class="mr-auto">Задача № 5</span>
//           <button type="button" class="close"><span>×</span></button>
//         </li>
//       </ul>
//       <div class="mt-3">
//         <span>Показывать по </span>
//         <select
//           aria-label="Размер страницы"
//           class="form-select form-select-lg"
//         >
//           <option value="5">5</option>
//           <option value="10">10</option>
//           <option value="20">20</option>
//           <option value="50">50</option>
//         </select>
//       </div>
//       <ul class="mt-3 pagination">
//         <li class="page-item active"><span class="page-link">1</span></li>
//         <li class="page-item">
//           <a class="page-link" role="button" tabindex="0">2</a>
//         </li>
//         <li class="page-item">
//           <a class="page-link" role="button" tabindex="0">3</a>
//         </li>
//         <li class="page-item">
//           <a class="page-link" role="button" tabindex="0">4</a>
//         </li>
//         <li class="page-item">
//           <a class="page-link" role="button" tabindex="0">5</a>
//         </li>
//       </ul>
//     </div>
//   </div>
// </div>

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Pagination } from 'react-bootstrap';

import { removeTask, fetchTasks } from '../slices/tasksSlice.js';

const pageSizes = [5, 10, 20, 50];

const Tasks = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
  }, []);

  const [option, setOption] = useState(5);
  const [active, setActive] = useState(1);

  const { tasks } = useSelector((state) => state.tasks);
  const handleRemoveTask = (e, id) => {
    e.preventDefault();
    dispatch(removeTask(id));
    const nextFirstIndex = (active - 1) * option + 1;
    if (!tasks[nextFirstIndex] && active !== 1) {
      setActive(active - 1);
    }
  };

  const handleActiveItem = (e, number) => {
    e.preventDefault();
    setActive(number);
  };

  const handleOption = (e) => {
    e.preventDefault();
    setOption(e.target.value);
    setActive(1);
  };

  const paginationItems = [];
  const paginationPages = tasks.length === 0 ? 1 : Math.ceil(tasks.length / option);
  for (let number = 1; number <= paginationPages; number += 1) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === active}
        activeLabel={false}
        onClick={(e) => handleActiveItem(e, number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  return (
    <div className="mt-3">
      <ul className="list-group" aria-label="Список задач">
        {tasks.map(({ name, id }, index) => {
          const prevLastIndex = (active - 1) * option;
          const nextFirstIndex = active * option;
          const indexPlusOne = index + 1;
          const condition = indexPlusOne > prevLastIndex && indexPlusOne <= nextFirstIndex;
          if (condition) {
            return (
              <li className="list-group-item d-flex" key={id}>
                <span className="mr-auto">{name}</span>
                <button type="button" className="close" onClick={(e) => handleRemoveTask(e, id)}><span>×</span></button>
              </li>
            );
          }
          return null;
        })}
      </ul>
      <div className="mt-3">
        <span>Показывать по </span>
        <select aria-label="Размер страницы" className="form-select form-select-lg" onChange={(e) => handleOption(e)}>
          {pageSizes.map((pageSize, index) => {
            const key = index;
            return (
              <option value={pageSize} key={key}>{pageSize}</option>
            );
          })}
        </select>
      </div>
      <ul className="mt-3 pagination">
        <Pagination>{paginationItems}</Pagination>
      </ul>
    </div>
  );
};

export default Tasks;

/* NewTaskForm.jsx */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { sendTask } from '../slices/tasksSlice.js';

const NewTaskForm = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = async (e) => {
    e.preventDefault();
    const task = { name };
    dispatch(sendTask(task));
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

/* ../slices/tasksSlice.js */

import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
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
  async (task) => {
    const { data } = await axios.post(routes.tasksPath(), task);
    return data;
  },
);

export const removeTask = createAsyncThunk(
  'tasks/removeTask',
  async (id) => {
    await axios.delete(routes.removeTaskPath(id));
    return id;
  },
);

const initialState = {
  tasks: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(sendTask.fulfilled, (state, action) => {
        state.tasks.unshift(action.payload);
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const id = action.payload;
        state.tasks = state.tasks.filter((t) => t.id !== id);
      });
  },
});

export default tasksSlice.reducer;

/* ../slices/index.js */

import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice.js';

export default configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

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
  removeTaskPath: (id) => `/api/tasks/${id}`,
};

export default routes;

/* __tests__ */

import _ from 'lodash';
import '@testing-library/jest-dom';

import React from 'react';
import { Provider } from 'react-redux';
import {
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';
import uniqueId from 'lodash/uniqueId';
import App from '../src/components/App.jsx';
import store from '../src/slices/index.js';

const server = setupServer();

beforeAll(() => {
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
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});

describe('Page work 1', () => {
  const items = [];
  for (let i = 1; i <= 100; i += 1) {
    items.push({ name: `Задача № ${i}`, id: `test_${i}` });
  }

  beforeEach(async () => {
    server.use(
      rest.get('/api/tasks', (req, res, ctx) => res(ctx.json({ items }))),
      rest.post('/api/tasks', (req, res, ctx) => res(ctx.json({ ...req.body, id: uniqueId() }))),
      rest.delete('/api/*', (req, res, ctx) => res(ctx.status(200))),
    );

    const vdom = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    render(vdom);
  });

  it('Work 1', async () => {
    const newTaskInput = await screen.getByTestId('input');
    const newTaskSubmit = await screen.getByTestId('submit');

    await userEvent.type(newTaskInput, 'na-na');
    await userEvent.click(newTaskSubmit);

    expect(await screen.findByText(/na-na/i)).toBeInTheDocument();
    const closeButtons = await screen.findAllByText('×');
    await userEvent.click(closeButtons[0]);
    await waitFor(() => {
      expect(screen.queryByText('na-na')).not.toBeInTheDocument();
    });
  });

  it('Pagination 1', async () => {
    const tasksList = screen.getByRole('list', { name: /Список задач/i });
    expect(tasksList).toBeInTheDocument();
    const currentTasks = within(tasksList).getAllByRole('listitem');
    expect(currentTasks.length).toBe(5);

    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });
    for (let i = 5; i <= 9; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(screen.queryByText(items[10].name)).not.toBeInTheDocument();
    });
  });

  it('Pagination 2', async () => {
    const tasksList = screen.getByRole('list', { name: /Список задач/i });
    expect(tasksList).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /Размер страницы/i }), ['10']);
    const currentTasks = within(tasksList).getAllByRole('listitem');
    expect(currentTasks.length).toBe(10);

    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });
    for (let i = 10; i <= 19; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(screen.queryByText(items[20].name)).not.toBeInTheDocument();
    });
  });

  it('Pagination 3', async () => {
    const tasksList = screen.getByRole('list', { name: /Список задач/i });
    expect(tasksList).toBeInTheDocument();
    await userEvent.selectOptions(screen.getByRole('combobox', { name: /Размер страницы/i }), ['20']);
    const currentTasks = within(tasksList).getAllByRole('listitem');
    expect(currentTasks.length).toBe(20);

    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });
    for (let i = 20; i <= 39; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(screen.queryByText(items[40].name)).not.toBeInTheDocument();
    });
  });

  it('Pagination 4', async () => {
    const tasksList = screen.getByRole('list', { name: /Список задач/i });
    expect(tasksList).toBeInTheDocument();

    const currentTasks = within(tasksList).getAllByRole('listitem');
    expect(currentTasks.length).toBe(5);

    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });
    for (let i = 5; i <= 9; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }
    await waitFor(() => {
      expect(screen.queryByText(items[10].name)).not.toBeInTheDocument();
    });

    await userEvent.selectOptions(screen.getByRole('combobox', { name: /Размер страницы/i }), ['50']);
    for (let i = 0; i <= 49; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }

    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });
    for (let i = 50; i <= 99; i += 1) {
      expect(screen.getByText(items[i].name)).toBeInTheDocument();
    }
  });
});

describe('Page work 2', () => {
  const items = [];
  for (let i = 1; i <= 6; i += 1) {
    items.push({ name: `Задача № ${i}`, id: `test_${i}` });
  }

  beforeEach(async () => {
    server.use(
      rest.get('/api/tasks', (req, res, ctx) => res(ctx.json({ items }))),
      rest.post('/api/tasks', (req, res, ctx) => res(ctx.json({ ...req.body, id: uniqueId() }))),
      rest.delete('/api/*', (req, res, ctx) => res(ctx.status(200))),
    );

    const vdom = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    render(vdom);
  });

  it('Work 1', async () => {
    await userEvent.click(screen.getByText('2'));
    await waitFor(() => {
      expect(screen.queryByText(items[0].name)).not.toBeInTheDocument();
    });

    const closeButtons = await screen.findAllByText('×');
    await userEvent.click(closeButtons[0]);
    expect(screen.queryByText(items[0].name)).toBeInTheDocument();
    expect(screen.queryByText(_.last(items).name)).not.toBeInTheDocument();
  });
});
