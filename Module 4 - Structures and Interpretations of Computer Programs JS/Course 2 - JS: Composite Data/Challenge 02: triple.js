// Кроме пар можно создавать абстрактные типы данных, которые содержат внутри себя три и более элемента.
// В данном испытании необходимо реализовать структуру данных тройка, позволяющую хранить три значения. 
// Как и в случае с парами создаётся конструктор make() и селекторы get1(), get2(), get3(), которые будут извлекать соответствующие значения.

/* First version */ 

export const make = (a, b, c) => (message) => {
  switch (message) {
    case 'get1':
      return a;
    case 'get2':
      return b;
    case 'get3':
      return c;
  }
};

export const get1 = (triple) => triple('get1');

export const get2 = (triple) => triple('get2');

export const get3 = (triple) => triple('get3');

/* Second version */

export const make = (a, b, c) => (f) => f(a, b, c);

export const get1 = (triple) => triple((a) => a);

export const get2 = (triple) => triple((a, b) => b);

export const get3 = (triple) => triple((a, b, c) => c);

/* __tests__ */

import {
  make,
  get1,
  get2,
  get3,
} from '../triple.js';

test('get1', () => {
  const triple = make(5, 6, 7);
  expect(get1(triple)).toBe(5);
});

test('get2', () => {
  const triple = make(5, 6, 7);
  expect(get2(triple)).toBe(6);
});

test('get3', () => {
  const triple = make(5, 6, 7);
  expect(get3(triple)).toBe(7);
});

test('triple', () => {
  const triple = make(1, 2, 3);
  expect(get1(triple)).toBe(1);
  expect(get2(triple)).toBe(2);
  expect(get3(triple)).toBe(3);
});

test('triple in triple', () => {
  const triple1 = make(14, 22, 32);
  const triple2 = make(11, 12, triple1);
  expect(get1(triple2)).toBe(11);
  expect(get2(triple2)).toBe(12);
  expect(get3(triple2)).toBe(triple1);
});

test('triple string', () => {
  const triple = make('str', 44);
  expect(get1(triple)).toBe('str');
  expect(get2(triple)).toBe(44);
  expect(get3(triple)).toBe(undefined);
});
