// Создайте класс File, который представляет собой абстракцию над файлом (обёртка над синхронными функциями модуля fs). Реализуйте в этом классе метод read(). 
// Этот метод проверяет можно ли прочитать файл и если да, то читает его, если нет, то бросает исключения двух видов:
// 1) Если файла не существует – NotExistsError
// 2) Если файл нельзя прочитать, но он существует – NotReadableError

import fs from 'fs';
import NotExistsError from './errors/NotExistsError.js';
import NotReadableError from './errors/NotReadableError.js';

class File {
  constructor(path) {
    this.path = path;
  }

  read() {
    try {
      return fs.readFileSync(this.path, 'utf-8');
    } catch (error) {
      if (!fs.existsSync(this.path)) {
        throw new NotExistsError();
      } else if (!fs.accessSync(this.path)) {
        throw new NotReadableError();
      }
      throw new Error('Another type of Error');
    }
  }
}

export default File;

/* src/errors/FileError.js */

// Реализуйте класс FileError, который наследуется от Error. Это базовое исключение для данной библиотеки.

class FileError extends Error {}

export default FileError;

/* src/errors/NotReadableError.js */

// Реализуйте классы исключения. Они должны наследоваться от базового класса исключений для данной библиотеки.

import FileError from './FileError';

class NotReadableError extends FileError {}

export default NotReadableError;

/* src/errors/NotExistsError.js */

import FileError from './FileError';

class NotExistsError extends FileError {}

export default NotExistsError;

/* src/Utils.js */

// Реализуйте функцию readFiles, которая принимает на вход список файлов и возвращает их содержимое. 
// Если в процессе обработки какого-то файла возникло исключение, то вместо данных этого файла возвращается null.

import File from './File.js';

export const readFiles = (filepaths) => {
  const data = filepaths.reduce((acc, filepath) => {
    try {
      acc.push(new File(filepath).read());
    } catch (error) {
      acc.push(null);
    }
    return acc;
  }, []);
  return data;
};

/* __tests__/File.test.js */

import File from '../src/File.js';
import NotExistsError from '../src/errors/NotExistsError.js';
import NotReadableError from '../src/errors/NotReadableError.js';

test('Read', () => {
  const file = new File('/etc/fstab');
  expect(file.read()).not.toBeFalsy();
});

test('NotExistsError', () => {
  const file = new File('/etc/wopwop');
  expect(() => file.read()).toThrow(NotExistsError);
});

test('NotReadableError', () => {
  const file = new File('/etc/shadow');
  expect(() => file.read()).toThrow(NotReadableError);
});

/* __tests__/Utils.test.js */

import * as Utils from '../src/Utils.js';

test('ReadFiles', () => {
  const values = Utils.readFiles([]);
  expect(values).toEqual([]);
});

test('ReadCorrectFiles', () => {
  const values = Utils.readFiles(['/etc/fstab', '/etc/shadow']);
  expect(values).toHaveLength(2);
});

test('ReadWrongFiles', () => {
  const values = Utils.readFiles(['/etc/shadow', '/opt/asdf']);
  expect(values[1]).toBeNull();
});

/* __tests__/errors.test.js */

import FileError from '../src/errors/FileError.js';
import NotExistsError from '../src/errors/NotExistsError.js';
import NotReadableError from '../src/errors/NotReadableError.js';

test('Create NotExistsError', () => {
  const error = new NotExistsError('');
  expect(error).toBeInstanceOf(FileError);
});

test('Create NotReadableError', () => {
  const error = new NotReadableError('');
  expect(error).toBeInstanceOf(FileError);
});
