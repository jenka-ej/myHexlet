// Напишите регулярное выражение, которое находит строку, содержащую только support@hexlet.io. 
// Это означает, что такие строки, как something here support@hexlet.io и support@hexlet.io something here не попадают под регулярное выражение.

^support@hexlet\.io$

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = ['support@hexlet.io'];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = [
      ' support@hexlet.io', 'support@hexlet.io ', 'support@hexletdio',
      '9support@hexlet.io', 'support@hexlet.ioo', 'support@hexlet9io',
    ];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
