// Создайте и экспортируйте тип Point, который описывает точку в пространстве, состоящую из трех координат: x, y, z.


// Реализуйте функцию isTheSamePoint(), которая проверяет две точки на их одинаковое расположение. Две точки совпадают, если совпадают все их координаты:

// const p1: Point = [1, 3, 4];
// const p2: Point = [1, 3, 4];
// const p3: Point = [0, 8, 4];
 
// isTheSamePoint(p1, p2); // true
// isTheSamePoint(p1, p3); // false
// isTheSamePoint(p2, p3); // false

export type Point = [number, number, number];

function isTheSamePoint(point1: Point, point2: Point): boolean {
  let result = true;
  point1.forEach((coor, index) => {
    if (coor !== point2[index]) {
      result = false;
    }
  });
  return result;
}

export default isTheSamePoint;

/* __tests__ */

import isTheSamePoint, { Point } from '../solution';

test('function', () => {
  const p1: Point = [1, 2, 3];
  const p2: Point = [1, 2, 3];
  const p3: Point = [0, 2, 3];

  expect(isTheSamePoint(p1, p2)).toBe(true);
  expect(isTheSamePoint(p1, p3)).toBe(false);
});
