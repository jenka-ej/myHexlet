// Реализуйте генератор случайных чисел, представленный классом Random. Интерфейс объекта включает в себя три функции:
// 1) Конструктор. Принимает на вход seed, начальное число генератора псевдослучайных чисел.
// 2) getNext() — метод, возвращающий новое случайное число.
// 3) reset() — метод, сбрасывающий генератор на начальное значение.
// Экспортируйте класс по умолчанию.

export default class Random {
  constructor(num0, a = 4, c = 4, m = 12) {
    this.basic = num0;
    this.num = num0;
    this.a = a;
    this.c = c;
    this.m = m;
  }

  getNext() {
    const newNum = (this.a * this.num + this.c) % this.m;
    this.num = newNum;
    return newNum;
  }

  reset() {
    this.num = this.basic;
  }
}

/* __tests__ */

import Random from '../Random.js';

test('getNext', () => {
  const seq = new Random(100);
  const result1 = seq.getNext();
  const result2 = seq.getNext();

  expect(result1).not.toBe(result2);

  const seq2 = new Random(100);
  const result21 = seq2.getNext();
  const result22 = seq2.getNext();

  expect(result1).toBe(result21);
  expect(result2).toBe(result22);
});

test('reset', () => {
  const seq = new Random(100);
  const result1 = seq.getNext();
  const result2 = seq.getNext();

  expect(result1).not.toBe(result2);

  seq.reset();

  const result21 = seq.getNext();
  const result22 = seq.getNext();

  expect(result1).toBe(result21);
  expect(result2).toBe(result22);
});
