// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход имя тега и HTML список, а возвращает список всех нод, соответствующих имени. 
// Ноды возвращаются в том виде, в котором они представлены в дереве. Порядок, в котором ноды возвращаются — не важен.

import { /* eslint-disable */
  l, cons as consList, isList, isEmpty, head, tail, concat, toString as listToString,
} from '@hexlet/pairs-data';

import {
  is, hasChildren, children, filter, reduce, toString as htmlToString,
} from '@hexlet/html-tags'; /* eslint-enable */

const select = (tag, html) => {
  const cb = (node, acc) => {
    if (hasChildren(node)) {
      if (is(tag, node)) {
        return reduce(cb, consList(node, acc), children(node));
      }
      return reduce(cb, acc, children(node));
    }
    if (is(tag, node)) {
      return consList(node, acc);
    }
    return acc;
  };
  return reduce(cb, l(), html);
};
export default select;

/* __tests__ */

import { l, length } from '@hexlet/pairs-data';
import { make, append, node } from '@hexlet/html-tags';
import select from '../select.js';

describe('dom', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const children1 = l(node('a', l(node('span', 'scheme'))));
    const dom2 = append(dom1, node('h1', children1));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom4 = append(dom3, node('ul', children2));
    const children3 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom5 = append(dom4, node('ol', children3));
    const dom6 = append(dom5, node('p', 'is a functional language'));
    const children4 = l(node('li', 'item'));
    const dom7 = append(dom6, node('ul', children4));
    const dom8 = append(dom7, node('div', l(node('p', 'another text'))));
    const dom9 = append(dom8, node('div', l(node('div', l(node('p', l(node('span', 'text'))))))));
    const dom10 = append(dom9, node('h1', 'prolog'));
    dom = append(dom10, node('p', 'is about logic'));
  });

  it('#select', () => {
    expect(length(select('span', dom))).toBe(2);
    expect(length(select('section', dom))).toBe(0);
    expect(length(select('li', dom))).toBe(5);
    expect(length(select('p', dom))).toBe(5);
    expect(length(select('h1', dom))).toBe(2);
    expect(length(select('div', dom))).toBe(3);
  });
});
