// Реализуйте и экспортируйте асинхронную функцию compareFileSizes(), которая сравнивает размеры двух файлов и передает результат сравнения в переданную callback-функцию. 
// Если первый файл больше второго, то она передает единицу, если размеры равны, то ноль, иначе — -1.

import fs from 'fs';

export function compareFileSizes(filepath1, filepath2, cb) {
  fs.stat(filepath1, (_error1, filesize1) => {
    fs.stat(filepath2, (_error2, filesize2) => {
      cb(null, Math.sign(filesize1.size - filesize2.size));
    });
  });
}

/* __tests__ */

import { compareFileSizes } from '../info.js';

test('compareFileSizes 1', () => {
  const filepath = '__tests__/test.js';
  return new Promise((resolve) => {
    compareFileSizes(filepath, filepath, (_error1, result) => {
      expect(result).toBe(0);
      resolve(0);
    });
  });
});

test('compareFileSizes 2', () => {
  const filepath1 = '__tests__/test.js';
  const filepath2 = 'Makefile';
  return new Promise((resolve) => {
    compareFileSizes(filepath1, filepath2, (_error1, result) => {
      expect(result).toBe(1);
      resolve();
    });
  });
});

test('compareFileSizes 3', () => {
  const filepath1 = 'Makefile';
  const filepath2 = '__tests__/test.js';
  return new Promise((resolve) => {
    compareFileSizes(filepath1, filepath2, (_error1, result) => {
      expect(result).toBe(-1);
      resolve();
    });
  });
});
