// Реализуйте логику работы сервиса. Под сервисом здесь понимается класс, умеющий работать с конкретным сервисом погоды (в интернете их довольно много). 
// В перспективе классов может быть много и они могут подменять друг друга (то есть обеспечивать полиморфизм).
// Объект этого класса должен уметь запрашивать данные у сервера (адрес выше) по конкретному городу и возвращать их обратно.
// Для извлечения данных о погоде, ему нужно выполнить http-запрос. Для выполнения подобных запросов понадобится http-клиент, библиотека, 
// которая сама формирует правильный http-запрос и возвращает ответ. В нашем случае используется axios, наиболее популярный http-клиент в JavaScript-мире.
// Сделайте так, чтобы http-клиент не был зашит внутри класса, используйте инъекцию зависимостей для проброса клиента во внутрь. 
// Потенциально это позволит подменить реализацию http-клиента (то есть использовать другой клиент), без необходимости переписывать код сервиса.

const apiUrl = 'http://localhost:8080/api/v2/';

export default class WeatherService {
  constructor(service, city) {
    this.http = `${apiUrl}cities/${city}`;
    this.service = service;
  }

  async get() {
    const promise1 = Promise.resolve(this.service.get(this.http));
    return promise1.then((response) => response);
  }
}

/* __tests__ */

import { execSync } from 'child_process';
import { URL } from 'url';
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const binPath = path.join(dirname, '..', 'bin/weather.js');

test('berlin', () => {
  const expected = expect.stringMatching(/Temperature in berlin: \d+C/);
  const actual = execSync(`node ${binPath} berlin`).toString();
  expect(actual).toEqual(expected);
});

test('monaco', () => {
  const expected = expect.stringMatching(/Temperature in monaco: \d+C/);
  const actual = execSync(`node ${binPath} monaco`).toString();
  expect(actual).toEqual(expected);
});
