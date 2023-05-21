// Реализуйте функцию convertText(), которая принимает на вход строку и, если первая буква не заглавная, возвращает перевернутый вариант исходной строки. 
// Если первая буква заглавная, то строка возвращается без изменений. 
// Если на вход передана пустая строка, функция должна вернуть пустую строку.

import reverse from './reverse';

const convertText = (text) => {
  if (text === '') {
    return '';
  }

  const reversable = text[0] !== text[0].toUpperCase();
  return reversable ? reverse(text) : text;
};

export default convertText;

/* __tests__ */

import { test, expect } from '@jest/globals';
import convertText from '../convertText';

test('convertText', () => {
  expect(convertText('hey')).toBe('yeh');
  expect(convertText('Hey')).toBe('Hey');
  expect(convertText('')).toBe('');
});
