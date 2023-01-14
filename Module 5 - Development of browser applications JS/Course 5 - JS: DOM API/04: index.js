// Извлеките содержимое тега <body> и оберните каждую строку в тег <p>. 
// Получившееся тело вставьте обратно. 
// Чтобы получить из содержимого <body> независимые строки, нужно разбить тело по переводу строки.

const currBody = document.body.innerHTML.trim().split('\n');
document.body.innerHTML = currBody.map((el) => `<p>${el}</p>`).join('');

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

test('scripts count', async () => {
  const initHtml = fs.readFileSync(path.join('public', 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  await import('../public/index.js');
  const body = prettier.format(document.body.innerHTML, options);
  expect(body).toMatchSnapshot();
});
