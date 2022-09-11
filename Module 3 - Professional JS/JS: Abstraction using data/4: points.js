const getMidpoint = (point1, point2) => {
  const result = {};
  result.x = (point1.x + point2.x) / 2;
  result.y = (point1.y + point2.y) / 2;
  return result;
};
export default getMidpoint;

/* __tests__ */

import getMidpoint from '../points.js'; // eslint-disable-line

test('getMidpoint', () => {
  const point1 = { x: 0, y: 0 };
  const point2 = { x: 4, y: 4 };
  expect(getMidpoint(point1, point2)).toStrictEqual({ x: 2, y: 2 });
});

test('getMidpoint2', () => {
  const point1 = { x: -1, y: 10 };
  const point2 = { x: 0, y: -3 };
  expect(getMidpoint(point1, point2)).toStrictEqual({ x: -0.5, y: 3.5 });
});
