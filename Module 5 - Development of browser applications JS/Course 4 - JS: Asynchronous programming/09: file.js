// Реализуйте и экспортируйте асинхронную функцию reverse(), которая изменяет порядок расположения строк в файле на обратный. Функция должна перезаписать файл.

import fsp from 'fs/promises';

export function reverse(path) {
  return fsp.readFile(path, 'utf-8')
    .then((content) => content.split('\n').reverse().join('\n'))
    .then((newData) => fsp.writeFile(path, newData));
}

/* __tests__ */

import fsp from 'fs/promises';
import path from 'path';
import { reverse } from '../file.js';

const reverseLines = (data) => data.split('\n').reverse().join('\n');

test('reverse 1', async () => {
  const exampleFilePath = path.resolve(process.cwd(), '__fixtures__/example');
  const content = await fsp.readFile(exampleFilePath, 'utf-8');
  const filepath = '/tmp/example';
  await fsp.writeFile(filepath, content);

  const expected = reverseLines(content);

  await expect(reverse(filepath)).resolves.not.toThrow();
  await expect(fsp.readFile(filepath, 'utf-8')).resolves.toEqual(expected);
});
