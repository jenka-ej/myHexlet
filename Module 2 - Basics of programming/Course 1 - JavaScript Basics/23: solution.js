// Реализуйте функцию sayHurrayThreeTimes(), которая возвращает строку 'hurray! hurray! hurray!'.

const sayHurrayThreeTimes = () => {
  const word = 'hurray!';
  return `${word} ${word} ${word}`;
};

export default sayHurrayThreeTimes;

/* __tests__ */

import { test, expect } from '@jest/globals';
import sayHurrayThreeTimes from '../solution';

test('sayHurrayThreeTimes', () => {
  expect(sayHurrayThreeTimes()).toBe('hurray! hurray! hurray!');
});
