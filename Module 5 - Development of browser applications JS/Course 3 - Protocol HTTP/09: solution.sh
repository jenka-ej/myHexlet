# Используя telnet авторизуйтесь на hexlet.local (расположен на localhost:8080). 
# Параметры запроса: метод GET, страница /admin, протокол HTTP 1.1, имя пользователя Aladdin, пароль open sesame.
# Для кодирования логина и пароля используйте следующую команду в терминале: printf 'username:password' | base64.

GET /admin HTTP/1.1
Host: hexlet.local
Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==

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
    const requestUrl = url.format(parts);

    const headers = Object.entries(requestObj.headers)
      .reduce((acc, [header, value]) => (
        { ...acc, [header]: value.split(',').join('; ') }
      ), {});

    const { host } = headers;
    expect(host).toEqual('hexlet.local');

    const options = {
      headers,
      method: requestObj.method,
      url: requestUrl,
    };

    const { statusCode } = await app.inject(options);

    expect(statusCode).toEqual(200);
  });
});
