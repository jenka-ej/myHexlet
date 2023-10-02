# Используя telnet выполните запрос к ресурсу, расположенному на localhost, c целевым хостом hexlet.local на порту 8080.
# Параметры запроса: метод GET, страница /users, протокол HTTP 1.1
# Изучите тело ответа. Это должна быть JSON строка со списком пользователей
# Запишите ваш HTTP-запрос в файл solution

GET /users HTTP/1.1
Host: hexlet.local
Conenection: close

# __tests__

import fs from 'fs';
import url from 'url';
import path from 'path';
import httpHeaders from 'http-headers';
import build from '../server/index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('get users json', async () => {
  const app = build();

  const data = fs.readFileSync('solution', 'utf-8');
  const requestObj = httpHeaders(
    data
      .split('\n')
      .map((el) => el.trim())
      .join('\r\n'),
  );

  const { headers: { host } } = requestObj;
  expect(host).toEqual('hexlet.local');

  expect(requestObj.version).toEqual({ major: 1, minor: 1 });

  const parts = {
    port: 8080,
    protocol: 'http',
    hostname: 'localhost',
    pathname: requestObj.url,
  };
  const requestUrl = url.format(parts);

  const headers = Object.entries(requestObj.headers)
    .reduce((acc, [header, value]) => (
      { ...acc, [header]: value.split(',').join('; ') }
    ), {});

  const options = {
    headers,
    method: requestObj.method,
    url: requestUrl,
  };

  const {
    raw: { req },
    statusCode: status,
    statusMessage: statusText,
    body: users,
  } = await app.inject(options);

  const { method } = req;
  const result = { method, status, statusText };
  expect(result).toMatchObject({ status: 200, method: 'GET' });

  const actualUsers = JSON.parse(users);
  const expectedUsers = JSON.parse(readFixture('users.json'));

  expect(actualUsers).toEqual(expectedUsers);
});
