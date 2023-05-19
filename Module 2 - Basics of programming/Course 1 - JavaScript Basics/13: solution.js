// Вам даны три переменные с фамилиями разных людей. Составьте и выведите на экран слово из символов в таком порядке:
// 1) Третий символ из первой строки
// 2) Второй символ из второй строки
// 3) Четвертый символ из третьей строки
// 4) Пятый символ из второй строки
// 5) Третий символ из второй строки
// Попробуйте использовать интерполяцию. Внутри фигурных скобок можно размещать не только переменные, но и отдельные символы строки,
// извлечённые по индексу (с помощью квадратных скобок).

const one = 'Naharis';
const two = 'Mormont';
const three = 'Sand';
console.log(`${one[2]}${two[1]}${three[3]}${two[4]}${two[2]}`);

/* __tests__ */

import {
  jest, test, beforeEach, expect,
} from '@jest/globals';

const getPathToSolution = () => `${process.cwd()}/solution.js`;

let spy;

beforeEach(() => {
  spy = jest.spyOn(console, 'log');
});

test('solution output', async () => {
  const expected = 'hodor';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
