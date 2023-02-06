// Напишите регулярное выражение, которое находит подстроки, состоящие из: (, хотя бы одного любого символа и ).

\([^)]+\)

/* __tests */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution, 'g');

  it('should match', () => {
    const strings = ['(one) ($%@#$) (value1)', 'test (^,ehu-) ) (t) (//)'];

    strings.forEach((string) => {
      expect(string).toMatch(regexp);
      const matches = string.match(regexp);
      expect(matches.length).toBe(3);
    });
  });

  it('should not match', () => {
    const strings = ['2383', '()', '() ('];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
