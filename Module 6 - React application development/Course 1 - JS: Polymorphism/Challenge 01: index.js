// В JavaScript для запросов по сети обычно используется один из HTTP-клиентов - fetch или axios.
// Они появились в разное время и имеют разные интерфейсы и форматы ответов.
// В этом упражнении нам предстоит разработать свой адаптер над этими клиентами.
// Его интерфейс будет от axios, а формат ответов от fetch.
// Важно: решите это упражнение без использования классов

// import createHttpClient from './src/index.js';
 
// const httpClient = createHttpClient('axios');
// клиент создаётся как инстанс axios
// const instance = httpClient({ baseURL: 'http://localhost:8080' }); // axios.create(config)
// клиент содержит методы, подобно axios
// const response = await instance.post('/students', { username: 'hello', password: 'world' }); // axios.post(url, data)
// get-запрос с query string на http://site.com/user?username=hello
// const userNames = await instance.get('/students', { params: { partOfName: 'hel' } }); // axios.get(url, params)
// ошибки с сайта не выбрасываются, а считаются валидным ответом. Как в fetch
// const failedRequest = await instance.post('/students', { username: 'foo' }, { returnUsers: true }); // axios.post(url, data, params)
 
// ответы от клиента подобны fetch
// console.log(response.ok); // => true
// console.log(response.status); // => 201
// console.log(userNames.ok); // => true
// console.log(userNames.status); // => 200
// await userNames.json(); // ['hello']
 
// console.log(failedRequest.ok); // => false
// console.log(failedRequest.status); // => 400
// await failedRequest.text(); // "Не указано имя или пароль"

// Реализуйте и экспортируйте по умолчанию функцию, возвращающую адаптер HTTP-клиента по его названию.

// Реализуйте обработчик ответа для axios и два метода HTTP-клиента: post, patch.
// Обработчик ответа должен возвращать объект, аналогичный ответу fetch, со следующими свойствами:
// ok - результат выполнения запроса
// status - код HTTP-ответа
// json() - функция, возвращающая Promise. После его разрешения отдаётся JSON-ответ ресурса (body)
// text() - функция, возвращающая Promise. После его разрешения отдаётся текстовый ответ ресурса (body)

// Реализуйте обработчик параметров запроса для fetch и два метода HTTP-клиента: post, patch.
// Каждый метод принимает параметры запроса по интерфейсу axios, необходимо взять из него нужные данные, 
// корректно сформировать query string, body и устанавливать правильный HTTP-метод.

import fetchAdapter from './fetchAdapter.js';
import axiosAdapter from './axiosAdapter.js';

export default (httpAdapter) => {
  switch (httpAdapter) {
    case 'axios':
      return axiosAdapter;
    case 'fetch':
      return fetchAdapter;
    default:
      return null;
  }
};

/* axiosAdapter.js */

import axios from 'axios';

const axiosAdapter = (config) => {
  const instance = axios.create(config);

  const processResult = async (method) => {
    let result;
    try {
      result = await method;
    } catch (error) {
      return {
        ok: false,
        status: 400,
        text: async () => error.response.data,
      };
    }
    return {
      ok: result.status !== 400,
      status: result.status,
      json: async () => result.data,
      text: async () => result.data.toString(),
    };
  };

  return {
    get: (route, params) => processResult(instance.get(route, params)),
    delete: (route, params) => processResult(instance.delete(route, params)),
    post: (route, params, options) => processResult(instance.post(route, params, options)),
    patch: (route, params, options) => processResult(instance.patch(route, params, options)),
  };
};

export default axiosAdapter;

/* fetchAdapter.js */

import fetch from 'node-fetch';

const fetchAdapter = (config) => {
  const { baseURL } = config;
  const prepareUrl = (route, params = '') => `${baseURL}${route}?${new URLSearchParams(params)}`;

  return {
    get: (route, { params, ...options }) => fetch(prepareUrl(route, params), options),
    delete: (route, { params, ...options }) => fetch(prepareUrl(route, params), {
      method: 'DELETE',
      ...options,
    }),
    post: async (route, options, data) => {
      const { params } = data;
      const response = await fetch(prepareUrl(route), {
        method: 'POST',
        body: JSON.stringify({ ...options, ...params }),
      });
      return response;
    },
    patch: async (route, options, data) => {
      const { params } = data;
      const response = await fetch(prepareUrl(route), {
        method: 'PATCH',
        body: JSON.stringify({ ...options, ...params }),
      });
      return response;
    },
  };
};

export default fetchAdapter;

/* app.js */

import yup from 'yup';
/* eslint-disable no-template-curly-in-string */

