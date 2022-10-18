// Определите и экспортируйте следующие функции:
// Конструктор makeSegment(), который принимает на вход две точки и возвращает отрезок. Первая точка это начало отрезка, вторая это конец.
// Селекторы startSegment() и endSegment(), которые извлекают из отрезка его начальную и конечную точку соответственно.
// Вспомогательную функцию segmentToString(), которая возвращает текстовое представление отрезка: [(1, 2), (-4, -2)].
// Функцию midpointSegment(), которая находит точку на середине отрезка по формулaм: x = (x1 + x2) / 2 и y = (y1 + y2) / 2.

import {
  makePoint, getX, getY, toString as pointToString,
} from '@hexlet/points';
import { cons, car, cdr } from '@hexlet/pairs';

export const makeSegment = (point1, point2) => cons(point1, point2);

export const startSegment = (segment) => car(segment);

export const endSegment = (segment) => cdr(segment);

export const segmentToString = (segment) => {
  const startPoint = startSegment(segment);
  const endPoint = endSegment(segment);
  return `[${pointToString(startPoint)}, ${pointToString(endPoint)}]`;
};

export const midpointSegment = (segment) => {
  const startPoint = startSegment(segment);
  const endPoint = endSegment(segment);
  const midpointX = (getX(startPoint) + getX(endPoint)) / 2;
  const midpointY = (getY(startPoint) + getY(endPoint)) / 2;
  return makePoint(midpointX, midpointY);
};

/* __tests__ */

import { makePoint, toString as pointToString } from '@hexlet/points';
import {
  makeSegment,
  startSegment,
  endSegment,
  midpointSegment,
  segmentToString,
} from '../segments.js';

describe('segment', () => {
  const segment = makeSegment(makePoint(1, 2), makePoint(-4, -2));
  const segment2 = makeSegment(makePoint(2, 8), makePoint(4, -2));

  it('startSegment', () => {
    expect(pointToString(startSegment(segment))).toBe(pointToString(makePoint(1, 2)));
    expect(pointToString(startSegment(segment2))).toBe(pointToString(makePoint(2, 8)));
  });

  it('endSegment', () => {
    expect(pointToString(endSegment(segment))).toBe(pointToString(makePoint(-4, -2)));
    expect(pointToString(endSegment(segment2))).toBe(pointToString(makePoint(4, -2)));
  });

  it('segmentToString', () => {
    expect(segmentToString(segment)).toBe('[(1, 2), (-4, -2)]');
    expect(segmentToString(segment2)).toBe('[(2, 8), (4, -2)]');
  });

  it('midpointSegment', () => {
    expect(pointToString(midpointSegment(segment))).toBe('(-1.5, 0)');
    expect(pointToString(midpointSegment(segment2))).toBe('(3, 3)');
  });
});
