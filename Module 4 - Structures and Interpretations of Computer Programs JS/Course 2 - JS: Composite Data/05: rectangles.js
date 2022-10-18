// Реализуйте абстракцию (набор функций) для работы с прямоугольником, стороны которого всегда параллельны осям. 
// Прямоугольник может располагаться в любом месте координатной плоскости.
// При такой постановке задачи достаточно знать только три параметра для однозначного задания прямоугольника на плоскости: 
// координаты левой-верхней точки, ширину и высоту. 
// Зная их, мы всегда можем построить прямоугольник одним единственным способом.
// Основной интерфейс:
// makeRectangle() (конструктор) - создаёт прямоугольник. Принимает параметры: левую-верхнюю точку, ширину и высоту.
// Селекторы getStartPoint(), getWidth() и getHeight()
// Вспомогательные функции для выполнения расчетов:
// square() - возвращает площадь прямоугольника (a * b).
// perimeter() - возвращает периметр прямоугольника (2 * (a + b)).
// containsTheOrigin() - проверяет, принадлежит ли центр координат прямоугольнику (не лежит на границе прямоугольника, а находится внутри). 
// Чтобы в этом убедиться, достаточно проверить, что все вершины прямоугольника лежат в разных квадрантах (их можно вычислить в момент проверки).

import { makePoint, getX, getY, quadrant, toString as pointToString } from '@hexlet/points';

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs';

export const makeRectangle = (point, width, height) => cons(point, cons(width, height));

export const getStartPoint = (rectangle) => car(rectangle);

export const getWidth = (rectangle) => car(cdr(rectangle));

export const getHeight = (rectangle) => cdr(cdr(rectangle));

export const square = (rectangle) => getWidth(rectangle) * getHeight(rectangle);

export const perimeter = (rectangle) => 2 * (getWidth(rectangle) + getHeight(rectangle));

export const containsTheOrigin = (rectangle) => {
  const point1 = getStartPoint(rectangle);
  const point2 = makePoint(getX(point1) + getWidth(rectangle), getY(point1));
  const point3 = makePoint(getX(point1), getY(point1) - getHeight(rectangle));
  if (quadrant(point1) === 2 && quadrant(point2) === 1 && quadrant(point3) === 3) {
    return true;
  }
  return false;
};

/* __tests__ */

import { makePoint, toString as pointToString } from '@hexlet/points';

import {
  makeRectangle,
  getStartPoint,
  getWidth,
  getHeight,
  square,
  perimeter,
  containsTheOrigin,
} from '../rectangles.js';

describe('Rectangle', () => {
  const rectangle = makeRectangle(makePoint(0, 1), 5, 4);

  it('selectors', () => {
    expect(pointToString(getStartPoint(rectangle))).toBe('(0, 1)');
    expect(getWidth(rectangle)).toBe(5);
    expect(getHeight(rectangle)).toBe(4);
  });

  it('square', () => {
    expect(square(rectangle)).toBe(20);
  });

  it('perimeter', () => {
    expect(perimeter(rectangle)).toBe(18);
  });

  it('containsTheOrigin', () => {
    expect(containsTheOrigin(rectangle)).toBe(false);

    expect(containsTheOrigin(makeRectangle(makePoint(-4, 3), 5, 4))).toBe(true);
    expect(containsTheOrigin(makeRectangle(makePoint(-4, 4), 5, 2))).toBe(false);
    expect(containsTheOrigin(makeRectangle(makePoint(-4, 3), 2, 8))).toBe(false);
    expect(containsTheOrigin(makeRectangle(makePoint(1, -1), 2, 2))).toBe(false);
  });
});
