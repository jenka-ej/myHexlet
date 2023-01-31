// Напишите регулярное выражение, которое находит email адреса, удовлетворяющие следующим условиям:
// 1) Часть до @ должна содержать только символы класса \w в количестве не менее одного.
// 2) Часть после @ и до ., после которой начинается домен, может содержать только буквы и быть не короче трех символов. Пример: hexlet.
// 3) Часть после . может содержать только буквы и быть от 2 до 5 символов в длину. Пример: io.

^\w+@[a-zA-Z]{3,}\.[a-zA-Z]{2,5}$

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = [
      'suPport@hExlet.io',
      'in9Fo@hexlet.io',
      'in_fo@goOgle.com',
      'i@you.cOm',
    ];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = [
      'support@hexletio',
      '^%@hexlet.io',
      'info@he.xlet.io',
      'info@he.io',
      '!info@hexlet.io',
      'info@hexlet.i',
      'info@hexlet.ioioio',
      'info@1hexlet.io',
      'info@hexlet.i3',
      'suPport@hExlet_.io',
      'suPport@hExlet.i^o'];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
