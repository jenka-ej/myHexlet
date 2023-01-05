// Реализуйте и экспортируйте асинхронную функцию exchange(), которая обменивает содержимое двух файлов.

import fsp from 'fs/promises';

export const exchange = async (path1, path2) => {
  const promise1 = fsp.readFile(path1);
  const promise2 = fsp.readFile(path2);
  const [data1, data2] = await Promise.all([promise1, promise2]);
  const promise3 = fsp.writeFile(path1, data2);
  const promise4 = fsp.writeFile(path2, data1);
  return Promise.all([promise3, promise4]);
};

/* __tests__ */

import os from 'os';
import fsp from 'fs/promises';
import { exchange } from '../file.js';

test('exchange 1', async () => {
  const firstPath = `${os.tmpdir()}/first`;
  const secondPath = `${os.tmpdir()}/second`;
  const firstContent = 'content1';
  const secondContent = 'content2';
  await fsp.writeFile(firstPath, firstContent);
  await fsp.writeFile(secondPath, secondContent);
  await exchange(firstPath, secondPath);

  const result1 = await fsp.readFile(firstPath, 'utf-8');
  expect(result1).toBe(secondContent);
  const result2 = await fsp.readFile(secondPath, 'utf-8');
  expect(result2).toBe(firstContent);
});
