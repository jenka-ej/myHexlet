// Напишите программу, которая выводит на экран:
// - Did Joffrey agree?
// - He did. He also said "I love using \n".
// При этом программа использует только один console.log(), но результат на экране должен выглядеть в точности, как показано выше.

console.log('- Did Joffrey agree?\n- He did. He also said "I love using \\n".');

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
  const expected = '- Did Joffrey agree?\n- He did. He also said "I love using \\n".';
  await import(getPathToSolution());

  const output = spy.mock.calls.map((args) => args.join(' ')).join('\n');
  expect(output).toEqual(expected);
  expect(spy).toHaveBeenCalledTimes(1);
});
