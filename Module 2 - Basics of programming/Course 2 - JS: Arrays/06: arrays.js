// Реализуйте и экспортируйте функцию reverse(), которая принимает на вход массив и располагает элементы исходного массива в обратном порядке. 
// Функция должна мутировать переданный в нее массив. Новый массив из нее возвращать не надо.

export const reverse = (coll) => {
  const lastIndex = coll.length - 1;
  const middleIndex = lastIndex / 2;

  for (let i = 0; i < middleIndex; i += 1) {
    const mirrorIndex = lastIndex - i;
    const temp = coll[i];
    coll[i] = coll[mirrorIndex];
    coll[mirrorIndex] = temp;
  }
};

/* __tests__ */

import { reverse } from '../arrays.js';

test('reverse', () => {
  const names1 = ['john', 'smith', 'karl'];
  reverse(names1);
  expect(names1).toEqual(['karl', 'smith', 'john']);

  const names2 = [];
  reverse(names2);
  expect(names2).toEqual([]);

  const names3 = ['one', 'two'];
  reverse(names3);
  expect(names3).toEqual(['two', 'one']);

  const names4 = ['john', 'smith', 'karl', 'alan', 'joe'];
  reverse(names4);
  expect(names4).toEqual(['joe', 'alan', 'karl', 'smith', 'john']);
});
