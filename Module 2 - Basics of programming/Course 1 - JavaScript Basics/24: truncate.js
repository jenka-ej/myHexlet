// Реализуйте функцию truncate(), которая обрезает переданную строку до указанного количества символов, добавляет в конце многоточие и возвращает получившуюся строку. 
// Подобная логика часто используется на сайтах, чтобы отобразить длинный текст в сокращенном виде.
// Функция принимает два параметра:
// 1) Строка, которую нужно обрезать
// 2) Число символов, которые нужно оставить

const truncate = (text, length) => {
  const result = `${text.slice(0, length)}...`;
  return result;
};

export default truncate;

/* __tests__ */

import { test, expect } from '@jest/globals';
import truncate from '../truncate';

test('truncate', () => {
  expect(truncate('текст', 3)).toBe('тек...');
  expect(truncate('и пошла вода', 5)).toBe('и пош...');
});
