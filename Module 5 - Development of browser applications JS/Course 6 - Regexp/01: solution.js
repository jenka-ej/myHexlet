// Напишите регулярное выражение ruby1.*, в котором вместо символа * может находиться любой символ.

ruby1\..

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();

  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = ['ruby1.9', 'ruby1.h', 'abcruby1.8xyz'];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = ['ruby1a9', 'ruby2.5', 'ruby1111', 'ruby10', 'aaaruby1.'];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
