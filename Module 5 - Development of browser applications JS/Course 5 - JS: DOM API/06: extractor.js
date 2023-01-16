// В этом упражнении похожая задачка на предыдущую, но теперь мы будем использовать поисковые методы, без прямого обхода дерева.
// Структура данных, которые надо извлечь, фиксирована. Мы будем парсить страницу категории статей. 
// Эта страница содержит заголовок категории, его описание и ссылки на статьи с небольшим описанием. 
// Эта структура фиксирована, меняется только количество статей от категории к категории.
// Реализуйте логику функции, которая принимает на вход document, извлекает из него данные и возвращает объект нужной структуры.

export default (document) => {
  const make = (nodeList) => {
    const nodeArray = Array.from(nodeList);
    return nodeArray.reduce((acc, node) => {
      const newNode = {
        title: node.querySelector('a').innerHTML,
        description: node.querySelector('p').innerHTML,
      };
      acc.push(newNode);
      return acc;
    }, []);
  };
  return {
    title: document.querySelector('h1').innerHTML,
    description: document.querySelector('.description').innerHTML,
    items: make(document.querySelectorAll('.links div')),
  };
};

/* index.js */

import extractData from './extractor.js';

console.log(extractData(document));

/* __tests__ */

import fs from 'fs';
import { jest } from '@jest/globals';
import path from 'path';

test('index', async () => {
  const initHtml = fs.readFileSync(path.join('public', 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  const spy = jest.spyOn(window.console, 'log');
  await import('../public/index.js');
  const expected = {
    description: 'Category Description',
    title: 'Category Name',
    items: [
      { description: 'Article Description 1', title: 'Article Name 1' },
      { description: 'Article Description 2', title: 'Article Name 2' },
    ],
  };
  expect(spy).toHaveBeenCalledWith(expected);
});
