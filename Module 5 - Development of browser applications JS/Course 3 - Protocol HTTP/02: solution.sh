# Используя программу telnet, выполните запрос к localhost на порт 8080 в терминале онлайн редактора. 
# Параметры запроса: метод get, страница /about, протокол http 1.0.
# Запишите ваш HTTP-запрос в файл solution (Запуск telnet, сам по себе, никак не связан с HTTP).

GET /about HTTP/1.0

# __tests__

import fs from 'fs';
import url from 'url';
import httpHeaders from 'http-headers';
import build from '../server/index.js';

test('should work', async () => {
  const app = build();

  const data = fs.readFileSync('solution', 'utf-8');
  const requestObj = httpHeaders(data);

  const parts = {
    port: 8080,
    protocol: 'http',
    hostname: 'localhost',
    pathname: requestObj.url,
  };
  const requestUrl = url.format(parts);

  const options = {
    headers: requestObj.headers,
    method: requestObj.method,
    url: requestUrl,
  };

  const {
    raw: { req },
    statusCode: status,
  } = await app.inject(options);

  const { method } = req;
  const result = { method, status };
  expect(result).toMatchObject({ status: 200, method: 'GET' });
});