const createApp = () => {
  const database = {
    students: [],
  };

  // partOfName приходит в query string
  const get = ({ partOfName = '' }) => {
    const filtered = database.students.filter((student) => student.username.includes(partOfName));
    return filtered.map(({ username }) => username);
  };

  // username приходит в query string
  const remove = ({ username }) => {
    database.students = database.students.filter((student) => student.username !== username);
  };

  // returnUsers приходит в query string, а username и password в теле запроса
  const add = (newStudent) => {
    const { username, password, returnUsers } = yup.object().shape({
      username: yup.string().required()
        .test(
          'already exists',
          'Student with name "${originalValue}" already exists',
          (name) => !database.students.some((user) => user.username === name),
        ),
      password: yup.string().required('Password is a required field'),
      returnUsers: yup.boolean().optional().default(false),
    }).validateSync(newStudent);

    database.students = database.students.concat({ username, password });
    return (returnUsers) ? get({}) : null;
  };

  // validate приходит в query string, а username и password в теле запроса
  const update = ({ username, password, validate }) => {
    const user = database.students.find((student) => student.username === username);

    yup.object().shape({
      username: yup.string().required('')
        .test(
          'not found',
          'Student with name "${originalValue}" not found',
          () => user,
        ),
      validate: yup.boolean().optional().default(false),
      password: yup.string().when('validate', {
        is: true,
        then: yup.string().required()
          .test(
            'password is identical',
            'The new password is identical to the old one',
            (newPassword) => user.password !== newPassword,
          ),
        otherwise: yup.string().required(),
      }),
    }).validateSync({ username, password, validate });

    user.password = password;
  };

  return {
    get,
    add,
    update,
    remove,
  };
};

export default createApp;

/* __tests__ */

import nock from 'nock';
import createHttpClient from '../src/index.js';
import createApp from '../src/app.js';

const createRequestParams = (data = null, params = {}) => ((data === null)
  ? [{ params }, {}]
  : [data, { headers: { 'Content-Type': 'application/json' }, params }]);

const positiveCases = [
  ['get', ...createRequestParams(), // первая строка - название метода и передаваемые параметры (body, query string, headers)
    { ok: true, status: 200, data: [] }], // вторая строка - ожидаемый ответ
  ['post', ...createRequestParams({ username: 'hello', password: 'world' }),
    { ok: true, status: 201, data: [] }],
  ['get', ...createRequestParams(),
    { ok: true, status: 200, data: ['hello'] }],
  ['patch', ...createRequestParams({ username: 'hello', password: 'kitty' }),
    { ok: true, status: 201, data: [] }],
  ['get', ...createRequestParams(),
    { ok: true, status: 200, data: ['hello'] }],
  ['post', ...createRequestParams({ username: 'foo', password: 'bar' }, { returnUsers: true }),
    { ok: true, status: 200, data: ['hello', 'foo'] }],
  ['get', ...createRequestParams(null, { partOfName: 'foo' }),
    { ok: true, status: 200, data: ['foo'] }],
  ['get', ...createRequestParams(null, { partOfName: 'bar' }),
    { ok: true, status: 200, data: [] }],
  ['delete', ...createRequestParams(null, { username: 'hello' }),
    { ok: true, status: 201, data: [] }],
  ['get', ...createRequestParams(),
    { ok: true, status: 200, data: ['foo'] }],
];

const negativeCases = [
  ['post', ...createRequestParams({ username: 'foo' }),
    { ok: false, status: 400, data: 'Password is a required field' }],
  ['post', ...createRequestParams({ username: 'foo', password: 'bar' }),
    { ok: false, status: 400, data: 'Student with name "foo" already exists' }],
  ['patch', ...createRequestParams({ username: 'foo', password: 'bar' }, { validate: true }),
    { ok: false, status: 400, data: 'The new password is identical to the old one' }],
  ['patch', ...createRequestParams({ username: 'hello', password: 'kitty' }),
    { ok: false, status: 400, data: 'Student with name "hello" not found' }],
];

const baseURL = 'http://site.com';
const route = '/students';
const clients = [
  'fetch',
  'axios',
];

describe.each(clients)('Positive cases: %s', (clientName) => {
  beforeAll(() => {
    const scope = nock(baseURL).persist();

    const app = createApp();
    const map = {
      GET: app.get,
      POST: app.add,
      PATCH: app.update,
      DELETE: app.remove,
    };

    const bodyParser = {
      string: (body) => JSON.parse(body || '{}'), // fetch требует приводить body к строке
      object: (body) => body,
    };
    Object.entries(map)
      .forEach(([method, handler]) => {
        scope
          .intercept(route, method)
          .query(true)
          .reply((uri, body) => {
            try {
              // query string является частью uri
              const query = Object.fromEntries(new URL(uri, baseURL).searchParams);
              const parsedBody = bodyParser[typeof body](body);
              const result = handler({ ...parsedBody, ...query });
              return result ? [200, result] : [201, []];
            } catch (err) {
              return [400, err.message];
            }
          });
      });
  });

  afterAll(() => nock.cleanAll());

  const httpClient = createHttpClient(clientName);
  const instance = httpClient({ baseURL });

  test.each(positiveCases)(`correct %s ${route} with %o`, async (method, body, params, expected) => {
    const response = await instance[method](route, body, params);
    const { ok, status } = response;
    const actual = response.json().then((data) => ({ ok, status, data }));
    await expect(actual).resolves.toEqual(expected);
  });

  test.each(negativeCases)(`incorrect %s ${route} with %o`, async (method, body, params, expected) => {
    const response = await instance[method](route, body, params);
    const { ok, status } = response;
    // ошибки с сервера, например, 400 Bad Request попадают в then
    const actual = response.text().then((data) => ({ ok, status, data }));
    await expect(actual).resolves.toEqual(expected);
  });
});
