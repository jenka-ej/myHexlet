// Это испытание является продолжением предыдущего, расширяя количество состояний и добавляя асинхронную составляющую.

// Ранее вы реализовали реакцию на некое состояние, теперь пришла пора добавить это состояние в объект и сделать реакцию на него асинхронной.
// Реализуйте в классе CustomPromise метод then(onFulfill) и обеспечьте асинхронное выполнение функции resolve(data).

// Алгоритм:
// Используйте названия состояний из стандарта, так как они проверяются в тестах.
// Можно копировать решение учителя из предыдущего испытания и расширять его. В решении должны отсутствовать встроенные Promise и ключевое слово async.
// Только таймеры и вызовы функций из функций.

// Примеры использования
// import CustomPromise from '../CustomPromise.js';
 
// const messages = [];
 
// const resolvedPromise = new CustomPromise((resolve) => {
//   resolve('Сначала резолвим?');
// });
 
// const modifiedPromise = resolvedPromise
//   .then(() => { messages.push('Сначала меняем статус.'); });
 
// await modifiedPromise
//   .then(() => { messages.push('А уже потом резолвим.') });
 
// console.log(messages.join(' ')); // Сначала меняем статус. А уже потом резолвим.

// Подсказки:
// Изучите кейсы использования в тестах, они опираются на возможности промисов из документации.

// Если почувствуете, что нужны дополнительные материалы:

// курс "Синхронная асинхронность", чуть глубже погружающий в тему
// курс "Автоматное программирование" о конечных автоматах, чем является промис

const STATES = {
  status: 'pending',
};

class CustomPromise {
  constructor(executor) {
    this.status = STATES.status;
    this.result = null;
    this.calculations = [];
    executor(this.resolve);
  }

  resolve = (a) => {
    this.status = 'fulfilled';
    this.result = a;
    if (this.calculations.length > 0) {
      this.calculateAfterAll(this.calculations);
    }
  };

  then(callback) {
    if (this.status === 'pending') {
      this.calculations.push(callback);
      return this;
    }
    return new CustomPromise((resolve) => {
      setTimeout(() => resolve(callback(this.result)), 0);
    });
  }

  calculateAfterAll(calculations) {
    let final = this.result;
    calculations.forEach((callback) => {
      final = callback(final);
    });
    this.calculations = [];
    return new CustomPromise((resolve) => resolve(final));
  }
}

export default CustomPromise;

/* __tests__ */

import util from 'util';
import CustomPromise from '../CustomPromise.js';

const fulfillMessage = 'Fulfilled';
const resolveMessage = 'Resolved';
const messages = [];
const expectedMessages = [fulfillMessage, resolveMessage];

test('is not Promise', () => {
  expect(new CustomPromise(() => {})).not.toBeInstanceOf(Promise);
});

test('then() and states', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    setTimeout(() => resolve(resolveMessage), 100);
  });
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('pending');

  // eslint-disable-next-line jest/valid-expect-in-promise
  const resolveChainResult = await resolvedPromise
    .then((message) => `New another ${message}`)
    .then((message) => message.split(' '))
    .then((array) => array.reverse())
    .then((array) => array.join(''));
  expect(util.inspect(resolvedPromise).toLowerCase()).toContain('fulfilled');
  expect(resolveChainResult).toEqual(`New another ${resolveMessage}`.split(' ').reverse().join(''));
});

test('event loop', async () => {
  const resolvedPromise = new CustomPromise((resolve) => {
    resolve(resolveMessage);
  });
  expect(messages).toHaveLength(0);

  // eslint-disable-next-line jest/valid-expect-in-promise
  const modifiedPromise = resolvedPromise
    .then(() => { messages.push(fulfillMessage); });
  expect(messages).toHaveLength(0);

  await modifiedPromise
    .then(() => { messages.push(resolveMessage); });
  expect(messages).toEqual(expectedMessages);
});
