// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход document.documentElement, 
// извлекает из него параграфы и возвращает массив из их содержимого. 
// Не забудьте очистить данные от концевых пробелов и переводов строк с помощью trim.

export default function extractData(html) {
  const result = [];
  const recursion = (tree) => {
    const ats = Array.from(tree.children);
    ats.map((node) => {
      if (node.tagName === 'P') {
        return result.push(node.innerHTML.trim());
      }
      if (node instanceof Text) {
        return null;
      }
      return recursion(node);
    });
  };
  recursion(html);
  return result;
}

/* index.js */

import extractData from './extractor.js';

console.log(extractData(document.documentElement));

/* __tests__ */

import fs from 'fs';
import { jest } from '@jest/globals';
import path from 'path';

test('index', async () => {
  const initHtml = fs.readFileSync(path.join('public', 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  const spy = jest.spyOn(window.console, 'log');
  await import('../public/index.js');
  const expected = ['First paragraph', 'Second paragraph', 'Third paragraph'];
  expect(spy).toHaveBeenCalledWith(expected);
});
