// Реализуйте и экспортируйте по умолчанию функцию, которая выводит (console.log) в терминал числа в диапазоне от begin до end. При этом:
// 1) Если число делится без остатка на 3, то вместо него выводится слово Fizz
// 2) Если число делится без остатка на 5, то вместо него выводится слово Buzz
// 3) Если число делится без остатка и на 3, и на 5, то вместо числа выводится слово FizzBuzz
// 4) В остальных случаях выводится само число

// Функция принимает два параметра (begin и end), определяющих начало и конец диапазона (включительно).
// Для простоты считаем, что эти параметры являются целыми числами больше нуля. Если диапазон пуст (в случае, когда begin > end),
// то функция просто ничего не печатает.

// Вызов функции:
// fizzBuzz(11, 20);

// Вывод в терминале:
// 11
// Fizz
// 13
// 14
// FizzBuzz
// 16
// 17
// Fizz
// 19
// Buzz

const fizzBuzz = (begin, end) => {
  const check = (num) => {
    if (num % 5 === 0 && num % 3 === 0) {
      console.log('FizzBuzz');
    } else if (num % 5 === 0) {
      console.log('Buzz');
    } else if (num % 3 === 0) {
      console.log('Fizz');
    } else {
      console.log(num);
    }
  };
  for (let i = begin; i <= end; i += 1) {
    check(i);
  }
};

export default fizzBuzz;

/* __tests__ */

import sinon from 'sinon';
import fizzBuzz from '../fizzBuzz.js';

describe('fizzBuzz', () => {
  const fizz = 'Fizz';
  const buzz = 'Buzz';
  const fizzAndBuzz = 'FizzBuzz';

  const range = [
    1, 2, fizz, 4, buzz, fizz, 7, 8, fizz, buzz,
    11, fizz, 13, 14, fizzAndBuzz, 16, 17, fizz, 19, buzz,
    fizz, 22, 23, fizz, buzz, 26, fizz, 28, 29, fizzAndBuzz,
    31, 32, fizz, 34, buzz, fizz, 37, 38, fizz, buzz,
    41, fizz, 43, 44, fizzAndBuzz, 46, 47, fizz, 49, buzz,
    fizz, 52, 53, fizz, buzz, 56, fizz, 58, 59, fizzAndBuzz,
    61, 62, fizz, 64, buzz, fizz, 67, 68, fizz, buzz,
    71, fizz, 73, 74, fizzAndBuzz, 76, 77, fizz, 79, buzz,
    fizz, 82, 83, fizz, buzz, 86, fizz, 88, 89, fizzAndBuzz,
    91, 92, fizz, 94, buzz, fizz, 97, 98, fizz, buzz,
  ];

  let spy;

  beforeEach(() => {
    spy = sinon.spy(console, 'log');
  });

  afterEach(() => {
    spy.restore();
  });

  it('Range: 1 - 30', () => {
    fizzBuzz(1, 30);

    const expected = range.slice(0, 30).join('\n');
    const actual = spy.args.join('\n');
    expect(actual).toBe(expected);
  });

  it('Range: 41 - 60', () => {
    fizzBuzz(41, 60);

    const expected = range.slice(40, 60).join('\n');
    const actual = spy.args.join('\n');
    expect(actual).toBe(expected);
  });

  it('Range: 77 - 97', () => {
    fizzBuzz(77, 97);

    const expected = range.slice(76, 97).join('\n');
    const actual = spy.args.join('\n');
    expect(actual).toBe(expected);
  });

  it('Single element', () => {
    fizzBuzz(45, 45);

    expect(spy.withArgs('FizzBuzz').calledOnce).toBe(true);
  });

  it('dont call console.log if range is wrong', () => {
    fizzBuzz(35, 25);

    expect(spy.notCalled).toBe(true);
  });
});
