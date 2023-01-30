// Реализуйте и экспортируйте по умолчанию функцию, которая запускает код, заполняющий элемент <progress> на один процент за 1 секунду. 
// Через 100 секунд процесс должен остановится, так как достигнет максимума.
// Начальное состояние
// <progress value="0" max="100"></progress>
// Через одну секунду
// <progress value="1" max="100"></progress>

export default () => {
  const progress = document.querySelector('progress');
  const recursion = () => {
    const id = setTimeout(() => {
      progress.value += 1;
      if (progress.value === 100) {
        return clearInterval(id);
      }
      return recursion();
    }, 1000);
  };
  recursion();
};

/* __tests__ */

import { jest } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

import run from '../src/application.js';

jest.useFakeTimers();

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const fixuturesPath = '__tests__/__fixtures__';
const getTree = () => prettier.format(document.body.innerHTML, options);

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join(fixuturesPath, 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run();
});

test('application', () => {
  expect(getTree()).toMatchSnapshot();

  for (let i = 0; i < 105; i += 1) {
    jest.runOnlyPendingTimers();
    expect(getTree()).toMatchSnapshot();
  }
});
