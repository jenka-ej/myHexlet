// Реализуйте и экспортируйте функцию по умолчанию, которая формирует из переданного объекта другой объект, включающий только указанные свойства. Параметры:
// 1) Исходный объект
// 2) Массив имен свойств

const pick = (obj, mass) => {
  const cb = (acc, key) => {
    if (Object.getOwnPropertyDescriptor(obj, key)) {
      acc[key] = obj[key];
      return acc;
    }
    return acc;
  };
  return mass.reduce(cb, {});
};
export default pick;

/* __tests__ */

import pick from '../objects.js';

describe('pick', () => {
  it('test 1', () => {
    const data = {};
    expect(pick(data, [])).toEqual({});
    expect(pick(data, ['undefined', 'another'])).toEqual({});
  });

  it('test 2', () => {
    const data = {
      user: 'ubuntu',
      os: 'linux',
    };
    expect(pick(data, [])).toEqual({});
    expect(Object.keys(pick(data, ['none'])).length).toBe(0);
    expect(pick(data, ['none'])).toEqual({});
    expect(pick(data, ['user'])).toEqual({ user: 'ubuntu' });
    expect(pick(data, ['os', 'user'])).toEqual(data);
  });

  it('test 3', () => {
    const data = {
      user: 'ubuntu',
      os: 'linux',
      virtual: false,
    };
    expect(pick(data, ['virtual'])).toEqual({ virtual: false });
    expect(pick(data, ['os', 'user', 'virtual'])).toEqual(data);
  });
});
