const calculateDistance = (p1, p2) => {
  const distancex = p2[0] - p1[0];
  const distancey = p2[1] - p1[1];
  return Math.sqrt(distancex ** 2 + distancey ** 2);
};
export default calculateDistance;

/* __tests__ */

import calculateDistance from '../points.js';

test('point1', () => {
  const point1 = [0, 0];
  const point2 = [3, 4];
  expect(calculateDistance(point1, point2)).toBe(5);
});

test('point2', () => {
  const point1 = [-1, -4];
  const point2 = [-1, -10];
  expect(calculateDistance(point1, point2)).toBe(6);
});

test('point3', () => {
  const point1 = [1, 10];
  const point2 = [1, 3];
  expect(calculateDistance(point1, point2)).toBe(7);
});
