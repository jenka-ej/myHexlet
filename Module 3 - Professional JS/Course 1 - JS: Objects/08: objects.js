// Реализуйте и экспортируйте по умолчанию функцию, которая извлекает из объекта любой глубины вложенности значение по указанным ключам. Параметры:
// 1) Исходный объект
// 2) Цепочка ключей (массив), по которой ведётся поиск значения
// 3) В случае, когда добраться до значения невозможно, возвращается null

const get = (obj, mass) => {
  let path = obj;
  for (const key of mass) {
    if (Object.hasOwn(path, key)) {
      path = path[key];
    } else {
      return null;
    }
  }
  return path;
};
export default get;

/* __tests__ */

import get from '../objects.js';

it('get', () => {
  const data = {
    user: 'ubuntu',
    hosts: {
      0: {
        name: 'web1',
      },
      1: {
        name: 'web2',
        null: 3,
        active: false,
        company: {
          name: 'hexlet',
        },
      },
    },
  };

  expect(get(data, [null])).toBeNull();
  expect(get(data, ['undefined'])).toBeNull();
  expect(get(data, ['user'])).toEqual('ubuntu');
  expect(get(data, ['user', 'ubuntu'])).toBeNull();
  expect(get(data, ['hosts', 1, 'name'])).toEqual('web2');
  expect(get(data, ['hosts', 5])).toBeNull();
  expect(get(data, ['hosts', 0])).toEqual({ name: 'web1' });
  expect(get(data, ['hosts', 1, null])).toEqual(3);
  expect(get(data, ['user', 'name', 'name'])).toBeNull();
  expect(get(data, ['hosts', 1, 'active'])).toBe(false);
  expect(get(data, ['hosts', 1, 'company', 'name'])).toBe('hexlet');
});
