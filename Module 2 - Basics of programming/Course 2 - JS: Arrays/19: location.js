// Реализуйте и экспортируйте функцию getTheNearestLocation(), которая находит ближайшее место к указанной точке на карте и возвращает его. Параметры функции:
// 1) locations – список мест на карте (массив). Каждое место – массив из двух элементов:
// 1.1) Первый элемент – это название места
// 1.2) Второй – точка на карте (массив из двух чисел-координат x и y)
// 2) point – текущая точка на карте

export const getTheNearestLocation = (locations, currentPoint) => {
  if (locations.length === 0) {
    return null;
  }

  let [nearestLocation] = locations;
  const [, nearestPoint] = nearestLocation;
  let lowestDistance = getDistance(currentPoint, nearestPoint);

  for (const location of locations) {
    const [, point] = location;
    const distance = getDistance(currentPoint, point);
    if (distance < lowestDistance) {
      lowestDistance = distance;
      nearestLocation = location;
    }
  }

  return nearestLocation;
};

/* __tests__ */

import { getTheNearestLocation } from '../location.js';

test('getTheNearestLocation', () => {
  const locations = [
    ['Park', [10, 5]],
    ['Sea', [1, 3]],
    ['Museum', [8, 4]],
  ];

  const currentPoint = [5, 5];

  const result = getTheNearestLocation([], currentPoint);
  expect(result).toBeNull();

  const result2 = getTheNearestLocation(locations, currentPoint);
  expect(result2).toEqual(['Museum', [8, 4]]);

  const currentPoint2 = [1, 3];

  const result3 = getTheNearestLocation(locations, currentPoint2);
  expect(result3).toEqual(['Sea', [1, 3]]);

  const locations2 = [
    ['Hotel', [7, 3]],
    ['Square', [5, 6]],
  ];

  const result4 = getTheNearestLocation(locations2, currentPoint2);
  expect(result4).toEqual(['Square', [5, 6]]);
});
