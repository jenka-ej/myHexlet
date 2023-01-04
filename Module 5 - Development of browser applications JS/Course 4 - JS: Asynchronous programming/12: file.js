// Это упражнение вы уже делали, но теперь то же самое нужно сделать с помощью промисов.
// Реализуйте и экспортируйте асинхронную функцию getDirectorySize(), которая считает размер переданной директории (не включая поддиректории).

import path from 'path';
import _ from 'lodash';
import fsp from 'fs/promises';

export function getDirectorySize(dirPath) {
  const promise1 = fsp.readdir(dirPath).then((fileNames) => {
    const absPaths = fileNames.map((fileName) => path.join(dirPath, fileName));
    const promises = absPaths.map((absPath) => fsp.stat(absPath));
    return Promise.all(promises);
  });
  return promise1.then((stats) => _.sumBy(stats.filter((stat) => stat.isFile()), 'size'));
}

/* __tests__ */

import path from 'path';
import fs from 'fs';
import { getDirectorySize } from '../file.js';

const getPath = (dirpath) => path.join('__fixtures__', dirpath);

test('getDirectorySize 1', () => {
  const dirpath = getPath('/undefined');
  const promise = getDirectorySize(dirpath);
  return expect(promise).rejects.toThrow();
});

test('getDirectorySize 2', () => {
  const dirpath = getPath('/opt');
  if (!fs.existsSync(dirpath)) {
    fs.mkdirSync(dirpath);
  }
  const promise = getDirectorySize(dirpath);
  return expect(promise).resolves.toBe(0);
});

test('getDirectorySize 3', () => {
  const dirpath = getPath('/usr/local/bin');
  const promise = getDirectorySize(dirpath);
  return expect(promise).resolves.toBe(1240);
});

test('getDirectorySize 4', () => {
  const dirpath = getPath('/usr/local/lib');
  const promise = getDirectorySize(dirpath);
  return expect(promise).resolves.toBe(0);
});
