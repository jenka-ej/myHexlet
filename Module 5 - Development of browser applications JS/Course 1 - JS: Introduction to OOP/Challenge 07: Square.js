// Реализуйте и экспортируйте по умолчанию класс Square для представления квадрата. 
// У квадрата есть только одно свойство — сторона. Реализуйте метод getSide(), возвращающий значение стороны.

export default class Square {
  constructor(side) {
    this.side = side;
  }

  getSide() {
    return this.side;
  }
}

/* __tests__/Square.test.js */

import Square from '../Square.js';

test('GetSide', () => {
  const square = new Square(4);
  const actual = square.getSide();
  expect(actual).toBe(4);
});

/* SquaresGenerator.js */
// Реализуйте класс SquaresGenerator со статическим методом generate(), принимающим два параметра: сторону и количество экземпляров квадрата (по умолчанию 5 штук),
// которые нужно создать. 
// Функция должна вернуть массив из квадратов. Экспортируйте класс по умолчанию.

import Square from './Square.js';

export default class SquaresGenerator {
  static generate(side, quantity = 5) {
    const result = [];
    for (let i = 0; i < quantity; i += 1) {
      result.push(new Square(side));
    }
    return result;
  }
}

/* __tests__/SquaresGenerator.test.js */

import SquaresGenerator from '../SquaresGenerator.js';
import Square from '../Square.js';

test('SquaresGenerator #1', () => {
  const squares = SquaresGenerator.generate(1, 1);
  const expected = [new Square(1)];
  expect(squares).toEqual(expected);
});

test('SquaresGenerator #2', () => {
  const squares = SquaresGenerator.generate(3, 2);
  const expected = [new Square(3), new Square(3)];
  expect(squares).toEqual(expected);
  expect(squares[0]).not.toBe(squares[1]);
});

test('SquaresGenerator #3 default count', () => {
  const squares = SquaresGenerator.generate(2);
  expect(squares).toHaveLength(5);
});
