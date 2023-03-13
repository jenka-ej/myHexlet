// Имеется функция read(), которая принимает в качестве аргумента путь до файла в виде строки и читает содержимое указанного файла. 
// Напишите негативные тесты функции read(), проверяющие ошибочные ситуации. Рассмотрите следующие ситуации:
// 1) Файл не найден
// 2) В функцию передан путь до существующей директории

/* functions.js */

import fs from 'fs';

const functions = {
  right1: fs.readFileSync,
  wrong1: (path) => fs.readdirSync(path),
  wrong2: (path) => {
    if (!fs.existsSync(path)) {
      return;
    }
    fs.readFileSync(path);
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import getFunction from '../functions.js';

const read = getFunction();

test('file not exist', () => {
  expect(() => {
    read('/undefined');
  }).toThrow();
});

test('directory path', () => {
  expect(() => {
    read('/etc');
  }).toThrow();
});
