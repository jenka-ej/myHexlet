// Реализуйте и экспортируйте по умолчанию функцию, которая "промисифицирует" асинхронные функции с колбеками.

const promisify = (fn) => (...args) => {
  const result = new Promise((resolve, reject) => {
    fn(...args, (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
  return result;
};
export default promisify;

/* __tests__ */

import path from 'path';
import fs from 'fs';
import os from 'os';
import promisify from '../promisify.js';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);
const mkdtemp = promisify(fs.mkdtemp);

test('promisify', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'foo-'));
  const filepath = path.join(directory, 'file');
  await expect(readFile(filepath)).rejects.toThrow();
  await expect(writeFile(filepath, 'content')).resolves.not.toThrow();
  await expect(access(filepath)).resolves.not.toThrow();
  await expect(readFile(filepath, 'utf-8')).resolves.toEqual('content');
});

test('promise reject', async () => {
  const filepath = 'undefined';
  await expect(readFile(filepath)).rejects.toThrow();
});
