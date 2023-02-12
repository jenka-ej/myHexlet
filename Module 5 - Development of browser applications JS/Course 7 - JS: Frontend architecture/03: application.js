// Реализуйте и экспортируйте функцию по умолчанию, которая создает на странице TODO-приложение. 
// Это приложение состоит из формы добавления (уже есть на странице) и списка задач добавленных через форму. 
// Каждая новая задача выводится первой в списке добавленных ранее задач.

// Начальный HTML:

// <div class="container m-3">
//   <form class="form-inline">
//     <input type="text" required="required" class="form-control mr-3" name="name">
//     <button type="submit" class="btn btn-primary mr-3">add</button>
//   </form>
//   <ul id="tasks" class="list-group" aria-label="Tasks"></ul>
// </div>

// После добавления двух задач:

// <div class="container m-3">
//   <form class="form-inline">
//     <input type="text" required="required" class="form-control mr-3" name="name">
//     <button type="submit" class="btn btn-primary mr-3">add</button>
//   </form>
//   <ul id="tasks" class="list-group" aria-label="Tasks">
//     <li class="list-group-item">Вторая задача</li>
//     <li class="list-group-item">Первая задача</li>
//   </ul>
// </div>

// У нашего TODO-приложения есть бэкенд. Этот бэкенд умеет получать новые задачи и возвращать список ранее добавленных задач.

// import axios from 'axios';
 
// Список добавленных задач GET
// const response = await axios.get(routes.tasksPath());
// response.data содержит объект: { items: [{ name: 'имя задачи' }, { ... }]  }
 
// Добавление новой задачи POST
// const response = await axios.post(routes.tasksPath(), data); // Где data это { name: 'имя задачи' }
// response.status содержит 201 в случае успеха

// Во время инициализации (внутри функции), приложение должно делать запрос на сервер, извлекать оттуда уже добавленные задачи и выводить их на экран. 
// Во время добавления новой задачи, приложение должно выполнять запрос на добавление задачи на сервер.

import axios from 'axios';

const routes = {
  tasksPath: () => '/api/tasks',
};

export default async function fn() {
  const state = {
    newTask: {
      name: '',
    },
  };
  const tasks = document.querySelector('#tasks');

  const getTasks = async () => {
    const response = await axios.get(routes.tasksPath());
    response.data.items.map((item) => {
      const task = item.name;
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
      liEl.textContent = task;
      tasks.append(liEl);
      return null;
    });
  };
  await getTasks();

  const getLastTask = (lastTask) => {
    const liEl = document.createElement('li');
    liEl.classList.add('list-group-item');
    liEl.textContent = lastTask;
    tasks.prepend(liEl);
  };

  const input = document.querySelector('input');
  input.addEventListener('keyup', (e) => {
    const inputValue = e.target.value;
    state.newTask.name = inputValue;
  });

  const send = document.querySelector('button');
  send.addEventListener('click', async (e) => {
    e.preventDefault();
    await axios.post(routes.tasksPath(), state.newTask);
    document.querySelector('.form-inline').reset();
    getLastTask(state.newTask.name);
  });
}

/* __tests__ */

import { Polly } from '@pollyjs/core';
import NodeHttpAdapter from '@pollyjs/adapter-node-http';
import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen, waitFor, within } = testingLibraryDom;

const tasksList = () => screen.getByRole('list', { name: 'Tasks' });

const initialData = { items: [] };

Polly.register(NodeHttpAdapter);
let data;
let polly;

beforeAll(() => {
  polly = new Polly('rest api', {
    adapters: ['node-http'], // Hook into `fetch`
    mode: 'passthrough',
    flushRequestsOnStop: true,
    logLevel: 'warn',
  });

  const { server } = polly;
  server
    .get('http://localhost/api/tasks')
    .intercept((req, res) => {
      res.status(200).json(data);
    });
  server
    .post('http://localhost/api/tasks')
    .intercept((req, res) => {
      data.items.unshift(JSON.parse(req.body));
      res.status(201).json({ message: 'Success!' });
    });
  server
    .get('http://localhost/*')
    .intercept((req, res) => {
      res.status(404);
      // eslint-disable-next-line
      console.error(
        'Found an unhandled %s request to %s',
        req.method,
        req.url,
      );
    });
});

afterAll(async () => {
  await polly.stop();
});

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  data = initialData;
});

test('backend with tasks', async () => {
  const task1 = { name: 'task one' };
  const task2 = { name: 'task two' };
  data = { items: [task1, task2] };
  await run();

  const { getAllByRole } = within(tasksList());
  const items = getAllByRole('listitem');
  const list = items.map((item) => item.textContent);

  expect(list).toEqual(['task one', 'task two']);
  items.forEach((item) => expect(item).toHaveClass('list-group-item'));
});

test('working process', async () => {
  await run();

  const submit = await screen.findByRole('button', { name: /add/i });
  const input = await screen.findByRole('textbox');

  await userEvent.type(input, 'new task');
  await userEvent.click(submit);

  await waitFor(() => {
    const { getAllByRole } = within(tasksList());
    const items = getAllByRole('listitem');
    const list = items.map((item) => item.textContent);

    expect(list).toEqual(['new task']);
    expect(data.items[0]).toEqual({ name: 'new task' });
  });

  await userEvent.clear(input);
  await userEvent.type(input, 'another task');
  await userEvent.click(submit);

  await waitFor(() => {
    const { getAllByRole } = within(tasksList());
    const items = getAllByRole('listitem');
    const list = items.map((item) => item.textContent);

    expect(list).toEqual(['another task', 'new task']);
    expect(data.items[0]).toEqual({ name: 'another task' });
    items.forEach((item) => expect(item).toHaveClass('list-group-item'));
  });
});
