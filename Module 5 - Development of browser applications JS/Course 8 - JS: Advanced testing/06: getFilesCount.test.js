// Протестируйте функцию getFilesCount(), которая считает количество всех файлов в указанной директории и всех поддиректориях.

// const filesCount = getFilesCount('/path/to/directory');

// У этой функции есть дополнительное поведение. Во время обхода файлов, она записывает информацию об этом (какие файлы были задействованы) в специальный файл, 
// который называется журналом действий или логом.
// Запись в файл является нежелательным побочным эффектом. Каждый запуск будет заполнять какой-то файл, который мы никак не используем. От него нужно избавиться. 
// Все что мы хотим – чтобы функция считала количество файлов. Сделать это можно так. 
// Для записи в файл, функция getFilesCount(), использует другую функцию, которую можно подменить:

// const getFilesCount = (path, log = writeDataToFile) => {
//   // Где-то внутри  во время работы
//   writeDataToFile(`file ${name} has been processed`);
// };

// Для подмены нужно передать вторым параметром функцию-пустышку, которая не будет ничего делать. В таком случае ее вызов внутри getFilesCount() хоть и отработает, 
// но не породит побочного эффекта.

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
  wrong1: (filepath) => klawSync(filepath),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import { fileURLToPath } from 'url';
import path from 'path';
// import _ from 'lodash';
import getFunction from '../functions.js';

const getFilesCount = getFunction();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (name) => path.join(__dirname, '..', '__fixtures__', name);

test('flat && nested', () => {
  expect(getFilesCount(getFixturePath('flat'), () => {})).toEqual(3);
  expect(getFilesCount(getFixturePath('nested'), () => { })).toEqual(4);
});
