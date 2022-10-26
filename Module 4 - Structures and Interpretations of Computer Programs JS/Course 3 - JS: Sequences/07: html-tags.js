// Реализуйте и экспортируйте функцию extractHeaders(), которая извлекает тексты всех заголовков h2 из переданного HTML и возвращает HTML, 
// в котором каждый из этих текстов обернут в p.
// Реализуйте и экспортируйте функцию wordsCount(), которая считает вхождения слова в определенный тег. 
// Для подсчета слов в тексте одного тега воспользуйтесь вспомогательной функцией wc(), которая уже импортирована в модуль html-tags.

import {
  node, getValue, is, map, filter, reduce,
} from '@hexlet/html-tags';

import { wc } from './utils.js';

export const extractHeaders = (html) => {
  const filteredHtml = filter((element) => is('h2', element), html);
  const mappedHtml = map((element) => getValue(element), filteredHtml);
  const reducedHtml = reduce((element, acc) => node(node('p', element), acc), null, mappedHtml);
  return reducedHtml;
};

export const wordsCount = (tag, word, html) => {
  const filteredHtml = filter((element) => is(tag, element), html);
  const mappedHtml = map((element) => getValue(element), filteredHtml);
  const reducedHtml = reduce((element, acc) => acc + wc(word, element), 0, mappedHtml);
  return reducedHtml;
};

/* __tests__ */

import {
  make, append, node, toString as htmlToString,
} from '@hexlet/html-tags';
import { extractHeaders, wordsCount } from '../html-tags.js';

const dom1 = make();
const dom2 = append(dom1, node('h1', 'scheme'));
const dom3 = append(dom2, node('p', 'is a lisp'));

const dom4 = append(dom3, node('h2', 'haskell'));
const dom5 = append(dom4, node('p', 'is a functional language'));

const dom6 = append(dom5, node('h2', 'prolog'));
const dom7 = append(dom6, node('p', 'sicp'));
const dom8 = append(dom7, node('blockquote', 'haskell haskell'));
const dom9 = append(dom8, node('blockquote', 'quote'));
const dom10 = append(dom9, node('h2', 'haskell'));
const dom = append(dom10, node('p', 'is about logic haskell'));

describe('dom', () => {
  it('#extractHeaders', () => {
    const headersAsP = extractHeaders(dom);
    const result = '<p>haskell</p><p>prolog</p><p>haskell</p>';
    expect(htmlToString(headersAsP)).toBe(result);
  });

  it('#wordsCount', () => {
    expect(wordsCount('i', 'scheme', dom)).toBe(0);
    expect(wordsCount('h1', 'undefined', dom)).toBe(0);
    expect(wordsCount('h1', 'scheme', dom)).toBe(1);
    expect(wordsCount('blockquote', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'haskell', dom)).toBe(2);
    expect(wordsCount('h2', 'h2', dom)).toBe(0);
  });
});
