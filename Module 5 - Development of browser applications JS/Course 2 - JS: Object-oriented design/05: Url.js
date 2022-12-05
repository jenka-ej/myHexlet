// Реализуйте и экспортируйте по умолчанию класс для работы с HTTP-адресом. Класс должен содержать конструктор и методы:
// 1) Конструктор — принимает на вход HTTP-адрес в виде строки
// 2) getScheme() — возвращает протокол передачи данных (без двоеточия)
// 3) getHostName() — возвращает имя хоста
// 4) getQueryParams() — возвращает параметры запроса в виде пар ключ-значение объекта
// 5) getQueryParam() — получает значение параметра запроса по имени. Если параметр с переданным именем не существует, 
// метод возвращает значение заданное вторым параметром (по умолчанию равно null)
// 6) equals(url) — принимает объект класса Url и возвращает результат сравнения с текущим объектом — true или false

export default class Url {
  constructor(url) {
    this.url = url;
  }

  getUrl() {
    return this.url;
  }

  getScheme() {
    const url = new URL(this.url);
    return url.protocol.substring(0, url.protocol.length - 1);
  }

  getHostName() {
    const url = new URL(this.url);
    return url.hostname;
  }

  getQueryParams() {
    const url = new URL(this.url);
    const query = url.search.substring(1, url.search.length).split('&');
    const queryMass = query.map((item) => item.split('='));
    const queryObj = queryMass.reduce((acc, item) => {
      const [key, value] = item;
      acc[key] = value;
      return acc;
    }, {});
    return queryObj;
  }

  getQueryParam(key, value = null) {
    const url = new Url(this.url);
    const obj = url.getQueryParams();
    if (obj[key] === undefined) {
      return value;
    }
    return obj[key];
  }

  equals(url) {
    return this.url === url.getUrl();
  }
}

/* __tests__ */

import Url from '../Url.js';

const yandexUrl = 'http://yandex.ru?key=value&key2=value2';
const googleUrl = 'https://google.com:80?a=b&c=d&lala=value';

test('yandex', () => {
  const url = new Url(yandexUrl);

  expect(url.getScheme()).toEqual('http');
  expect(url.getHostName()).toEqual('yandex.ru');
  const params = {
    key: 'value',
    key2: 'value2',
  };
  expect(url.getQueryParams()).toEqual(params);
  expect(url.getQueryParam('key')).toEqual('value');
  expect(url.getQueryParam('key2', 'lala')).toEqual('value2');
  expect(url.getQueryParam('new', 'ehu')).toEqual('ehu');
  expect(url.equals(new Url(yandexUrl))).toBe(true);
  expect(url.equals(new Url(googleUrl))).toBe(false);
});

test('google', () => {
  const url = new Url(googleUrl);

  expect(url.getScheme()).toEqual('https');
  expect(url.getHostName()).toEqual('google.com');
  const params = {
    a: 'b',
    c: 'd',
    lala: 'value',
  };
  expect(url.getQueryParams()).toEqual(params);
  expect(url.getQueryParam('key')).toBeNull();
  expect(url.equals(new Url(googleUrl))).toBe(true);
  expect(url.equals(new Url('https://google.com'))).toBe(false);
  expect(url.equals(new Url(googleUrl.replace('80', '443')))).toBe(false);
});
