// Реализуйте и экспортируйте асинхронную функцию touch(), которая создаёт файл, если его не существует. Если файл существует, то функция должна успешно завершиться.

import fsp from 'fs/promises';

export function touch(path) {
  return fsp.access(path)
    .catch(() => fsp.writeFile(path, 'text'));
}

/* __tests__ */

import os from 'os';
import fsp from 'fs/promises';
import _ from 'lodash';
import { touch } from '../file.js';

test('touch 1', () => {
  const filepath = `${os.tmpdir()}/example`;
  return fsp.unlink(filepath)
    .catch(_.noop)
    .then(() => touch(filepath))
    .then(() => fsp.access(filepath))
    .then((data) => {
      expect(data).toBe();
    });
});

test('touch 2', () => {
  const filepath = `${os.tmpdir()}/example`;
  return fsp.unlink(filepath)
    .catch(_.noop)
    .then(() => fsp.writeFile(filepath, 'content'))
    .then(() => touch(filepath))
    .then(() => fsp.readFile(filepath, 'utf-8'))
    .then((data) => {
      expect(data).toBe('content');
    });
});

test('touch 3', () => {
  const filepath = `${os.tmpdir()}/example`;
  return fsp.unlink(filepath)
    .catch(_.noop)
    .then(() => fsp.writeFile(filepath, 'text'))
    .then(() => touch(filepath))
    .then(() => fsp.readFile(filepath, 'utf-8'))
    .then((data) => {
      expect(data).toBe('text');
    });
});
