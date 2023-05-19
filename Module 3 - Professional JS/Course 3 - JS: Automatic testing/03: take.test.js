// Напишите тесты для функции take(items, n), которая возвращает первые n элементов из массива. 
// По умолчанию n равен 1. Если n отрицательное число, то возвращается пустой массив.

import _ from 'lodash';

const functions = {
  right1: (items, n = 1) => _.take(items, n),
  wrong1: (items, n = 1) => (n > 1 ? items.slice() : items.slice(0, n)),
  wrong2: (items, n = 1) => (n <= items.length ? items.slice(0, n) : []),
  wrong3: (items, n = 5) => items.slice(0, n),
  wrong4: (items, n = 1) => (items.length === 0 ? [0] : items.slice(0, n)),
  wrong5: (items, n = 1) => items.slice(0, n),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import { strict as assert } from 'assert';
import getFunction from '../functions.js';

const take = getFunction();

assert.deepStrictEqual(take(['one', 'two', 'three'], 2), ['one', 'two']);
assert.deepStrictEqual(take(['one', 'two', 8], 9), ['one', 'two', 8]);
assert.deepStrictEqual(take([1, 2]), [1]);
assert.deepStrictEqual(take([]), []);
assert.deepStrictEqual(take([4, 3], -1), []);
