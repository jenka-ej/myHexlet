// Асинхронные задачи имеют свойство заканчиваться с ошибками. Иногда эти ошибки плавающие и пропадают при повторных выполнениях кода,
// чем некоторые разработчики активно пользуются. С одной стороны можно вызов повторить самостоятельно, с другой,
// достаточно написать обобщенную функцию, которая, в случае ошибок, повторяет нужный асинхронный вызов, столько раз, сколько попросят.

// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход три аргумента:
// 1) Количество попыток асинхронного вызова в случае ошибок
// 2) Функция выполняющая асинхронную задачу. Она должна принимать на вход коллбек, который вызывается внутри (так callback(err, body))
// и сигнализирует об успешном или ошибочном завершении
// 3) Коллбек, который будет вызван после того как функция закончит свою работу. Она принимает на вход ошибку и тело ответа

// Логика работы функции следующая:
// 1) Вызывается функция выполняющая асинхронную операцию. Если она выполнилась успешно,
// то функция завершает работу вызывая колбек переданный последним параметром
// 2) Если асинхронная операция закончилась с ошибками, то пробуем запустить еще раз, если общее количество запусков не превысило число,
// переданное первым параметром.

// Примеры:
// // Пытаемся прочитать файл и даем функции 3 попытки.
// retry(3, callback =>
//   fs.readFile('file.txt', (err, body) => {
//     callback(err, body);
//   }), (err, result) => {
//     console.log(result);
// });

// Подсказки:
// Коллбек передаваемый в конце и коллбек который передается в функцию с асинхронной операцией - две разные функции даже не смотря на то,
// что они принимают одинаковые параметры.

export default function retry(attempts, asyncFunc, callback) {
  const cb = (err, data) => {
    if (!err || attempts <= 1) {
      callback(err, data);
    }
    retry(attempts - 1, asyncFunc, callback);
  };
  asyncFunc(cb);
}

/* __tests__ */

import retry from '../retry';

describe('#retry', () => {
  it('should finish with error', () => (
    new Promise((done) => {
      let calledTimes = 0;
      retry(3, (callback) => {
        calledTimes += 1;
        callback(calledTimes);
      }, (err) => {
        expect(err).toBe(3);
        expect(calledTimes).toBe(3);
        done();
      });
    })
  ));

  it('should finish without error', () => (
    new Promise((done) => {
      let calledTimes = 0;
      retry(3, (callback) => {
        calledTimes += 1;
        if (calledTimes < 3) {
          callback(calledTimes);
        } else {
          callback(null, calledTimes);
        }
      }, (err, result) => {
        expect(err).toBeNull();
        expect(calledTimes).toBe(3);
        expect(result).toBe(3);
        done();
      });
    })
  ));

  it('should call final callback if err is empty', () => (
    new Promise((done) => {
      let calledTimes = 0;
      retry(6, (callback) => {
        calledTimes += 1;
        if (calledTimes === 4) {
          callback(null, calledTimes);
          return;
        }
        callback(calledTimes);
      }, (err, result) => {
        expect(result).toBe(4);
        expect(calledTimes).toBe(4);
        done();
      });
    })
  ));
});
