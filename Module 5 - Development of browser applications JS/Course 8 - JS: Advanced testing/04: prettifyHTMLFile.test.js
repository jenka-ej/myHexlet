// Протестируйте функцию, которая форматирует и изменяет указанный HTML-файл.

// содержимое до форматирования:

// <div><p>hello <b>world</b></p></div>

// await prettifyHTMLFile('/path/to/file');
 
// содержимое после форматирования:

// <div>
//     <p>hello <b>world</b></p>
// </div>

/* functions.js */

import fs from 'fs/promises';
import prettier from 'prettier';

const { format: beautify } = prettier;

const options = {
  parser: 'html',
  tabWidth: 4,
};

const functions = {
  right1: async (filepath) => {
    const data = await fs.readFile(filepath, 'utf-8');
    await fs.writeFile(filepath, beautify(data, options));
  },
  wrong1: async (filepath) => {
    const data = await fs.readFile(filepath, 'utf-8');
    await fs.writeFile(filepath, data);
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import { fileURLToPath } from 'url';
import os from 'os';
import path from 'path';
import fs from 'fs/promises';
import getFunction from '../functions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prettifyHTMLFile = getFunction();

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFile(getFixturePath(filename));

test('prettify', async () => {
  const dataBefore = await readFile('before.html');
  const pathToCopy = path.join(os.tmpdir(), 'tmp.html');
  await fs.writeFile(pathToCopy, dataBefore, 'utf-8');
  await prettifyHTMLFile(pathToCopy);
  const dataAfter = await readFile('after.html');
  const result = await fs.readFile(pathToCopy);
  expect(result).toEqual(dataAfter);
});
