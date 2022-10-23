// Реализуйте и экспортируйте функцию filter() для библиотеки html-tags, используя итеративный процесс.
// Реализуйте и экспортируйте функцию quotes(), которая извлекает из html тексты цитат и возвращает список цитат.

import {
  l, isEmpty, head, tail, cons as consList,
} from '@hexlet/pairs-data';

import { getValue, is, map } from '@hexlet/html-tags';

/* Версия с рекурсивным подходом */

export const filter = (func, coll) => {
  if (isEmpty(coll)) {
    return null;
  }
  const headElement = head(coll);
  const tailElements = tail(coll);
  if (func(headElement)) {
    return consList(headElement, filter(func, tailElements));
  }
  return filter(func, tailElements);
};

/* Версия с итеративным подходом */

export const filter = (func, coll) => {
  const iter = (coll1, acc) => {
    if (isEmpty(coll1)) {
      return null;
    }
    const headElement = head(coll1);
    const tailElements = tail(coll1);
    if (func(headElement)) {
      return consList(headElement, iter(tailElements, acc));
    }
    return iter(tailElements, acc);
  };
  return iter(coll, '');
};

export const quotes = (coll) => {
  const filteredQuotes = filter((el) => is('blockquote', el), coll);
  const mappedQuotes = map((el) => getValue(el), filteredQuotes);
  return mappedQuotes;
};

export const removeHeaders = (elements) => {
  if (isEmpty(elements)) {
    return l();
  }

  const element = head(elements);
  const tailElements = tail(elements);
  if (is('h1', element)) {
    return removeHeaders(tailElements);
  }
  return consList(element, removeHeaders(tailElements));
};

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';

import {
  make, append, node, is, toString as htmlToString,
} from '@hexlet/html-tags';

import { filter, quotes, removeHeaders } from '../html-tags.js';

describe('dom', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));
    dom = append(dom6, node('p', 'is about logic'));
  });

  it('#removeHeaders', () => {
    const processedDom = removeHeaders(dom);

    const result = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(htmlToString(processedDom)).toBe(result);
  });

  it('#filter', () => {
    const processedDom = filter((element) => is('h1', element), dom);

    const result = '<h1>scheme</h1><h1>haskell</h1><h1>prolog</h1>';
    expect(htmlToString(processedDom)).toBe(result);

    const processedDom2 = filter((element) => is('p', element), dom);
    const result2 = '<p>is a lisp</p><p>is a functional language</p><p>is about logic</p>';
    expect(htmlToString(processedDom2)).toBe(result2);

    expect(htmlToString(make())).toBe('');
  });

  it('#quotes', () => {
    const dom0 = make();
    const dom1 = append(dom0, node('h1', 'scheme'));
    const dom2 = append(dom1, node('blockquote', 'live is life'));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const dom4 = append(dom3, node('blockquote', 'i am sexy, and i know it'));
    const result = l('i am sexy, and i know it', 'live is life');
    expect(listToString(quotes(dom4))).toBe(listToString(result));
  });
});
