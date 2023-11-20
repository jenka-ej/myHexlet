// В сети существует множество видов атак на посетителей веб-сайтов, которые могут привести к утечке персональных данных,
// различных доступов и даже к выполнению несанкционированных действий. Один из таких видов называется CSRF (Межсайтовая подделка запроса).

// Если жертва заходит на сайт, созданный злоумышленником, от её лица тайно отправляется запрос на другой сервер (например, 
// на сервер платёжной системы), осуществляющий некую вредоносную операцию (например, перевод денег на счёт злоумышленника).
// Для осуществления данной атаки жертва должна быть аутентифицирована на том сервере, на который отправляется запрос,
// и этот запрос не должен требовать какого-либо подтверждения со стороны пользователя, который не может быть проигнорирован или подделан атакующим скриптом.

// Основное применение CSRF — вынуждение выполнения каких-либо действий на уязвимом сайте от лица жертвы
// (изменение пароля, секретного вопроса для восстановления пароля, почты, добавление администратора и т. д.)

// Один из способов защиты, это использование специального токена, который генерируется для каждой страницы и отправляется с формами на сервер,
// при выполнении потенциально опасных действий.

// Реализуйте и экспортируйте по умолчанию функцию, которая с помощью http запросов, эмулируя поведение пользователя, выполняет регистрацию на сайте.

// Функция принимает на вход четыре параметра:
// 1) Адрес формы регистрации (get запрос)
// 2) Адрес по которому необходимо отправить данные формы (post запрос)
// 3) nickname - значение поля nickname из формы регистрации
// 4) Коллбек, который будет вызван после окончания операции. Коллбек принимает на вход единственный параметр - err в случае если произошла ошибка

// import request from '../solution';
 
// const registrationFormUrl = 'http://localhost:8080';
// const submitFormUrl = 'http://localhost:8080/users';
// const nickname = 'legolas';
// request(registrationFormUrl, submitFormUrl, nickname, (err) => {
//   // ...
// });

// На сайте реализована защита от csrf, поэтому перед непосредственной отправкой данных формы на соответствующий адрес,
// необходимо сделать запрос на форму регистрации, извлечь из нее токен и отправить его вместе с данными формы по нужному адресу.

// В упражнении доступен веб-доступ, по которому открывается этот сайт. Попробуйте посмотреть исходный код страницы, найти там этот токен,
// а так же выполните регистрацию.

// В случае если первый запрос вернет статус не 200, то вызываем коллбек и передаем туда ошибку.
// В случае если второй запрос вернет статус не 302, то так же вызываем коллбек и передаем ошибку.

// Для извлечения токена из тела запроса, воспользуйтесь функцией getToken().

import http from 'http';

const getToken = (body) => body.match(/value="(\w+)"/)[1];

export default (registrationFormUrl, submitFormUrl, nickname, callback) => {
  http.get(registrationFormUrl, (res) => {
    if (res.statusCode !== 200) {
      callback(new Error(`Await status code 200, but received ${res.statusCode}`));
      return;
    }
    const body = [];
    res.on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      const html = body.join();
      const parsedSubmitUrl = new URL(submitFormUrl);
      const postData = new URLSearchParams({ nickname, token: getToken(html) }).toString();
      const options = {
        host: parsedSubmitUrl.hostname,
        port: parsedSubmitUrl.port,
        path: parsedSubmitUrl.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData),
        },
      };
      const req = http.request(options, (res2) => {
        if (res2.statusCode !== 302) {
          callback(new Error(`Await status code 302, but received ${res2.statusCode}`));
          return;
        }
        callback(null);
      });
      req.end(postData);
    });
  });
};

/* __tests__ */

import crypto from 'crypto';

import solution from '../solution.js';

describe('Request', () => {
  it('set 1', () => {
    const registrationFormUrl = 'http://localhost:8080';
    const submitFormUrl = 'http://localhost:8080/users';
    const nickname = crypto.randomBytes(16).toString('hex');
    return new Promise((done) => {
      solution(registrationFormUrl, submitFormUrl, nickname, (err) => {
        expect(err).toBeNull();
        done();
      });
    });
  });

  it('set 2', () => {
    const registrationFormUrl = 'http://localhost:8080/wrong';
    const submitFormUrl = 'http://localhost:8080/users';
    const nickname = crypto.randomBytes(16).toString('hex');
    return new Promise((done) => {
      solution(registrationFormUrl, submitFormUrl, nickname, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });

  it('set 3', () => {
    const registrationFormUrl = 'http://localhost:8080';
    const submitFormUrl = 'http://localhost:8080/userstest';
    const nickname = crypto.randomBytes(16).toString('hex');
    return new Promise((done) => {
      solution(registrationFormUrl, submitFormUrl, nickname, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });
});
