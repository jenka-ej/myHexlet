// Реализуйте и экспортируйте по умолчанию класс, который представляет собой бесконечную последовательность.
// Объекты этого класса должны быть итерируемыми.

// import Seq from './seq';
 
// const seq = new Seq(1, x => x + 1);
// или так: const result = seq.skip(50).skip(150).take(3);
// const result = seq.skip(200).take(3);
// for (const value of result) {
//   console.log(value);
// }

// Результат:
// 201
// 202
// 203
 
// Можно обойти еще раз:
// for (const value of result) {
//   console.log(value);
// }

// Результат:
// 201
// 202
// 203
 
// for (const value of seq.skip(10).take(1)) {
//   console.log(value);
// }

// Результат:
// 11
 
// const result1 = seq.take(6).skip(4).take(2).skip(1);
 
// for (const value of result1) {
//   console.log(value);
// }

// Результат:
// 6

// Как видно из примеров выше, методы класса построены с применением fluent interface.

// Конструктор класса принимает на вход три параметра:
// 1) Стартовое значение последовательности
// 2) Функцию, которая генерирует новое значение последовательности на основе предыдущего
// 3) Количество элементов последовательности, по умолчанию последовательность бесконечна (Infinity)
// Также на классе определено две функции: skip(n) и take(m). Первая пропускает первые n элементов, вторая ограничивает коллекцию m элементами.

// Подсказки:
// obj[Symbol.iterator]() – возвращает новый итератор

export default class Seq {
  constructor(startNumber, fn, length = Infinity) {
    this.current = startNumber;
    this.next = fn;
    this.length = length;
  }

  * [Symbol.iterator]() {
    let counter = 0;
    let value = this.current;

    while (counter < this.length) {
      counter += 1;
      yield value;
      value = this.next(value);
    }
  }

  take(num) {
    return new Seq(this.current, this.next, num);
  }

  skip(iter) {
    if (iter > this.length) {
      throw new Error('Cannot skip more than length of object');
    }

    let newStartNumber = this.current;
    for (let i = 0; i < iter; i += 1) {
      newStartNumber = this.next(newStartNumber);
    }
    return new Seq(newStartNumber, this.next, this.length - iter);
  }
}

/* __tests__ */

import Seq from '../seq.js';

describe('Generator of Iterators', () => {
  it('set 1', () => {
    const seq = new Seq(0, (x) => x + 1);
    const result = seq.take(2);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([0, 1]);

    const actual2 = [];
    for (const value of seq.take(3)) {
      actual2.push(value);
    }
    expect(actual2).toEqual([0, 1, 2]);
  });

  it('set 2', () => {
    const seq = new Seq(1, (x) => x + 1);
    const result = seq.skip(200).take(3);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([201, 202, 203]);

    const actual2 = [];
    for (const value of seq.skip(5).skip(5).take(1)) {
      actual2.push(value);
    }
    expect(actual2).toEqual([11]);
  });

  it('set 3', () => {
    const seq = new Seq(0, (x) => (x % 3 === 0 ? x + 1 : x + 2));
    const result = seq.take(10);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([0, 1, 3, 4, 6, 7, 9, 10, 12, 13]);

    const actual2 = [];
    for (const value of seq.take(3)) {
      actual2.push(value);
    }
    expect(actual2).toEqual([0, 1, 3]);
  });

  it('set 4', () => {
    const seq = new Seq(7, (x) => x + 2);
    const result = seq.take(2);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([7, 9]);

    const actual2 = [];
    for (const value of seq.skip(5).take(3)) {
      actual2.push(value);
    }
    expect(actual2).toEqual([17, 19, 21]);
  });

  it('set 5', () => {
    const seq = new Seq(7, (x) => x + 2);
    const result = seq.take(6).skip(4).take(2).skip(1);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([17]);
  });

  it('Check for infinite loop/recursion', () => {
    const seq = new Seq(1, (x) => x);
    const result = seq.take(Infinity);
    const actual = [];
    for (const value of result) {
      actual.push(value);
      break;
    }
    expect(actual).toEqual([1]);
  });

  it('set 6', () => {
    const seq = new Seq(0, (x) => x + 1);
    const result = seq.take(3);
    const actual = [];
    for (const value of result) {
      actual.push(value);
    }
    for (const value of result) {
      actual.push(value);
    }
    expect(actual).toEqual([0, 1, 2, 0, 1, 2]);
  });
});
