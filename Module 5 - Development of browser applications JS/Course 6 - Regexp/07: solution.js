// Напишите регулярное выражение, которое находит подстроки, состоящие из:
// 1) Три символа из класса символов a-z.
// 2) :
// 3) Группа символов из первого условия.

(?<group1>[a-z]{3}):\k<group1>

/* __tests__ */

import fs from 'fs';

describe('regexp', () => {
  const solution = fs.readFileSync('solution', 'utf8').trim();
  const regexp = new RegExp(solution);

  it('should match', () => {
    const strings = ['mam:mam', 'asd mmm:mmm mmm', 'asdf:sdfa'];

    strings.forEach((string) => expect(string).toMatch(regexp));
  });

  it('should not match', () => {
    const strings = ['mmm:emu', 'emu:mmm', 'mmm mmm', ' aa:aa '];

    strings.forEach((string) => expect(string).not.toMatch(regexp));
  });
});
