// Реализуйте абстракцию для создания html. Она включает в себя следующие функции:
// make() — конструктор. Уже реализован. Не принимает параметров, и создает HTML-список.
// node() — создает новый тег. Содержит два элемента, имя тега и его содержимое. Дополнительно реализуйте селекторы тега: getName() и getValue().
// append() — добавляет элемент (тег), созданный с помощью node(), в HTML-список. Возвращает новый HTML-список. Новый элемент должен добавляться в начало списка.
// toString() — возвращает текстовое представление HTML на основании HTML-списка.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs';
// eslint-disable-next-line
import { l, isEmpty, head, tail, cons as consList, toString as listToString } from '@hexlet/pairs-data';

export const make = () => l();

export const node = (tagName, text) => cons(tagName, text);

export const getName = (tag) => car(tag);

export const getValue = (tag) => cdr(tag);

export const append = (dom, tag) => consList(tag, dom);

export const toString = (dom1) => {
  const re = (dom, iter) => {
    if (isEmpty(dom)) {
      return iter;
    }
    return re(tail(dom), `<${getName(head(dom))}>${getValue(head(dom))}</${getName(head(dom))}>${iter}`);
  };
  return re(dom1, '');
};

/* __tests__ */

import { l, head, tail } from '@hexlet/pairs-data';
import {
  make, append, toString, node, getName, getValue,
} from '../html-tags.js';

describe('dom', () => {
  it('#make', () => {
    const dom1 = make();
    expect(dom1).toBe(l());
  });

  it('#node', () => {
    const node1 = node('h1', 'hello, world');
    expect(getName(node1)).toBe('h1');
    expect(getValue(node1)).toBe('hello, world');
  });

  it('#append', () => {
    const dom1 = make();

    const dom2 = append(dom1, node('h1', 'hello, world'));
    expect(getName(head(dom2))).toBe('h1');
    expect(getValue(head(dom2))).toBe('hello, world');

    const dom = append(dom2, node('h2', 'header2'));
    expect(getName(head(dom))).toBe('h2');
    expect(getValue(head(dom))).toBe('header2');
    expect(getName(head(tail(dom)))).toBe('h1');
    expect(getValue(head(tail(dom)))).toBe('hello, world');
  });

  it('#toString 1', () => {
    const result = '';
    expect(toString(make())).toEqual(result);
  });

  it('#toString 2', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));

    const result = '<h1>hello, world</h1>';
    expect(toString(dom2)).toEqual(result);
  });

  it('#toString 3', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));
    const dom = append(dom2, node('h2', 'header2'));

    const result = '<h1>hello, world</h1><h2>header2</h2>';
    expect(toString(dom)).toEqual(result);
  });

  it('#toString 4', () => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'hello, world'));
    const dom3 = append(dom2, node('h2', 'hello, world'));
    const dom4 = append(dom3, node('h3', 'hello, world'));
    const dom5 = append(dom4, node('h4', 'hello, world'));
    const dom = append(dom5, node('h5', 'bye-bye!'));

    const result = '<h1>hello, world</h1><h2>hello, world</h2><h3>hello, world</h3><h4>hello, world</h4><h5>bye-bye!</h5>';
    expect(toString(dom)).toEqual(result);
  });
});
