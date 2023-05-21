// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив и строковой префикс. 
// Эта функция должна возвращать новый массив, в котором к каждому элементу исходного массива добавляется переданный префикс. 
// Функция предназначена для работы со строковыми элементами. После префикса должен добавляться пробел.

export default (coll, prefix) => {
  const result = [];

  for (let i = 0; i < coll.length; i += 1) {
    result[i] = `${prefix} ${coll[i]}`;
  }

  return result;
};

/* __tests__ */

import addPrefix from '../arrays.js';

it('addPrefix', () => {
  const names = ['john', 'smith', 'karl'];

  const actual1 = addPrefix(names, 'Mr');
  const expected1 = ['Mr john', 'Mr smith', 'Mr karl'];
  expect(actual1).toEqual(expected1);

  const actual2 = addPrefix(names, 'Mrs');
  const expected2 = ['Mrs john', 'Mrs smith', 'Mrs karl'];
  expect(actual2).toEqual(expected2);
});
