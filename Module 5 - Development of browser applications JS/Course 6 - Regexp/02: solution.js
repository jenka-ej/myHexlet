// Напишите регулярное выражение, в котором:
// 1) Первый и второй символ это цифры
// 2) Третий символ это /
// 3) Четвертый это любой символ, за исключением a-z

\d\d\/[^a-z]

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = ['23/A', '83/#', '92/?', '92/8'];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = ['23/a', '53/e', 'd3/3', '3d/2', '2383'];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
