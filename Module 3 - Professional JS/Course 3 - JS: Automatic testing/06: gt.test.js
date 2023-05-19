// Напишите тесты для функции gt(value, other), которая возвращает true в том случае, если value > other, и false в иных случаях.

import _ from 'lodash';

const functions = {
  right: _.gt,
  wrong1: _.gte,
  wrong2: (a, b) => a !== b,
  wrong3: () => false,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right';
  return functions[name];
};

/* __tests__ */

import getFunction from '../functions.js';

const gt = getFunction();

test('gt', () => {
  expect(gt(0, 0)).toBe(false);
  expect(gt(1, 0)).toBe(true);
  expect(gt(-3, 1)).toBe(false);
});
