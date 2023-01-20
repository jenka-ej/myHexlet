// этом упражнении нужно реализовать логику добавления алертов по клику на кнопку.
// Изначально на странице есть одна кнопка. Вёрстка выглядит так:
// <button id="alert-generator" class="btn btn-primary">Generate Alert</button>
// <div class="alerts m-5"></div>
// После клика на кнопку, в контейнер с классом alerts добавляется алерт, с названием Alert 1:
// <div class="alerts m-5">
//   <div class="alert alert-primary">Alert 1</div>
// </div>
// Последующий клик добавляет новый алерт сверху:
// <div class="alerts m-5">
//   <div class="alert alert-primary">Alert 2</div>
//   <div class="alert alert-primary">Alert 1</div>
// </div>
// Каждый клик добавляет новый алерт, меняя число в его имени.

export default () => {
  const button = document.querySelector('#alert-generator');
  let i = 1;
  button.addEventListener('click', () => {
    const container = document.getElementsByClassName('alerts m-5')[0];
    const alert = document.createElement('div');
    alert.textContent = `Alert ${i}`;
    alert.classList.add('alert');
    alert.classList.add('alert-primary');
    container.prepend(alert);
    i += 1;
  });
};

/* index.js */

import app from './application.js';

app();

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

const getAllAlerts = () => document.querySelectorAll('div.alerts div');

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application', async () => {
  // попробуйте использовать отладку: https://help.hexlet.io/ru/articles/111525-otladka-v-uprazhneniyakh-po-frontendu
  // screen.debug();
  const button = screen.getByText('Generate Alert');
  expect(getAllAlerts()).toHaveLength(0);

  // screen.debug(button);
  await userEvent.click(button);
  const allAlerts1 = getAllAlerts();
  expect(allAlerts1).toHaveLength(1);

  const [alert1] = allAlerts1;
  expect(alert1).toHaveTextContent('Alert 1');
  expect(alert1).toHaveClass('alert alert-primary');

  await userEvent.click(button);
  await userEvent.click(button);
  const allAlerts2 = getAllAlerts();
  expect(allAlerts2).toHaveLength(3);

  const [alert3] = allAlerts2;
  expect(alert3).toHaveTextContent('Alert 3');
  expect(alert3).toHaveClass('alert alert-primary');
});
