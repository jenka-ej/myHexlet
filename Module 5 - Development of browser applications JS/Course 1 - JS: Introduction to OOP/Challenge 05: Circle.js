// Реализуйте и экспортируйте по умолчанию класс Circle описывающий круг. У круга есть только одно свойство - его радиус. 
// Реализуйте методы getArea() и getCircumference(), которые вычисляют и возвращают площадь и длину окружности соответственно.

export default class Circle {
  constructor(radius) {
    this.radius = radius;
  }

  getArea() {
    return Math.PI * (this.radius ** 2);
  }

  getCircumference() {
    return 2 * Math.PI * this.radius;
  }
}

/* __tests__ */

import Circle from '../Circle.js';

test('GetArea #1', () => {
  const circle = new Circle(1);
  expect(circle.getArea()).toBeCloseTo(Math.PI);
});

test('GetArea #2', () => {
  const circle = new Circle(3);
  expect(circle.getArea()).toBeCloseTo(28.274);
});

test('getCircumference #1', () => {
  const circle = new Circle(1);
  expect(circle.getCircumference()).toBeCloseTo(2 * Math.PI);
});

test('getCircumference #2', () => {
  const circle = new Circle(3);
  expect(circle.getCircumference()).toBeCloseTo(18.849);
});
