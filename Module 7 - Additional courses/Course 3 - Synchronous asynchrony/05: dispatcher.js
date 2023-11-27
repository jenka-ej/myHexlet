// В этом упражнении необходимо создать библиотеку для работы с http, которая оборачивает встроенный в node.js модуль http в промисы.
// Интерфейсом библиотеки являются две функции: get и post.

// Определение функции get:
// export const get = (url, config = {}) =>
//   dispatch({ ...config, url, method: 'GET' });

// Использование:
// const host = 'http://ru.hexlet.io';
 
// get('http://ru.hexlet.io').then(response => {
//   console.log(response.status); // 301
// });

// Определение функции post:
// export const post = (url, data, config = {}) =>
//   dispatch({ ...config, url, data, method: 'POST' });
// const data = { nickname: 'scooter' };
// post('https://ru.hexlet.io/users', data).then(response => {
//   console.log(response.status); // 201
// });

// config – это объект со следующей структурой:
// 1) method - глагол http
// 2) data - объект содержащий данные, которые будут отправлены в теле запроса
// 3) url - адрес назначения
// 4) params - параметры, которые будут подставлены в адрес как query params
// 5) headers - заголовки запроса

// response – это тоже объект, состоящий из:
// 1) status - код ответа
// 2) statusText - текст ответа соответствующий коду
// 3) headers - заголовки ответа
// 4) data - тело ответа

// Дополнительной фишкой библиотеки является автоматическое кодирование данных при выполнении post запроса и установка следующих заголовков:
// 1) 'Content-Type': 'application/x-www-form-urlencoded'
// 2) 'Content-Length': ...

// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход конфигурацию запроса (примеры в solution.js) и возвращает промис.
// В промисе должен выполняться запрос, соответствующий параметрам из входной конфигурации.

// Подсказки:
// Документация модуля http - https://nodejs.org/api/http.html.

import http from 'http';
import querystring from 'querystring';

const getSearch = (queryParams, params) => {
  const mergedQuery = { ...queryParams, ...params };
  const keys = Object.keys(mergedQuery);
  const newQueryParams = keys
    .filter((key) => mergedQuery[key] !== null && mergedQuery[key] !== undefined)
    .reduce((acc, key) => ({ ...acc, [key]: mergedQuery[key] }), {});

  return keys.length > 0 ? `?${querystring.stringify(newQueryParams)}` : '';
};

export default function dispatch(options) {
  const {
    params,
    data,
    url,
    method,
  } = options;

  const parsedUrl = new URL(url);
  const queryParams = {};

  parsedUrl.searchParams.forEach((value, name) => {
    queryParams[name] = value;
  });

  new URLSearchParams(getSearch(queryParams, params)).forEach((value, name) => {
    parsedUrl.searchParams.set(name, value);
  });

  function getModifiedResponse(response) {
    return {
      status: response.statusCode,
      statusText: response.statusMessage,
      headers: response.headers,
      data: '',
    };
  }

  function getOptions(currentMethod, currentUrl, currentData) {
    const baseOptions = {
      host: currentUrl.hostname,
      port: currentUrl.port,
      path: `${currentUrl.pathname}${currentUrl.search}`,
      method: currentMethod,
    };
    if (currentMethod === 'GET') {
      return baseOptions;
    }
    return {
      ...baseOptions,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(currentData),
      },
    };
  }

  const postData = new URLSearchParams(data).toString();

  return new Promise((resolve, reject) => {
    const req = http.request(getOptions(method, parsedUrl, postData), (res) => {
      const postResponse = getModifiedResponse(res);

      res.on('data', (chunk) => {
        postResponse.data += chunk;
      }).on('end', () => {
        resolve(postResponse);
      });
    });
    req.on('error', () => {
      reject();
    });
    req.end(postData);
  });
}

/* solution.js */

import dispatch from './dispatcher.js';

export const get = (url, config = {}) => dispatch({ ...config, url, method: 'GET' });
export const post = (url, data, config = {}) => dispatch({
  ...config,
  url,
  data,
  method: 'POST',
});

export default { get, post };

/* __tests__ */

import url from 'url';
import querystring from 'querystring';
import nock from 'nock';

import { get, post } from '../solution';

nock.disableNetConnect();

describe('HttpRequestPromise', () => {
  it('#get', async () => {
    const host = 'http://ru.hexlet.io';
    const status = 301;
    nock(host).get('/').reply(status);

    const response = await get(host);
    expect(response.status).toBe(status);
  });

  it('#get with params', async () => {
    const params = { a: 'v', d: 'k' };
    const host = 'http://ru.hexlet.io';
    const body = 'hello, world';
    nock(host)
      .get('/')
      .query(params)
      .reply(200, body);

    const response = await get(host, { params });
    expect(response.data).toBe(body);
  });

  it('#get with params and query', async () => {
    const params = { a: 'v', d: 'k' };
    const q = 'index';
    const host = 'http://ru.hexlet.io';
    const hostWithQuery = url.resolve(host, `/?q=${q}`);
    const body = 'hello, world';
    nock(host)
      .get('/')
      .query({ q, ...params })
      .reply(200, body);

    const response = await get(hostWithQuery, { params });
    expect(response.data).toBe(body);
  });

  it('#get 2', async () => {
    const host = 'http://ru.hexlet.io';
    const pathname = '/users/new';
    const body = 'hello, world';
    nock(host).get(pathname).reply(200, body);

    const response = await get(`${host}${pathname}`);
    expect(response.data).toBe(body);
  });

  it('#get 3', async () => {
    const host = 'http://ru.hexlet.io';
    const pathname = '/users/new';
    nock(host).get(pathname).replyWithError('timeout error');

    try {
      await get(`${host}${pathname}`);
      expect(false).toBe(true);
    } catch (e) {
      // everything is good
    }
  });

  it('#post', async () => {
    const host = 'http://ru.hexlet.io';
    const pathname = '/users';
    const data = { nickname: 'scooter' };
    const preparedData = querystring.stringify(data);
    const status = 302;
    nock(host, {
      reqheaders: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(preparedData),
      },
    }).post(pathname, preparedData).reply(status, data);

    const response = await post(`${host}${pathname}`, data);
    expect(response.status).toBe(status);
    expect(response).toHaveProperty('data', JSON.stringify(data));
  });
});
