// Реализуйте и экспортируйте по умолчанию функцию, которая выполняет поверхностное копирование объектов.

import isObject from 'lodash/isObject.js';

const cloneDeep = (obj) => {
  const getChildren = (obj1) => Object.keys(obj1);
  const massiveKeys = getChildren(obj);
  const cb = (acc, key) => {
    const value = obj[key];
    if (isObject(value)) {
      acc[key] = cloneDeep(value);
      return acc;
    }
    acc[key] = value;
    return acc;
  };
  return massiveKeys.reduce(cb, {});
};
export default cloneDeep;

/* __tests__ */

import cloneDeep from '../objects.js';

const data = {
  key: 'value',
  key2: {
    key: 'innerValue',
    innerKey: {
      anotherKey: 'anotherValue',
    },
  },
};

it('deepClone', () => {
  const clonedData = cloneDeep(data);
  expect(clonedData).toEqual(data);
  expect(clonedData).not.toBe(data);
  expect(clonedData.key2).not.toBe(data.key2);
  expect(clonedData.key2.innerKey).not.toBe(data.key2.innerKey);
});
