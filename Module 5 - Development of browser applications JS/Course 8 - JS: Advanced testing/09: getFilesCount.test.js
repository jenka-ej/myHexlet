// Протестируйте функцию getFilesCount(path, log), которая считает количество всех файлов в указанной директории и всех поддиректориях. 
// В отличие от предыдущей версии задания, здесь нас интересует только то, что эта функция выполняет логирование. 
// Мы хотим убедиться, что она один раз отправляет сообщение c текстом 'Go!' в лог. Для этого придётся воспользоваться моком.

/* functions.js */

import klawSync from 'klaw-sync';
import winston from 'winston';

const defaultLogger = winston.createLogger();
defaultLogger.on('finish', () => {
  throw new Error('Cannot send data to log!');
});

const functions = {
  right1: (filepath, log = () => defaultLogger.end()) => {
    log('Go!');
    return klawSync(filepath, { nodir: true }).length;
  },
  wrong1: (filepath, log = () => defaultLogger.end()) => {
    log('Go!');
    log('Go!');
    return klawSync(filepath, { nodir: true }).length;
  },
  wrong2: (filepath, log = () => defaultLogger.end()) => {
    log('Boom!');
    return klawSync(filepath, { nodir: true }).length;
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import { fileURLToPath } from 'url';
import path from 'path';
import { jest } from '@jest/globals';
import getFunction from '../functions.js';

const getFilesCount = getFunction();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

test('log', () => {
  const mock = jest.fn();

  getFilesCount(getFixturePath('nested'), mock);
  expect(mock).toHaveBeenCalledTimes(1);
  expect(mock).toHaveBeenCalledWith('Go!');
});
