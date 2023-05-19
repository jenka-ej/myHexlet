// Реализуйте и экспортируйте указанные ниже функции:
// 1) makeSegment(). Принимает на вход две точки и возвращает отрезок
// 2) getMidpointOfSegment(). Принимает на вход отрезок и возвращает точку находящуюся на середине отрезка
// 3) getBeginPoint(). Принимает на вход отрезок и возвращает точку начала отрезка
// 4) getEndPoint(). Принимает на вход отрезок и возвращает точку конца отрезка

import { makeDecartPoint, getX, getY } from './points.js';

const makeSegment = (point1, point2) => ({ beginPoint: point1, endPoint: point2 });

const getMidpointOfSegment = (segment) => {
  const middleX = (getX(segment.beginPoint) + getX(segment.endPoint)) / 2;
  const middleY = (getY(segment.beginPoint) + getY(segment.endPoint)) / 2;
  return makeDecartPoint(middleX, middleY);
};

const getBeginPoint = (segment) => (segment.beginPoint);

const getEndPoint = (segment) => (segment.endPoint);

export {
  makeSegment, getMidpointOfSegment, getBeginPoint, getEndPoint,
};

/* __tests__ */

import { makeDecartPoint } from '../points.js'; // eslint-disable-line
import {
  makeSegment, getMidpointOfSegment, getBeginPoint, getEndPoint,
} from '../segments.js'; // eslint-disable-line

describe('segment', () => {
  test('get begin & end points', () => {
    const beginPoint = makeDecartPoint(3, 2);
    const endPoint = makeDecartPoint(0, 0);
    const segment = makeSegment(beginPoint, endPoint);
    expect(getBeginPoint(segment)).toEqual(beginPoint);
    expect(getEndPoint(segment)).toEqual(endPoint);
  });

  test('get midpoint of segment 1', () => {
    const segment = makeSegment(makeDecartPoint(3, 2), makeDecartPoint(0, 0));
    expect(getMidpointOfSegment(segment)).toEqual(makeDecartPoint(1.5, 1));
  });

  test('get midpoint of segment 2', () => {
    const segment2 = makeSegment(makeDecartPoint(3, 2), makeDecartPoint(2, 3));
    expect(getMidpointOfSegment(segment2)).toEqual(makeDecartPoint(2.5, 2.5));
  });
});
