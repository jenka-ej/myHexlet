// Реализуйте абстракцию (набор функций) для работы с прямоугольниками, стороны которого всегда параллельны осям. 
// Прямоугольник может располагаться в любом месте координатной плоскости.
// При такой постановке, достаточно знать только три параметра для однозначного задания прямоугольника на плоскости: координаты левой верхней точки, ширину и высоту. 
// Зная их, мы всегда можем построить прямоугольник одним единственным способом.

// Основной интерфейс:
// 1) makeRectangle(point, width, height) (конструктор) – создает прямоугольник. Принимает параметры: левую-верхнюю точку, ширину и высоту. 
// Ширина и высота – положительные числа
// 2) Селекторы getStartPoint(rectangle), getWidth(rectangle) и getHeight(rectangle)
// 3) containsOrigin(rectangle) – проверяет, принадлежит ли центр координат прямоугольнику (не лежит на границе прямоугольника, а находится внутри). 
// Чтобы в этом убедиться, достаточно проверить, что все вершины прямоугольника лежат в разных квадрантах (их можно высчитать в момент проверки)
// Экспортируйте функции makeRectangle(point, width, height) и containsOrigin(rectangle).

import { makeDecartPoint, getX, getY, getQuadrant } from './points.js';

const makeRectangle = (point, width, height) => ({ point, width, height });

const getStartPoint = (rectangle) => (rectangle.point);

const getWidth = (rectangle) => (rectangle.width);

const getHeight = (rectangle) => (rectangle.height);

const containsOrigin = (rectangle) => {
  const h1 = getStartPoint(rectangle);
  const h2 = makeDecartPoint(getX(h1) + getWidth(rectangle), getY(h1));
  const h3 = makeDecartPoint(getX(h1), getY(h1) - getHeight(rectangle));
  const term1 = getX(h1) < 0 && getY(h1) > 0;
  const term2 = getX(h2) > 0 && getY(h2) > 0;
  const term3 = getX(h3) < 0 && getY(h3) < 0;
  if (term1 && term2 && term3) {
    return true;
  }
  return false;
};

export {
  makeRectangle, containsOrigin,
};

/* __tests__ */

import { makeRectangle, containsOrigin } from '../rectangle.js';
import { makeDecartPoint } from '../points.js'; // eslint-disable-line

test('rectangle1', () => {
  const p = makeDecartPoint(0, 1);
  const rectangle = makeRectangle(p, 4, 5);
  expect(containsOrigin(rectangle)).toBe(false);
});

test('rectangle2', () => {
  const p = makeDecartPoint(-4, 3);
  const rectangle1 = makeRectangle(p, 5, 4);
  expect(containsOrigin(rectangle1)).toBe(true);

  const rectangle2 = makeRectangle(p, 2, 2);
  expect(containsOrigin(rectangle2)).toBe(false);

  const rectangle3 = makeRectangle(p, 2, 4);
  expect(containsOrigin(rectangle3)).toBe(false);

  const rectangle4 = makeRectangle(p, 4, 3);
  expect(containsOrigin(rectangle4)).toBe(false);

  const rectangle5 = makeRectangle(p, 5, 2);
  expect(containsOrigin(rectangle5)).toBe(false);
});
