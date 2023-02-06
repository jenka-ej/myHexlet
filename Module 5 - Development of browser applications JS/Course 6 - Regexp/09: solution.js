// Напишите регулярное выражение, которое находит подстроку 1, за которой следует подстрока 2:
// 1) 80
// 2) : и один или более символов не входящих в класс a-z
// Используйте позитивный просмотр вперед.

80(?=:[^a-z]+)

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution, 'g');

  it('should match', () => {
    const strings = ['80:8080, 80:!@#$', '80: d123e'];

    strings.forEach((string) => {
      expect(string).toMatch(regexp);
      const matches = string.match(regexp);
      expect(matches[0]).toBe('80');
    });
  });

  it('should not match', () => {
    const strings = ['80:', '80', '80:d123f'];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
