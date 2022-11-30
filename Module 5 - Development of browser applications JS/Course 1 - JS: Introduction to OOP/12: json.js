// Реализуйте и экспортируйте функцию-обёртку parseJson() для функции JSON.parse(), которая работает как встроенная. 
// Но в случае если в функцию была передана некорректная json строка, функция должна выбросить исключение ParseError. 
// Класс ParseError реализовывать не нужно, он уже импортирован.

import ParseError from './ParseError.js';

export const parseJson = (json) => {
  try {
    JSON.parse(json);
  } catch (e) {
    throw new ParseError('Invalid JSON string');
  }
  return JSON.parse(json);
};

/* __tests__ */

import ParseError from '../ParseError.js';
import { parseJson } from '../json.js';

test('testing parse json', () => {
  const json = '{ "key": "value" }';
  expect(parseJson(json)).toEqual({ key: 'value' });
});

test('testing parse invalid json', () => {
  const json = '{ key": "value" }';
  expect(() => parseJson(json)).toThrow(ParseError);
});
