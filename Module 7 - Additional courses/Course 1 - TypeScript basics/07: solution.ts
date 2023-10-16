// Анаграммы — это слова, которые состоят из одинаковых букв. Например:
// спаниель — апельсин
// карат — карта — катар
// топор — ропот — отпор

// Реализуйте функцию filterAnagrams(), которая находит все анаграммы слова. Функция принимает исходное слово и список для проверки — массив.
// А возвращает функция массив всех анаграмм. Если в списке нет анаграммы, то возвращается пустой массив:

// filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']);
// ['aabb', 'bbaa']

// filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']);
// ['carer', 'racer']
 
// filterAnagrams('laser', ['lazing', 'lazy',  'lacer']);
// []

function filterAnagrams(word: string, list: string[]): string[] {
  const sortWord = word.split('').sort().join('');
  return list.filter((listWord) => listWord.split('').sort().join('') === sortWord);
}

export default filterAnagrams;

/* __tests__ */

import * as ta from 'type-assertions';

import filterAnagrams from '../solution';

test('function', () => {
  expect(filterAnagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada'])).toEqual(['aabb', 'bbaa']);

  expect(filterAnagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer'])).toEqual(['carer', 'racer']);

  expect(filterAnagrams('laser', ['lazing', 'lazy', 'lacer'])).toEqual([]);

  ta.assert<ta.Equal<ReturnType<typeof filterAnagrams>, string[]>>();
});
