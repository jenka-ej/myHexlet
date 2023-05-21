// Реализуйте и экспортируйте по умолчанию функцию, которая находит команду победителя для конкретной суперсерии. 
// Победитель определяется как команда, у которой больше побед (не количество забитых шайб) в конкретной серии. 
// Функция принимает на вход массив, в котором каждый элемент — это массив, описывающий счет в конкретной игре (сколько шайб забила Канада и СССР). 
// Результат функции – название страны: 'canada', 'ussr'. Если суперсерия закончилась в ничью, то нужно вернуть null.

export default (scores) => {
  let result = 0;
  for (const score of scores) {
    result += Math.sign(score[0] - score[1]);
  }

  if (result > 0) {
    return 'canada';
  }
  if (result < 0) {
    return 'ussr';
  }

  return null;
};

/* __tests__ */

import getSuperSeriesWinner from '../superseries.js';

test('super series 1', () => {
  const scores = [
    [3, 7],
    [4, 1],
    [4, 4],
    [3, 5],
    [4, 5],
    [3, 2],
    [4, 3],
    [6, 5],
  ];

  const result = getSuperSeriesWinner(scores);
  expect(result).toBe('canada');
});

test('super series 2', () => {
  const scores = [
    [3, 3],
    [4, 1],
    [5, 8],
    [5, 5],
    [2, 3],
    [2, 5],
    [4, 4],
    [2, 3],
  ];

  const result = getSuperSeriesWinner(scores);
  expect(result).toBe('ussr');
});

test('super series 3', () => {
  const scores = [
    [3, 2],
    [4, 1],
    [5, 8],
    [5, 5],
    [2, 2],
    [2, 4],
    [4, 2],
    [2, 4],
  ];

  const result = getSuperSeriesWinner(scores);
  expect(result).toBeNull();
});

test('super series 4', () => {
  const scores = [
    [3, 3],
    [4, 1],
    [5, 8],
    [5, 5],
    [2, 3],
    [2, 5],
    [4, 4],
    [4, 3],
  ];

  const result = getSuperSeriesWinner(scores);
  expect(result).toBe('ussr');
});
