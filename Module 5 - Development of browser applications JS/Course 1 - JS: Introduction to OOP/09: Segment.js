// Реализуйте метод toString(), который преобразует отрезок к строке в соответствии с примером ниже:

export default function Segment(beginPoint, endPoint) {
  this.beginPoint = beginPoint;
  this.endPoint = endPoint;
}

Segment.prototype.getBeginPoint = function getBeginPoint() {
  return this.beginPoint;
};

Segment.prototype.getEndPoint = function getEndPoint() {
  return this.endPoint;
};

Segment.prototype.toString = function toString() {
  return `[${this.getBeginPoint()}, ${this.getEndPoint()}]`;
};

/* __tests__ */

import Segment from '../Segment.js';
import Point from '../Point.js';

test('testing toString point', () => {
  const point1 = new Point(1, 10);
  const point2 = new Point(11, -3);
  expect(`${point1}`).toBe('(1, 10)');
  expect(`${point2}`).toBe('(11, -3)');
});

test('testing toString segment', () => {
  const point1 = new Point(1, 10);
  const point2 = new Point(11, -3);
  const segment1 = new Segment(point1, point2);
  expect(`${segment1}`).toBe('[(1, 10), (11, -3)]');

  const segment2 = new Segment(point2, point1);
  expect(`${segment2}`).toBe('[(11, -3), (1, 10)]');
});
