// Реализуйте и экспортируйте описание обобщённого типа MySet, который представляет из себя аналог множества Set из JavaScript.
// Пример использования объекта этого типа:

// const s: MySet<number> = ...;
// Добавление возвращает количество элементов
// s.add(1); // 1
// s.add(10); // 2
 
// s.has(1); // true
// s.has(8); // false

// Тип включает в себя два метода: add() и has(). Данные внутри должны храниться в свойстве items.

export interface MySet<T> {
  items: Array<T>;
  has(value: T): boolean;
  add(value: T): number;
}

/* __tests__ */

import * as ta from 'type-assertions';

import type { MySet } from '../solution';

test('function 1', () => {
  const s1: MySet<number> = {
    items: [],
    has(value) {
      return this.items.includes(value);
    },
    add(value) {
      this.items.push(value);
      return this.items.length;
    },
  };

  expect(s1.has(1)).toBe(false);
  s1.add(1);
  expect(s1.has(1)).toBe(true);

  ta.assert<ta.Equal<Parameters<typeof s1.has>, [number]>>();
  ta.assert<ta.Equal<Parameters<typeof s1.add>, [number]>>();
});

test('function 2', () => {
  const s1: MySet<string> = {
    items: [],
    has(value) {
      return this.items.includes(value);
    },
    add(value) {
      this.items.push(value);
      return this.items.length;
    },
  };

  expect(s1.has('hexlet')).toBe(false);
  s1.add('hexlet');
  expect(s1.has('hexlet')).toBe(true);

  ta.assert<ta.Equal<Parameters<typeof s1.has>, [string]>>();
  ta.assert<ta.Equal<Parameters<typeof s1.add>, [string]>>();
});
