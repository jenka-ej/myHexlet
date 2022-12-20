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

/* __tests__ */

import Square from '../Square.js';

test('GetSide', () => {
  const square = new Square(4);
  const actual = square.getSide();
  expect(actual).toBe(4);
});
