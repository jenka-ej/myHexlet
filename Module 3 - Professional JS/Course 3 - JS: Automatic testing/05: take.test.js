// Напишите тесты для функции without(coll, [values]), которая принимает первым параметром массив и возвращает его копию,
// из которой исключены значения, переданные вторым и последующими параметрами.

import _ from 'lodash';

const functions = {
  right1: _.without,
  wrong1: (coll = [], ...values) => {
    const [result] = coll.reduce(([prevColl, vals], item) => {
      const newVals = vals.filter((val) => val !== item);
      const nextColl = newVals.length === vals.length ? [...prevColl, item] : prevColl;
      return [nextColl, newVals];
    }, [[], values]);

    return result;
  },
  wrong2: (coll = [], ...values) => {
    const result = coll.filter((val) => !values.includes(val));
    return result.length === 0 ? null : result;
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import getFunction from '../functions.js';

const without = getFunction();

test('without', () => {
  expect(without([], 3)).toEqual([]);
  expect(without([3, 8, 9, 8, 10], 8, 10)).toEqual([3, 9]);
});
