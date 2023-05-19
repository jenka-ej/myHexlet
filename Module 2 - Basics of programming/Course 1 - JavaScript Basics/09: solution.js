// Вы столкнулись с таким кодом, который выводит на экран общее количество комнат во владении нынешнего короля:
// const king = 'King Balon the 6th';
// console.log(king + ' has ' + (6 * 17) + ' rooms.');

// Как видите, это магические числа: непонятно, что такое 6 и что такое 17. Можно догадаться, если знать историю королевской семьи: 
// каждый новый король получает в наследство все замки от предков и строит новый замок — точную копию родительского. 
// Эта странная династия просто плодит одинаковые замки…

// Избавьтесь от магических чисел, создав новые переменные, а затем выведите текст на экран:
// King Balon the 6th has 102 rooms.

// Названия переменных должны передавать смысл чисел, но должны при этом оставаться достаточно короткими и ёмкими для комфортного чтения.

const numberOfCastles = 6;
const roomsPerCastle = 17;
console.log(king + ' has ' + numberOfCastles * roomsPerCastle + ' rooms.');

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
  const expected = 'King Balon the 6th has 102 rooms.';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
});
