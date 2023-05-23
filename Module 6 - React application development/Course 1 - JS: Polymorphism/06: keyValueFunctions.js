// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход объект базы данных и меняет в нём ключи и значения местами.
// swapKeyValue — полиморфная функция, она может работать с любой реализацией key-value, имеющей такой же интерфейс.

export default (obj) => {
  const temp = {};
  Object.entries(obj.toObject())
    .forEach(([key, value]) => {
      temp[value] = key;
    });
  Object.values(temp)
    .forEach((value) => obj.unset(value));
  Object.entries(temp)
    .forEach(([key, value]) => obj.set(key, value));
};

/* __tests__/keyValueFunctions.test.js */

import InMemoryKV from '../InMemoryKV.js';
import swapKeyValue from '../keyValueFunctions.js';

it('swapKeyValue', () => {
  const map = new InMemoryKV({ key: 10 });
  map.set('key2', 'value2');
  swapKeyValue(map);

  expect(map.get('key')).toBeNull();
  expect(map.get(10)).toBe('key');
  expect(map.get('value2')).toBe('key2');
});

it('swapKeyValue2', () => {
  const map = new InMemoryKV({ foo: 'bar', bar: 'zoo' });
  swapKeyValue(map);

  expect(map.toObject()).toEqual({ bar: 'foo', zoo: 'bar' });
});
