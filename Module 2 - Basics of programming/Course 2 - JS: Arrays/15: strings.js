// Реализуйте и экспортируйте по умолчанию функцию, которая получает на вход строку и считает, сколько символов (без учёта повторяющихся символов) 
// использовано в этой строке. 
// Например, в строке yy используется всего один символ — y. А в строке 111yya! — используется четыре символа: 1, y, a и !.

const countUniqChars = (text) => {
  const uniqChars = [];

  for (const char of text) {
    if (!uniqChars.includes(char)) {
      uniqChars.push(char);
    }
  }

  return uniqChars.length;
};

export default countUniqChars;

/* __tests__ */

import countUniqChars from '../strings.js';

it('countUniqChars', () => {
  const text1 = 'You know nothing Jon Snow';
  const actual1 = countUniqChars(text1);
  expect(actual1).toBe(13);

  const text2 = 'Fear cuts deeper than swords.';
  const actual2 = countUniqChars(text2);
  expect(actual2).toBe(16);

  const text3 = '';
  const actual3 = countUniqChars(text3);
  expect(actual3).toBe(0);

  const text4 = '0';
  const actual4 = countUniqChars(text4);
  expect(actual4).toBe(1);
});
