# Выполните авторизацию на сайте hexlet.local (расположен на localhost:8080). 
# Для этого отправьте следующие данные формы: username со значением admin, password со значением secret на урл /session/new. 
# Используйте метод POST и тип application/x-www-form-urlencoded.

POST /session/new HTTP/1.1
Host: hexlet.local
Content-Type: application/x-www-form-urlencoded
Content-Length: 30

username=admin&password=secret

# __tests__

import fs from 'fs';
import url from 'url';
import httpHeaders from 'http-headers';
import httpStringParser from 'http-string-parser';
import build from '../server/index.js';

const { parseRequest } = httpStringParser;

describe('request', () => {
  const app = build();

  const data = fs.readFileSync('solution', 'utf-8');
  const requestObj = httpHeaders(
    data
      .split('\n')
      .map((el) => el.trim())
      .join('\r\n'),
  );

  let options;

  it('check version', async () => {
    expect(requestObj.version).toEqual({ major: 1, minor: 1 });
  });

  it('should work', async () => {
    const { body } = parseRequest(data);

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

    options = {
      headers,
      method: requestObj.method,
      url: requestUrl,
      body: body.trim(),
    };

    const { statusCode } = await app.inject(options);
    expect(statusCode).toEqual(200);
  });

  it('request length', async () => {
    const requestLength = Number(options.headers['content-length']);
    expect(options.body.length).toEqual(requestLength);
  });

  it('content type', async () => {
    const contentType = options.headers['content-type'];
    expect(contentType).toEqual('application/x-www-form-urlencoded');
  });
});
