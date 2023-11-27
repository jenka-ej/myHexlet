// Перед описанием задания рассмотрим несколько концепций.

// Конфигурация приложения (как существительное) – это различные параметры, которые используются в процессе работы, например, логины, пароли,
// ключи к другим системам и внешним сервисам, адреса, квоты и тому подобные вещи.

// Конфигурация бывает статической (файл с настройками) или динамической. Динамическую конфигурацию, обычно, хранят в системах, подобных consul.
// Это такая распределенная key-value база данных с кучей плюшек.

// key-value означает что эта база данных подобна словарю. В нее можно записать значение по определенному ключу,
// и прочитать это же значение (или перезаписать ее). Основной интерфейс состоит из двух функций set(key, value) и get(key).
// На практике такая база, обычно, предоставляет простой HTTP-интерфейс, в котором GET запрос извлекает данные по ключу, а POST устанавливает значение.

// Под распределенностью понимается то что она автоматически синхронизируется между всеми нодами (машинами, серверами) кластера (группа серверов).
// То есть, если вы делаете изменение в локальной версии базы для конкретного сервера, то через некоторый, как правило,
// очень короткий промежуток времени, это же значение появится и на всех остальных машинах кластера.

// Главная идея в том, что конфигурация обновляется (разными способами) и постоянно актуализируется,
// а приложение каждый раз обращается к этому сервису для получения последних данных.

// В текущем уроке мы будем использовать такой сервис для определения списка урлов, по которым располагается сайт.

// Обращение к консулу для извлечения значения по ключу 'backends'
// get(`http://localhost:5456/backends`);

// Запрос возвращает json следующей структуры:
// [
//   {
//     "url": "http://ru.hexlet.io",
//     "lang": "ru"
//   }, {
//     "url": "http://en.hexlet.io",
//     "lang": "en"
//   }, {
//     "url": "http://gr.hexlet.io",
//     "lang": "gr"
//   }
// ]

// Как видно из структуры, у хекслета есть языковые версии сайтов и их список лежит в консуле под ключем backends.

// Сама задача заключается в следующем. На воображаемом сервисе, который мы разрабатываем, появилась задача определять самый незагруженный поддомен
// (подразумевается, что каждый поддомен обслуживается на своем сервере) и обновлять его в консуле с некоторой периодичностью.

// Процесс описывается следующим алгоритмом:
// 1) Делаем запрос в consul на чтение значения ключа backends и извлекаем список адресов
// 2) Делаем запрос ко всем серверам на статусную страницу (адрес строится так: ${url}/status) для домена ru.hexlet.io это будет ru.hexlet.io/status
// 3) Находим самый незагруженный сервер
// 4) Обновляем запись в consul

// Запрос на статусную страницу возвращает данные в виде json:
// {
//   "workload": "10",
//   "url": "http://ru.hexlet.io"
// }

// Параметр workload означает нагрузку на сервер, чем он меньше, тем нагрузка меньше.
// Для обновления самого незагруженного поддомена в консуле, необходимо выполнить следующий запрос:
// value - это url самого незагруженного поддомена, взятый из json статусной страницы
// post(setCurrentBackendUrl, { value: url });
// post('http://localhost:5456/backends/current', { value: url });
// Этот запрос в консул, устанавливает значение { value: url } по ключу backends/current

// Реализуйте и экспортируйте по умолчанию функцию, которая обновляет значение по ключу backends/current в consul.
// Функция принимает на вход два адреса:
// 1) адрес по которому можно получить список серверов
// 2) адрес для обновления значения текущего незагруженного поддомена (post запросом)

// Функция должна вернуть promise, выполняющий обновление значения по ключу backends/current.
// Функции get() и post() возвращают promise.

import { get, post } from '@hexlet/http-request';

export default function solution(getUrl, postUrl) {
  return get(getUrl)
    .then((response) => Promise.all(JSON.parse(response.data).map(({ url }) => get(`${url}/status`))))
    .then((content) => {
      const minWorkload = content
        .map((response) => JSON.parse(response.data))
        .reduce((acc, data) => {
          if (!acc || data.workload < acc.workload) {
            return data;
          }
          return acc;
        }, null);
      return post(postUrl, { value: minWorkload.url });
    });
}

/* __tests__ */

import nock from 'nock';

import solution from '../solution.js';

nock.disableNetConnect();

const url1 = 'http://ru.hexlet.io';
const url2 = 'http://en.hexlet.io';
const url3 = 'http://gr.hexlet.io';

const consulHost = 'http://localhost:5456';
const setCurrentBackendUrl = `${consulHost}/backends/current`;
const backendsListUrl = `${consulHost}/backends`;

describe('Promise', () => {
  it('set 1', () => {
    const host = 'http://localhost:5456';
    const status = 200;
    nock(host).get('/backends').reply(status, [
      {
        url: 'http://ru.hexlet.io',
        lang: 'ru',
      }, {
        url: 'http://en.hexlet.io',
        lang: 'en',
      }, {
        url: 'http://gr.hexlet.io',
        lang: 'gr',
      },
    ]);

    nock(url1).get('/status').reply(status, {
      workload: 10,
      url: url1,
    });
    nock(url2).get('/status').reply(status, {
      workload: 7,
      url: url2,
    });
    nock(url3).get('/status').reply(status, {
      workload: 9,
      url: url3,
    });

    nock(consulHost).post('/backends/current', { value: url2 }).reply(201);

    const promise = solution(backendsListUrl, setCurrentBackendUrl);
    return expect(promise).resolves.toMatchObject({ status: 201 });
  });
});
