// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход путь (абсолютный или относительный) и возвращает информацию о файлах и директориях, 
// расположенных по этому пути. Данные возвращаются в виде массива объектов, где каждый элемент — это информация о конкретном файле: 
// его путь и описание доступов (stat.mode). Объекты в массиве должны быть отсортированы по имени файла.

import _ from 'lodash';
import path from 'path';
import fsp from 'fs/promises';

export default async function ls(anyPath) {
  const absPath = path.resolve(anyPath);
  const result = [];
  const statAbsPath = await fsp.stat(absPath);
  if (statAbsPath.isFile()) {
    result.push({ filepath: absPath, mode: statAbsPath.mode });
  }
  if (!statAbsPath.isFile()) {
    const filenames = await fsp.readdir(absPath);
    const statsFilenames = await Promise.all(filenames.map(async (filename) => {
      const statFilename = await fsp.stat(path.join(absPath, filename));
      return statFilename.mode;
    }));
    _.zipWith(filenames, statsFilenames, (a, b) => {
      result.push({ filepath: path.join(absPath, a), mode: b });
    });
  }
  return result;
}

import { fileURLToPath } from 'url';
import path from 'path';
import ls from '../ls.js';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('ls dir', async () => {
  const expected = [
    { filepath: '/var/backups', mode: 16877 },
    { filepath: '/var/cache', mode: 16877 },
    { filepath: '/var/lib', mode: 16877 },
    { filepath: '/var/local', mode: 17917 },
    { filepath: '/var/lock', mode: 17407 },
    { filepath: '/var/log', mode: 16877 },
    { filepath: '/var/mail', mode: 17917 },
    { filepath: '/var/opt', mode: 16877 },
    { filepath: '/var/run', mode: 16877 },
    { filepath: '/var/spool', mode: 16877 },
    { filepath: '/var/tmp', mode: 17407 },
  ];
  const actual = await ls('/var');
  expect(actual).toEqual(expected);
});

test('ls file', async () => {
  const expected = [
    { filepath: '/etc/passwd', mode: 33188 },
  ];
  const actual = await ls('/etc/passwd');
  expect(actual).toEqual(expected);
});

test('ls file relative path', async () => {
  const expected = [
    { filepath: '/etc/passwd', mode: 33188 },
  ];
  const filepath = path.relative(__dirname, '/etc/passwd');
  const actual = await ls(filepath);
  expect(actual).toEqual(expected);
});
