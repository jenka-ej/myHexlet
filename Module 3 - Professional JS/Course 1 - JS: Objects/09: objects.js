// Реализуйте и экспортируйте по умолчанию функцию, которая заполняет объект данными из другого объекта по разрешенному списку ключей. Параметры:
// 1) Исходный объект
// 2) Список ключей которые нужно заменить
// 3) Данные, которые нужно сливать в исходный объект
// 4) В случае, когда список ключей пустой, нужно сливать все данные полностью

import _ from 'lodash';

const fill = (obj1, mass, obj2) => {
  if (mass.length === 0) {
    return Object.assign(obj1, obj2);
  }
  return Object.assign(obj1, _.pick(obj2, mass));
};
export default fill;

/* __tests__ */

import fill from '../objects.js';

let object;

const data = {
  key2: 'value3',
  key3: 'val',
  key4: 'boom!',
  key: 'another value',
};

beforeEach(() => {
  object = {
    key: 'value',
    key2: 'value2',
  };
});

it('fill 1', () => {
  fill(object, ['key2'], data);
  const result = {
    key: 'value',
    key2: 'value3',
  };
  expect(object).toEqual(result);
});

it('fill 2', () => {
  fill(object, ['key', 'key2', 'key10'], data);
  const result = {
    key: 'another value',
    key2: 'value3',
  };
  expect(object).toEqual(result);
});

it('fill 3', () => {
  fill(object, [], data);
  expect(object).toEqual(data);
});
