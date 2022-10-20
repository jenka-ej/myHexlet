// Пару можно создать на основе строки. Для хранения двух значений применим разделитель. 
// Им может выступить любой символ, однако во избежание совпадений с исходными данными лучше взять редко используемое значение.
// Для этого подойдёт так называемая управляющая или escape-последовательность, которая начинается с обратной косой черты. 
// Мы будем использовать специальный символ \t, обозначающий горизонтальную табуляцию.
// Функции car() и cdr() должны получить содержимое строки до и после разделителя соответственно.

export const cons = (a, b) => `${a}\t${b}`;

export const car = (pair) => pair.split('\t')[0];

export const cdr = (pair) => pair.split('\t')[1];

/* __tests__ */

import { cons, car, cdr } from '../pairs.js';

describe('Pairs on strings', () => {
  it('pair must be string', () => {
    const pair = cons('hi', 'hexlet');
    expect(typeof pair).toEqual('string');
  });

  it('separator is \\t', () => {
    const pair = cons('hi', 'hexlet');
    expect(pair.includes('\t')).toBeTruthy();
  });

  it('1 set', () => {
    const pair = cons('hi', 'hexlet');
    expect(car(pair)).toBe('hi');
    expect(cdr(pair)).toBe('hexlet');
  });

  it('2 set', () => {
    const pair = cons('Hello!', '');
    expect(car(pair)).toBe('Hello!');
    expect(cdr(pair)).toBe('');
  });

  it('3 set', () => {
    const pair = cons('', 'XXI');
    expect(car(pair)).toBe('');
    expect(cdr(pair)).toBe('XXI');
  });
});
