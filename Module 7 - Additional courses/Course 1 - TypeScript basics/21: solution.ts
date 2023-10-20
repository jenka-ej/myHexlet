// Реализуйте функцию last(), которая извлекает последний элемент из переданного значения. Значением может быть строка или число.
// Функция возвращает значение того же типа, которое было передано в качестве параметра:
// Передаем в качестве параметра строку
// Функция возвращает строку
// last('hexlet'); // t
 
// Передаем в качестве параметра число
// Функция возвращает число
// last(12345); // 5

function last(data: string | number): string | number {
  if (typeof data === 'number') {
    return data % 10;
  }
  return data === '' ? data : data[data.length - 1];
}

export default last;

/* __tests__ */

import last from '../solution';

test('function', () => {
  expect(last('John')).toBe('n');
  expect(last('')).toBe('');
  expect(last(1)).toBe(1);
  expect(last(134)).toBe(4);
});
