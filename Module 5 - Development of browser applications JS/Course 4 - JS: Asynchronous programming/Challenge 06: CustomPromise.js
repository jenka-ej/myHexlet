// Это испытание является продолжением предыдущего и теперь вы познакомитесь с автоматным программированием.

// Реализуете в классе CustomPromise метод then(callback) и вызов обработчиков на основе состояния объекта.
// Состояния запишите в объект STATES и используйте его вместо текстовых значений.

// Алгоритм:
// Для решения данной задачи вам уже понадобится "подглядывать" в стандарт, чтобы разобраться с неймингом и общим алгоритмом.
// В нём указаны состояния, между которыми совершаются переходы, начальное состояние объекта и "реакции" (функции) на изменение состояния.
// Достаточно будет одного состояния - его установки и очистки, чтобы не усложнять реализацию.
// На изменение состояния должна происходить реакция, а если объект находится в начальном состоянии, то реакции должны накапливаться.
// Для упрощения можно копировать решение учителя из предыдущего испытания и расширять его.
// В решении должны отсутствовать встроенные Promise и ключевое слово async. Только вызовы функций из функций.

// Примеры использования
// import CustomPromise from '../CustomPromise.js';
 
// const promise = new CustomPromise((resolve) => resolve('Hello, world!'));
// promise
//   .then((value) => {
//     console.log(value); // 'Hello, world!'
//   });
 
// const result = await promise
//   .then((value) => value.replace('Hello', 'Goodbye'))
//   .then((value) => value.toUpperCase());
// console.log(result); // GOODBYE, WORLD!

const STATES = {
  status: 'pending',
};

class CustomPromise {
  constructor(executor) {
    this.state = STATES.status;
    this.result = null;
    this.calculations = [];
    executor(this.resolve);
  }

  resolve = (a) => {
    this.state = '';
    this.result = a;
    if (this.calculations.length > 0) {
      this.calculateAfterAll(this.calculations);
    }
  };

  then(callback) {
    if (this.state === 'pending') {
      this.calculations.push(callback);
      return this;
    }
    return new CustomPromise((resolve) => resolve(callback(this.result)));
  }

  calculateAfterAll(callbacks) {
    let final = this.result;
    callbacks.forEach((fn) => {
      final = fn(final);
    });
    this.calculations = [];
    return new CustomPromise((resolve) => resolve(final));
  }
}

export default CustomPromise;

/* __tests__ */

import util from 'util';
import CustomPromise from '../CustomPromise.js';

const resolveMessage = 'Resolved!';

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise);
});

test('then()', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    setTimeout(() => resolve(resolveMessage), 100);
  });
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('pending');
  const resolveString = await resolvedPromise
    .then(async (message) => `Another ${message}`);
  expect(util.inspect(resolvedPromise).toLowerCase()).not.toContain('pending');
  expect(resolveString).toEqual(`Another ${resolveMessage}`);

  // eslint-disable-next-line jest/valid-expect-in-promise
  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''));
  expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''));
});
