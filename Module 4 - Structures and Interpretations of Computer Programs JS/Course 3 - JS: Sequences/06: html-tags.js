// Реализуйте и экспортируйте функцию reduce() для библиотеки html-tags.
// Реализуйте и экспортируйте функцию emptyTagsCount(), которая считает количество пустых тегов. Тип тега задается первым параметром функции.

import { isEmpty, head, tail } from '@hexlet/pairs-data';
import { getValue, is } from '@hexlet/html-tags';

export const reduce = (func, acc, coll) => {
  if (isEmpty(coll)) {
    return acc;
  }
  const headElement = head(coll);
  const tailElements = tail(coll);
  return reduce(func, func(headElement, acc), tailElements);
};

export const emptyTagsCount = (typeTag, coll) => {
  const mt = '';
  return reduce((el, acc) => ((is(typeTag, el) && (getValue(el) === mt)) ? acc + 1 : acc), 0, coll);
};

export const headersCount = (tagName, elements) => {
  const iter = (items, acc) => {
    if (isEmpty(items)) {
      return acc;
    }

    const item = head(items);
    const newAcc = is(tagName, item) ? acc + 1 : acc;
    return iter(tail(items), newAcc);
  };
  return iter(elements, 0);
};

/* __tests__ */

import {
  make, append, node, getValue, is,
} from '@hexlet/html-tags';

import { reduce, emptyTagsCount, headersCount } from '../html-tags.js';

describe('dom', () => {
  let dom;

  beforeAll(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));

    const dom4 = append(dom3, node('h1', 'haskell'));
    const dom5 = append(dom4, node('p', 'is a functional language'));

    const dom6 = append(dom5, node('h1', 'prolog'));

    const dom7 = append(dom6, node('h2', ''));
    const dom8 = append(dom7, node('span', ''));
    dom = append(dom8, node('p', 'is about logic'));
  });

  describe('#headersCount', () => {
    it('should calculate headers count', () => {
      const count = headersCount('h1', dom);
      expect(count).toBe(3);
    });
  });

  describe('#reduce', () => {
    it('should count h1 tags', () => {
      const count = reduce((element, acc) => (is('h1', element) ? acc + 1 : acc), 0, dom);
      expect(count).toBe(3);
    });

    it('should count span tags', () => {
      const count2 = reduce((element, acc) => (is('span', element) ? acc + 1 : acc), 0, dom);
      expect(count2).toBe(1);
    });

    it('should reduce to string', () => {
      const count3 = reduce((element, acc) => {
        const content = getValue(element);
        return is('h1', element) ? `${acc} ${content}` : acc;
      }, 'Languages:', dom);

      const expected3 = 'Languages: prolog haskell scheme';
      expect(count3).toBe(expected3);
    });

    it('should calculate tags count', () => {
      const func = (_element, acc) => acc + 1;
      const count = reduce(func, 0, dom);
      expect(count).toBe(8);
    });
  });

  describe('#emptyTagsCount', () => {
    it('should calculate empty tags count', () => {
      const dom1 = append(dom, node('blockquote', ''));
      const dom2 = append(dom1, node('blockquote', ''));
      const dom3 = append(dom2, node('blockquote', 'quote'));
      const dom4 = append(dom3, node('blockquote', ''));
      const dom5 = append(make(), node('blockquote', 'smth'));
      expect(emptyTagsCount('blockquote', dom3)).toBe(2);
      expect(emptyTagsCount('blockquote', dom4)).toBe(3);
      expect(emptyTagsCount('blockquote', dom5)).toBe(0);
      expect(emptyTagsCount('p', dom4)).toBe(0);
    });
  });
});
