// Реализуйте функцию reverse(), переворачивающую строку. В этот раз, используя итеративный процесс. Работа функции основана на двух принципах:
// 1) Любой символ строки можно получить обратившись к нему по индексу, например: str[3].
// 2) Индекс последнего символа строки на единицу меньше длины строки и вычисляется так: str.length - 1.

export default (str) => {
  const lastIndex = str.length - 1;
  const iter = (count, acc) => {
    if (count === str.length) {
      return acc;
    }
    return iter(count + 1, `${acc}${str[lastIndex - count]}`);
  };
  return iter(0, '');
};

/* __tests__ */

import reverse from '../reverse.js';

test('reverse', () => {
  expect(reverse('')).toBe('');
  expect(reverse('z')).toBe('z');
  expect(reverse('zz')).toBe('zz');
  expect(reverse('zza')).toBe('azz');
  expect(reverse('qwerty')).toBe('ytrewq');
});
