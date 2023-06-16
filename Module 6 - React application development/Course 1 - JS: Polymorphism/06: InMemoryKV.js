// Реализуйте и экспортируйте по умолчанию класс InMemoryKV, который представляет собой in-memory key-value хранилище. 
// Данные внутри него хранятся в обычном объекте. Интерфейс этого класса совпадает с FileKV за исключением конструктора. 
// Конструктор InMemoryKV принимает на вход объект, который становится начальным значением базы данных.

import _ from 'lodash';

export default class InMemoryKV {
  constructor(object = {}) {
    this.object = _.cloneDeep(object);
  }

  set(key, value) {
    const updatedData = { ...this.object, [key]: value };
    this.object = updatedData;
  }

  unset(key) {
    const updatedData = _.omit(this.object, key);
    this.object = updatedData;
  }

  get(key, defaultValue = null) {
    return _.get(this.object, key, defaultValue);
  }

  toObject() {
    return _.cloneDeep(this.object);
  }
}

/* keyValueFunctions.js */
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

/* __tests__/InMemoryKV.test.js */

import _ from 'lodash';
import InMemoryKV from '../InMemoryKV.js';

describe('InMemoryKV', () => {
  const obj = { key: 10 };
  const cloneObj = _.cloneDeep(obj);

  it('get, set, unset, toObject', () => {
    const map = new InMemoryKV(obj);

    expect(map.get('key2')).toBeNull();
    expect(map.get('key2', 'default')).toBe('default');
    expect(map.get('key')).toBe(10);
    expect(map.get('key', 'default')).toBe(10);

    map.set('key2', 'value2');
    map.set('key', 'value');

    expect(map.get('key2', 'default')).toBe('value2');
    expect(map.get('key2')).toBe('value2');
    expect(map.get('key')).toBe('value');

    map.unset('key');

    expect(map.get('key')).toBeNull();
    expect(map.toObject()).toEqual({ key2: 'value2' });
  });

  it('get default value', () => {
    const map = new InMemoryKV(obj);

    expect(map.get('key2', 'default')).toBe('default');

    map.set('key2', false);

    expect(map.get('key2', 'default')).toBeFalsy();
  });

  it('must be immutable', () => {
    const map = new InMemoryKV(obj);
    obj.key2 = 'value2';

    expect(map.toObject()).toEqual(cloneObj);

    const map2 = map.toObject();
    map2.key2 = 'value2';
    expect(map.toObject()).toEqual(cloneObj);
  });

  it('must be immutable with deep object', () => {
    const deepObj = { key1: 'value1', key2: { key3: 'value2' } };
    const cloneDeepObj = _.cloneDeep(deepObj);
    const map = new InMemoryKV(deepObj);

    const map2 = map.toObject();
    map2.key2.key3 = 'another_value';
    expect(map.toObject()).not.toBe(cloneDeepObj);
    expect(map.toObject()).toEqual(cloneDeepObj);
  });
});
