// Реализуйте и экспортируйте асинхронную функцию getTypes(), которая анализирует список переданных путей и возвращает массив (в промисе), с описанием того, 
// что находится по каждому из путей в виде строк 'directory' и 'file'.
// Эта функция должна отрабатывать успешно в любом случае. Если во время выполнения асинхронной операции возникла ошибка, то значением для этого пути будет null. 
// Для простоты считаем, что в эту функцию всегда передается как минимум один путь для обработки 
// (иначе придется задействовать механизм, который проходится в курсах далее).

import fsp from 'fs/promises';

export function getTypes(paths) {
  const initPromise = Promise.resolve([]);
  return paths.reduce((acc, path) => {
    const newAcc = acc.then((contents) => fsp.stat(path)
      .then((data) => {
        if (data.isDirectory()) {
          return contents.concat(['directory']);
        }
        return contents.concat(['file']);
      })
      .catch(() => contents.concat([null])));
    return newAcc;
  }, initPromise);
}

/* __tests__ */

import { getTypes } from '../file.js';

test('getTypes 1', () => {
  const actual = getTypes(['undefined']);
  return expect(actual).resolves.toEqual([null]);
});

test('getTypes 2', () => {
  const actual = getTypes(['/etc']);
  return expect(actual).resolves.toEqual(['directory']);
});

test('getTypes 3', () => {
  const actual = getTypes(['/etc/hosts']);
  return expect(actual).resolves.toEqual(['file']);
});

test('getTypes 4', () => {
  const actual = getTypes(['/etc/hosts', '/undefined', '/etc/bashrc', '/etc']);
  return expect(actual).resolves.toEqual(['file', null, null, 'directory']);
});

test('getTypes 5', () => {
  const actual = getTypes(['/undefined', '/etc/hosts', '/et', '/etc/bashrc']);
  return expect(actual).resolves.toEqual([null, 'file', null, null]);
});
