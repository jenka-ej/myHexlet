# Используя telnet выполните запрос к hexlet.local (расположен на localhost) на порт 8080. 
# Передайте в строке запроса следующие параметры: key равный value и another_key равный another_value. 
# Параметры запроса: метод GET, страница /, протокол HTTP 1.1.

GET /?key=value&another_key=another_value HTTP/1.1
Host: hexlet.local
Connection: close

# __tests__

import fs from 'fs';
import url from 'url';
import httpHeaders from 'http-headers';
import build from '../server/index.js';

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

  it('check version', async () => {
    expect(requestObj.version).toEqual({ major: 1, minor: 1 });
  });

  it('should work', async () => {
    const parts = {
      port: 8080,
      protocol: 'http',
      hostname: 'localhost',
      pathname: requestObj.url,
    };
    const requestUrl = decodeURIComponent(url.format(parts));

    const headers = Object.entries(requestObj.headers)
      .reduce((acc, [header, value]) => (
        { ...acc, [header]: value.split(',').join('; ') }
      ), {});

    const options = {
      headers,
      method: requestObj.method,
      url: requestUrl,
    };

    const { statusCode } = await app.inject(options);

    expect(statusCode).toEqual(200);
  });
});
