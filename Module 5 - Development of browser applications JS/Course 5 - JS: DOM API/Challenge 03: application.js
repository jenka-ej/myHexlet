// Реализуйте логику показа цитат Тото Роббинса.
// Каждое нажатие на кнопку в веб-доступе должно загружать новую цитату с бекенда и отображать вместо старой. 
// Вся необходимая верстка уже добавлена, ее можно увидеть и изучить в веб-доступе.

import axios from 'axios';

const routes = {
  randomQuotePath: () => '/api/quotes/random',
};

export default () => {
  const button = document.querySelector('button');
  button.addEventListener('click', async () => {
    const response = await axios.get(routes.randomQuotePath());
    document.querySelector('.blockquote').textContent = response.data.quote;
  });
};

/* __tests__ */

import '@testing-library/jest-dom';

import fs from 'fs';
import path from 'path';
import nock from 'nock';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen, waitFor } = testingLibraryDom;

nock.disableNetConnect();

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application', async () => {
  const button = await screen.findByRole('button', { name: /Жмяк/i });
  const blockquote = await screen.findByTestId('quote');

  const data1 = { quote: 'Хекслет раз' };
  nock('http://localhost:80')
    .get('/api/quotes/random')
    .reply(201, data1);
  await userEvent.click(button);

  await waitFor(() => {
    expect(blockquote).toHaveTextContent(data1.quote);
  });

  const data2 = { quote: 'Хекслет два' };
  nock('http://localhost:80')
    .get('/api/quotes/random')
    .reply(201, data2);
  await userEvent.click(button);

  await waitFor(() => {
    expect(blockquote).toHaveTextContent(data2.quote);
  });
});
