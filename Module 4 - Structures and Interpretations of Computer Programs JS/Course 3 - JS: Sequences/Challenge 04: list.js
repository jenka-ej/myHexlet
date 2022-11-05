// Осторожно! Эта задача требует умения работать с массивами для понимания реализации функции l() (чтобы принять любое число аргументов). 
// Если вы их не знаете, лучше вернуться к этой задаче после прохождения курса "JS: Коллекции".
// Необходимо реализовать набор функций для работы со списками.
// Подразумевается, что интерфейс работы этой абстракции абсолютно точно такой же, как и тот, что использовался в курсе. 
// Другими словами, можно безболезненно переписать реализацию тех функций, которые делались в курсе, и весь код, использующий списки, 
// будет работать как ни в чем не бывало.

// Реализуйте и экспортируйте следующие функции:

// l(...items) — функция-конструктор. Уже реализована.
// toString(list) — возвращает строковое представление списка
// head(list) — возвращает первый элемент списка
// tail(list) — возвращает "хвост" списка (все элементы, кроме первого)
// isEmpty(list) — проверяет, является ли список пустым
// cons(item, list) — добавляет элемент в начало списка и возвращает новый список
// filter(predicate, list) — фильтрует список, используя предикат
// map(callback, list) — преобразует список, используя callback-функцию
// reduce(callback, init, list) — производит свертывание списка

const delimiter = '\n';

export const l = (...items) => items.join(delimiter);

export const toString = (list) => `(${list.split(delimiter).join(', ')})`;

export const head = (list) => list.split(delimiter)[0];

export const tail = (list) => l(list.split(delimiter).filter((el, index) => index !== 0).join(', '));

export const isEmpty = (list) => list.length === 0;

export const cons = (element, list) => {
  if (list.length === 0) {
    return l(element);
  }
  return l(element, list);
};

export const filter = (predicate, list) => l(list.split(delimiter).filter(predicate).join(', '));

export const map = (callback, list) => l(list.split(delimiter).map(callback).join(', '));

export const reduce = (callback, init, list) => {
  const newList = list.split(delimiter).reverse();
  return typeof init === 'number' ? Number(l(newList.reduce(callback, init))) : l(newList.reduce(callback));
};

/* __tests__ */

import { l, head, tail, filter, map, reduce, isEmpty, cons, toString } from '../list.js';

test('isEmpty list', () => {
  const list = l();
  expect(toString(list)).toBe('()');
});

test('one item', () => {
  const list = l('foo');
  expect(head(list)).toBe('foo');
  expect(toString(tail(list))).toBe('()');
});

test('multiple items', () => {
  const list = l('foo', 'bar', 'baz');
  expect(head(list)).toBe('foo');
  expect(toString(tail(list))).toBe(toString(l('bar', 'baz')));
});

test('isEmpty', () => {
  expect(isEmpty(l())).toBeTruthy();
  expect(isEmpty(l('hello'))).toBeFalsy();
});

test('cons', () => {
  const list = l('foo', 'bar', 'baz');
  expect(toString(cons('bas', list))).toBe(toString(l('bas', 'foo', 'bar', 'baz')));
});

test('filter', () => {
  const list = l('foo', 'bar', 'baz');
  expect(toString(filter((item) => item !== 'bar', list))).toBe(toString(l('foo', 'baz')));
  expect(toString(filter((item) => item !== 'baz', list))).toBe(toString(l('foo', 'bar')));
});

test('append to empty', () => {
  const list = l();
  expect(toString(cons('bas', list))).toBe(toString(l('bas')));
});

test('map', () => {
  const list = l('foo', 'bar', 'baz');
  expect(toString(map((item) => item[0], list))).toBe(toString(l('f', 'b', 'b')));
  expect(toString(map((item) => item[1], list))).toBe(toString(l('o', 'a', 'a')));
});

test('reduce', () => {
  const list = l('foo', 'bar', 'baz');
  expect(reduce((item, acc) => (acc ? `${acc}+${item}` : item), '', list)).toBe('foo+bar+baz');
  const list2 = l(3, 4, 1);
  expect(reduce((item, acc) => (acc ? acc * item : item), 1, list2)).toBe(12);
});

test('toString', () => {
  const list = l('foo', 0, 'baz');
  expect(toString(list)).toBe('(foo, 0, baz)');
});
