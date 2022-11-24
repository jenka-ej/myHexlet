// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход отрезок и возвращает новый отрезок с точками, 
// добавленными в обратном порядке (begin меняется местами с end).
// Точки в результирующем отрезке должны быть копиями (по значению) соответствующих точек исходного отрезка. 
// То есть они не должны быть ссылкой на один и тот же объект, так как это разные объекты (пускай и с одинаковыми координатами). 
// Для создания копий используйте соответствующие конструкторы.

import Point from './Point.js';
import Segment from './Segment.js';

const reverse = (segment) => {
  const beginPoint = segment.getBeginPoint();
  const endPoint = segment.getEndPoint();
  const newBeginPoint = new Point(endPoint.getX(), endPoint.getY());
  const newEndPoint = new Point(beginPoint.getX(), beginPoint.getY());

  return new Segment(newBeginPoint, newEndPoint);
};

export default reverse;

/* __tests__ */

import Segment from '../Segment.js';
import Point from '../Point.js';
import reverse from '../solution.js';

test('reverse', () => {
  const point1 = new Point(1, 10);
  const point2 = new Point(11, -3);
  const segment = new Segment(point1, point2);
  const reversedSegment = reverse(segment);

  expect(reversedSegment.getBeginPoint().getX()).toEqual(point2.getX());
  expect(reversedSegment.getBeginPoint().getY()).toEqual(point2.getY());

  expect(reversedSegment.getEndPoint().getX()).toEqual(point1.getX());
  expect(reversedSegment.getEndPoint().getY()).toEqual(point1.getY());

  expect(JSON.stringify(reversedSegment.getBeginPoint())).toEqual(JSON.stringify(point2));
  expect(JSON.stringify(reversedSegment.getEndPoint())).toEqual(JSON.stringify(point1));

  expect(reversedSegment.getBeginPoint()).not.toBe(point2);
  expect(reversedSegment.getEndPoint()).not.toBe(point1);

  expect(reversedSegment).toBeInstanceOf(Segment);
  expect(reversedSegment.getEndPoint()).toBeInstanceOf(Point);
  expect(reversedSegment.getBeginPoint()).toBeInstanceOf(Point);
});
