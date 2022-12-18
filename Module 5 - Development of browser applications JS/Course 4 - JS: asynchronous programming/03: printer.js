// Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая читает данные файла по указанному пути и выводит их в консоль.

import fs from 'fs';

export default function print(data) {
  const callback = (_error, dataFile) => console.log(dataFile);
  return fs.readFile(data, 'utf-8', callback);
}

/* __tests__ */

import fs from 'fs';
import { jest } from '@jest/globals';
import print from '../printer.js';

test('readFile', () => {
  const results = [];
  const { log } = console;
  console.log = jest.fn((...args) => {
    results.push(...args);
    log(...args);
  });
  print('__tests__/printer.test.js');

  return new Promise((done) => {
    setTimeout(() => {
      const expected = [fs.readFileSync('__tests__/printer.test.js', 'utf-8')];
      expect(results).toEqual(expected);
      done();
    }, 2000);
  });
});
