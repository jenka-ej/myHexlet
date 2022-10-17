// Реализуйте и экспортируйте следующие функции для работы с точками:
// getQuadrant() — функция, которая вычисляет квадрант, в котором находится точка. Ниже приведена схема, показывающая номера квадрантов на плоскости
// getSymmetricalPoint() — функция, возвращающая новую точку, симметричную относительно начала координат. Такая симметричность означает, что меняются знаки у x и y
// calculateDistance() — функция, вычисляющая расстояние между точками по формуле: d = sqrt((x2−x1)^2+(y2−y1)^2)

import { makePoint, getX, getY } from '@hexlet/points';

export const getQuadrant = (point) => {
  const pointX = getX(point);
  const pointY = getY(point);
  if (pointX === 0 || pointY === 0) {
    return null;
  }
  if (pointX > 0) {
    if (pointY > 0) {
      return 1;
    }
    return 4;
  }
  if (pointY > 0) {
    return 2;
  }
  return 3;
};

export const getSymmetricalPoint = (point) => makePoint(-getX(point), -getY(point));

export const calculateDistance = (point1, point2) => {
  const diffX = (getX(point2) - getX(point1)) ** 2;
  const diffY = (getY(point2) - getY(point1)) ** 2;
  const distance = Math.round(Math.sqrt(diffX + diffY) * 100) / 100;
  return distance;
};

/* __tests__ */

import { makePoint, toString } from '@hexlet/points';
import { calculateDistance, getQuadrant, getSymmetricalPoint } from '../points.js';

describe('points', () => {
  it('getQuadrant', () => {
    expect(getQuadrant(makePoint(0, 0))).toBeNull();
    expect(getQuadrant(makePoint(5, 0))).toBeNull();
    expect(getQuadrant(makePoint(1, 5))).toBe(1);
    expect(getQuadrant(makePoint(-3, 10))).toBe(2);
    expect(getQuadrant(makePoint(-2, -5))).toBe(3);
    expect(getQuadrant(makePoint(4, -1))).toBe(4);
  });

  it('getSymmetricalPoint', () => {
    expect(toString(getSymmetricalPoint(makePoint(10, 10)))).toBe(toString(makePoint(-10, -10)));
    expect(toString(getSymmetricalPoint(makePoint(-10, -10)))).toBe(toString(makePoint(10, 10)));
    expect(toString(getSymmetricalPoint(makePoint(10, -10)))).toBe(toString(makePoint(-10, 10)));
  });

  it('calculateDistance', () => {
    expect(calculateDistance(makePoint(-2, -3), makePoint(-4, 4))).toBeCloseTo(7.28, 2);
  });
});
