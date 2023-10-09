# Сервер в упражнении ведёт себя подобно dummyJSON. В реальности данные не изменяются, но в HTTP-ответе приходит JSON с изменённым комментарием.

# Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080.
# Параметры запроса: метод GET, страница /comments, протокол HTTP 1.1. Найдите в списке комментариев, комментарий с текстом: "Edit me!"
# Выполните PATCH-запрос и измените текст этого комментария на "I got it!".
# Запишите запрос, который изменяет комментарий, в файл solution.

PATCH /comments/3 HTTP/1.1
HOST: hexlet.local
Content-Length: 23
Content-Type: application/json

{ "text": "I got it!" }

# __tests__

import fs from 'fs';
import url from 'url';
import path from 'path';
import httpHeaders from 'http-headers';
import parser from 'http-string-parser';
import build from '../server/index.js';

const { parseRequest } = parser;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

describe('request', () => {
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
  
  const { body } = parseRequest(data);

  let options;

  it('check version', async () => {
    expect(requestObj.version).toEqual({ major: 1, minor: 1 });
  });

  it('get updated comment', async () => {
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

    options = {
      headers,
      method: requestObj.method,
      url: requestUrl,
      body: body.trim(),
    };

    const {
      raw: { req },
      statusCode: status,
      statusMessage: statusText,
      body: comment,
    } = await app.inject(options);

    const { method } = req;
    const result = { method, status, statusText };
    expect(result).toMatchObject({ status: 200, method: 'PATCH' });

    const actualComment = JSON.parse(comment);
    const expectedComment = JSON.parse(readFixture('comment.json'));
    expect(actualComment).toEqual(expectedComment);
  });

  it('check request body length', async () => {
    const requestLength = Number(options.headers['content-length']);
    expect(options.body.length).toEqual(requestLength);
  });
});
