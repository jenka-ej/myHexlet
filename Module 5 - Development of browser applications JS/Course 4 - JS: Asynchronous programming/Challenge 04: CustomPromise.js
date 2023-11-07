// Серия испытаний CustomPromise затрагивает множество тем, тесно связана со стандартом ecma и будет полезна для прокачки опытным разработчикам.
// Если тема классов и позднего связывания вам пока плохо знакомы, то продолжайте обучение и возвращайтесь к этим испытаниям позже.

// В данном испытании вы собственными силами начнёте реализовывать "облегчённую" версию объекта Promise.
// Последующие испытания будут раскрывать тему и дополнять её новой функциональностью.

// В данном испытании необходимо создать только класс, без асинхронности, но с цепочкой вызовов.
// Для этого реализуйте в классе CustomPromise конструктор, принимающий колбек executor(resolve), а также метод then(callback);
// В решении должны отсутствовать встроенные Promise и ключевое слово async.

// Примеры использования:
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

// Подсказки:
// Вам понадобится вспомогательный метод, чтобы замыкать значения.
// Изучите кейсы использования в тестах, они опираются на возможности промисов из документации.

// В решении учителя используется связывание через bind(), но в процессе решения можно упростить себе задачу, используя стрелочные функции.

class CustomPromise {
  constructor(callback) {
    this.result = null;
    callback(this.resolve);
  }

  resolve = (a) => {
    this.result = a;
  };

  then(fn) {
    return new CustomPromise((resolve) => resolve(fn(this.result)));
  }
}

export default CustomPromise;

/* __tests__ */

import CustomPromise from '../CustomPromise.js';

const resolveMessage = 'Resolved!';

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise);
});

test('then()', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage);
  });
  const resolveString = await resolvedPromise
    .then((message) => `Another ${message}`);
  expect(resolveString).toEqual(`Another ${resolveMessage}`);

  // eslint-disable-next-line jest/valid-expect-in-promise
  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''));
  expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''));
});
