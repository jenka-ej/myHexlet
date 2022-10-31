// Реализуйте и экспортируйте функцию по умолчанию, 
// которая принимает на вход упорядоченный список точек, являющихся вершинами многоугольника, вычисляет и возвращает периметр многоугольника.

import { getX as X, getY as Y } from '@hexlet/points';
// eslint-disable-next-line
import { isEmpty, head, tail, toString } from '@hexlet/pairs-data';

const calculatePolygonPerimeter = (list1) => {
  const countPoints = (list2, count) => {
    if (isEmpty(list2)) {
      return count;
    }
    return countPoints(tail(list2), count + 1);
  };
  const counter = countPoints(list1, 0);
  if (counter < 3) {
    return null;
  }
  const start = head(list1);
  const distance = (p1, p2) => Math.sqrt(((X(p2) - X(p1)) ** 2) + ((Y(p2) - Y(p1)) ** 2));
  const halfPerimeter = (list3, perimeterCount) => {
    if (countPoints(list3, 0) === 1) {
      const result = perimeterCount + distance(head(list3), start);
      return result;
    }
    return halfPerimeter(tail(list3), perimeterCount + distance(head(list3), head(tail(list3))));
  };
  return halfPerimeter(list1, 0);
};
export default calculatePolygonPerimeter;

/* __tests__ */

import { l } from '@hexlet/pairs-data';
import { makePoint } from '@hexlet/points';
import calculatePolygonPerimeter from '../calculatePolygonPerimeter.js';

test('calculatePolygonPerimeter', () => {
  const a = makePoint(1, 1);
  const b = makePoint(3, 3);
  const c = makePoint(4, 1);
  const d = makePoint(3, -2);
  const e = makePoint(7, -2);
  const f = makePoint(9, 0);
  const g = makePoint(2, -6);
  const h = makePoint(-1, -1);
  const i = makePoint(-5, 7);

  expect(calculatePolygonPerimeter(l())).toBeNull();
  expect(calculatePolygonPerimeter(l(a))).toBeNull();
  expect(calculatePolygonPerimeter(l(b, c))).toBeNull();

  expect(calculatePolygonPerimeter(l(a, b, c))).toBeCloseTo(8.064, 3);
  expect(calculatePolygonPerimeter(l(a, c, b))).toBeCloseTo(8.064, 3);
  expect(calculatePolygonPerimeter(l(b, c, a))).toBeCloseTo(8.064, 3);

  expect(calculatePolygonPerimeter(l(b, f, e, d))).toBeCloseTo(18.537, 3);
  expect(calculatePolygonPerimeter(l(i, f, g, h))).toBeCloseTo(39.647, 3);

  expect(calculatePolygonPerimeter(l(a, b, f, e, d))).toBeCloseTo(19.971, 3);

  expect(calculatePolygonPerimeter(l(a, b, f, e, d, c))).toBeCloseTo(22.527, 3);
  expect(calculatePolygonPerimeter(l(a, c, d, e, f, b))).toBeCloseTo(22.527, 3);
  expect(calculatePolygonPerimeter(l(a, c, d, f, e, d))).toBeCloseTo(22.921, 3);
  expect(calculatePolygonPerimeter(l(a, c, b, f, e, d))).toBeCloseTo(22.378, 3);
});
