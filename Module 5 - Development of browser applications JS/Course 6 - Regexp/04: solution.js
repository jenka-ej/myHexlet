// Напишите регулярное выражение, которое соответствует подстрокам one или two или three.

one|two|three

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();

  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = ['one', 'two', 'three'];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = ['four', 'five'];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
