// Эта задача полностью повторяет задачу про CSRF. Цель – увидеть катастрофическую разницу между использованием коллбеков и async/await.

// Для выполнения http запросов воспользуйтесь импортированными функциями из библиотеки hexlet-http-request, которую мы реализовывали в одном из уроков.

// Реализуйте и экспортируйте по умолчанию функцию, которая с помощью http запросов, эмулируя поведение пользователя, выполняет регистрацию на сайте.

// Функция принимает на вход следующие параметры:
// 1) Адрес формы регистрации (get запрос)
// 2) Адрес, по которому необходимо отправить данные формы (post запрос)
// 3) nickname - значение поля nickname из формы регистрации

// На сайте реализована защита от csrf, поэтому перед непосредственной отправкой данных формы на соответствующий адрес необходимо сделать
// запрос на форму регистрации, извлечь из нее токен и отправить его вместе с данными формы по нужному адресу.

// В упражнении доступен веб-доступ, по которому открывается этот сайт. Попробуйте посмотреть исходный код страницы, найти там этот токен,
// а так же выполните регистрацию.

// Обработка ошибок:
// 1) В случае, если первый запрос вернет статус не 200, то бросаем исключение с ошибкой
// 2) В случае, если второй запрос вернет статус не 302, то также брсоаем исключение с ошибкой

// Для извлечения токена из тела запроса воспользуйтесь функцией getToken()

import { get, post } from '@hexlet/http-request';

const getToken = (body) => body.match(/value="(\w+)"/)[1];

export default async function solution(getUrl, postUrl, nickname) {
  const getRes = await get(getUrl);
  if (getRes.status !== 200) {
    throw new Error(`GET request failed with status ${getRes.status}`);
  }
  const params = { token: getToken(getRes.data), nickname };
  const postRes = await post(postUrl, params);
  if (postRes.status !== 302) {
    throw new Error(`POST request failed with status ${postRes.status}`);
  }
}

/* __tests__ */

import crypto from 'crypto';

import solution from '../solution.js';

describe('Request', () => {
  it('set 1', async () => {
    const registrationFormUrl = 'http://localhost:8080';
    const submitFormUrl = 'http://localhost:8080/users';
    const nickname = crypto.randomBytes(16).toString('hex');
    const fn = () => solution(registrationFormUrl, submitFormUrl, nickname);
    await expect(fn()).resolves.toBeUndefined();
  });

  it('set 2', async () => {
    const registrationFormUrl = 'http://localhost:8080/wrong';
    const submitFormUrl = 'http://localhost:8080/users';
    const nickname = crypto.randomBytes(16).toString('hex');
    const fn = () => solution(registrationFormUrl, submitFormUrl, nickname);
    await expect(fn()).rejects.toThrow(Error);
  });

  it('set 3', async () => {
    const registrationFormUrl = 'http://localhost:8080';
    const submitFormUrl = 'http://localhost:8080/userstest';
    const nickname = crypto.randomBytes(16).toString('hex');
    const fn = () => solution(registrationFormUrl, submitFormUrl, nickname);
    await expect(fn()).rejects.toThrow(Error);
  });
});
