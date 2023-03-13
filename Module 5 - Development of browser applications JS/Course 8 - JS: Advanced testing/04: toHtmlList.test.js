// Протестируйте функцию, которая преобразует различные входные форматы в выходной HTML.
// Поддерживаются yml/json/csv

// const html1 = await toHtmlList('/path/to/yaml/file');
// const html2 = await toHtmlList('/path/to/json/file');
// const html3 = await toHtmlList('/path/to/csv/file');

// Каждый из входных файлов для этой функции содержит список элементов из которых формируется элемент <ul>. Входные данные и выходной HTML можно подсмотреть в фикстурах.
// Ваша задача, пропустить через эту функцию входные файлы и сравнить результат работы функции с ожидаемым значением находящимся в файле __fixtures__/result.html. 
// Функция принимает на вход путь к файлу.

/* functions.js */

import fs from 'fs/promises';
import path from 'path';
import yaml from 'js-yaml';
import papa from 'papaparse';

const parsers1 = {
  csv: (content) => papa.parse(content).data[0],
  json: JSON.parse,
  yml: yaml.load,
};

const parsers2 = {
  json: JSON.parse,
  yml: yaml.load,
  csv: () => [],
};

const parsers3 = {
  csv: (content) => papa.parse(content).data[0],
  json: JSON.parse,
  yml: () => [],
};

const parsers4 = {
  csv: (content) => papa.parse(content).data[0],
  yml: yaml.load,
  json: () => [],
};

const genSolution = (parsers) => async (filepath) => {
  const content = await fs.readFile(filepath, 'utf-8');
  const type = path.extname(filepath).slice(1);
  const items = parsers[type](content);
  const lis = items.map((item) => `  <li>${item}</li>`);
  return `<ul>\n${lis.join('\n')}\n</ul>`;
};

const functions = {
  right1: genSolution(parsers1),
  wrong1: genSolution(parsers2),
  wrong2: genSolution(parsers3),
  wrong3: genSolution(parsers4),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import path from 'path';
import getFunction from '../functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const toHtmlList = getFunction();

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = async (filename) => fs.readFile(getFixturePath(filename), 'utf-8');
const result = await readFile('result.html');
test.each(['list.csv', 'list.json', 'list.yml'])('Correct', async (pathToFile) => {
  expect(await toHtmlList(getFixturePath(pathToFile))).toBe(result.trim());
});
