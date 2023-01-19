// Реализуйте и экспортируйте по умолчанию функцию, которая нормализует имена классов для всех элементов на странице. 
// В данном случае это означает, что происходит преобразование всех классов, написанных с использованием kebab нотации, в camelCase нотацию: text-center => textCenter.
// Попробуйте решить эту задачу без использования регулярных выражений.

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import camelCase from 'lodash/camelCase';

export default function normalize(document) {
  const elements = Array.from(document.body.getElementsByTagName('*'));
  return elements.map((el) => {
    const classNames = Array.from(el.classList);
    return classNames.map((className) => el.classList.replace(className, camelCase(className)));
  });
}

/* __tests__ */

import normalize from '../src/normalize.js';

test('normalize 1', () => {
  const expected = '<p class="row" data-id="simple-text">Text</p>';
  document.documentElement.innerHTML = expected;
  normalize(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('normalize 2', () => {
  const expected = '<p class="rowHowAre">Text</p>';
  document.documentElement.innerHTML = '<p class="row-how-are">Text</p>';
  normalize(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('normalize 3', () => {
  const expected = '<p class="row tCen"><span class="aB dG catDog">Text</span></p>';
  document.documentElement.innerHTML = '<p class="row t-cen"><span class="aB d-g cat-dog">Text</span></p>';
  normalize(document);
  expect(document.body.innerHTML).toEqual(expected);
});
