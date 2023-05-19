// Напишите тесты для функции set(obj, path, value) возвращающей объект, в котором она изменяет (или добавляет) значение по указанному пути. Функция мутирует объект.

import _ from 'lodash';

const functions = {
  right1: _.set,
  wrong1: (obj, path, value) => {
    _.set(obj, path, value);
    obj.key = 'value';
    return obj;
  },
  wrong2: (obj, path, value) => {
    obj[path] = value;
    return obj;
  },
  wrong3: (obj, path, value) => {
    if (_.get(obj, path) !== undefined) {
      _.set(obj, path, value);
    }
    return obj;
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import _ from 'lodash';

import getFunction from '../functions.js';

const set = getFunction();

let data;
let dataCopy;

beforeEach(() => {
  data = {
    a: [
      {
        b: {
          c: 3,
        },
      },
    ],
  };
  dataCopy = _.cloneDeep(data);
});

test('plain set', () => {
  set(data, 'a', 'value');
  dataCopy.a = 'value';
  expect(data).toEqual(dataCopy);
});

test('nested set', () => {
  set(data, 'a[0].b.c', true);
  dataCopy.a[0].b.c = true;
  expect(data).toEqual(dataCopy);
});

test('set new property', () => {
  set(data, 'a[0].b.d', false);
  dataCopy.a[0].b.d = false;
  expect(data).toEqual(dataCopy);
});
