// Реализуйте и экспортируйте функцию getWeekends(), которая возвращает массив из двух элементов – названий выходных дней на английском.
// Функция принимает на вход параметр – формат возврата. Всего есть два возможных значения:
// 1) 'long' (по умолчанию) – вернётся массив, содержащий значения saturday и sunday
// 2) 'short' – вернётся массив со значениями sat и sun

export const getWeekends = (format) => {
  const longFormat = ['saturday', 'sunday'];
  const shortFormat = ['sat', 'sun'];

  switch (format) {
    case 'long':
      return longFormat;
    case 'short':
      return shortFormat;
    default:
      return longFormat;
  }
};

/* __tests__ */

import { getWeekends } from '../dates.js';

test('get', () => {
  expect(getWeekends()).toEqual(['saturday', 'sunday']);
  expect(getWeekends('long')).toEqual(['saturday', 'sunday']);
  expect(getWeekends('short')).toEqual(['sat', 'sun']);
});
