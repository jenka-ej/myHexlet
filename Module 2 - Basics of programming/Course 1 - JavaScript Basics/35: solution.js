// Реализуйте функцию mySubstr(), которая извлекает из строки подстроку указанной длины. 
// Она принимает на вход два аргумента (строку и длину) и возвращает подстроку, начиная с первого символа:
// const text = 'If I look back I am lost';
// console.log(mySubstr(text, 1));  # => 'I'
// console.log(mySubstr(text, 7));  # => 'If I lo'
// В этом задании аргумент, обозначающий длину извлекаемой подстроки, не может быть длиннее самой строки.
// Используйте тот же подход, что в функции для переворота строки из урока: собирайте строку-результат в цикле, перебирая начальную строку до определённого момента.

const mySubstr = (string, length) => {
  let resultString = '';
  let i = 0;
  while (i < length) {
    resultString += string[i];
    i += 1;
  }

  return resultString;
};

export default mySubstr;

/* __tests__ */

import mySubstr from '../solution';

test('encrypt', () => {
  expect(mySubstr('got', 3)).toEqual('got');
  expect(mySubstr('got', 2)).toEqual('go');
  expect(mySubstr('got', 1)).toEqual('g');
});
