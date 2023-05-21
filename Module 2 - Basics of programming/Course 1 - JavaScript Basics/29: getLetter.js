// Реализуйте функцию getLetter(), которая извлекает из переданной строки указанный символ (по порядковому номеру, а не индексу) и возвращает его наружу. 
// Если такого символа нет, то функция возвращает пустую строку.

const getLetter = (text, position) => text[position - 1] || '';

export default getLetter;

/* __tests__ */

import { test, expect } from '@jest/globals';
import getLetter from '../getLetter';

test('getLetter', () => {
  const name = 'Hexlet';
  expect(getLetter(name, 0)).toBe('');
  expect(getLetter(name, 1)).toBe('H');
  expect(getLetter(name, 6)).toBe('t');
  expect(getLetter(name, 7)).toBe('');
  expect(getLetter(name, 11)).toBe('');
});
