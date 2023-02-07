// Напишите регулярное выражение, которое независимо от регистра находит все подстроки python (Python, pytHon, pYThon и т.д.), 
// заключённые в двойные " или одинарные ' кавычки.
// При необходимости использовать флаги, укажите их отдельной строкой.

"python"|'python'
gi

/* __tests__ */

import fs from 'fs';

const solution = fs.readFileSync('solution', 'utf8').trim();

const [pattern, flags] = solution.split('\n');
const regexp = new RegExp(pattern.trim(), flags.trim());

test('should match multiple substrings', () => {
  const data = '"python" \'python\' "python"';
  expect(data.match(regexp).length).toEqual(3);
});

describe('regexp', () => {
  test.each([
    '"python"',
    "'Python'",
    "'PYTHON'",
    '"pyTHon"',
  ])('should match %s', (string) => {
    expect(string).toMatch(regexp);
  });

  test.each([
    'python"',
    "'PYTHON",
    'python',
    '\'pYThon"',
    '"pYThon\'',
  ])('should not match %s', (string) => {
    expect(string).not.toMatch(regexp);
  });
});
