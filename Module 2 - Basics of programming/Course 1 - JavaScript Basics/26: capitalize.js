// Реализуйте функцию capitalize(), которая принимает непустую строку и приводит первую букву строки к верхнему регистру:
// const name = 'arya';
// console.log(capitalize(name)); // => "Arya"
// Чтобы получить подстроку (или символ) из строки, используйте метод slice().
// Для приведения строки к верхнему регистру используйте метод toUpperCase().

const capitalize = (text) => `${text[0].toUpperCase()}${text.slice(1)}`;

export default capitalize;

/* __tests__ */

import { test, expect } from '@jest/globals';
import capitalize from '../capitalize';

test('capitalize', () => {
  expect(capitalize('daenerys')).toEqual('Daenerys');
  expect(capitalize('hexlet')).toEqual('Hexlet');
});
