// Реализуйте асинхронный вариант функции map() - asyncMap(). Первым аргументом asyncMap() принимает массив с Promise.
// Вторым - функцию, которая применяется к каждому элементу. Функция должна вернуть массив с результатами выполнения функции для каждого элемента.

// const promisedNumbers = [Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)];
 
// asyncMap(promisedNumbers, (num, index) => num * index).then((result) => {
//   console.log(result); // [0, 2, 6]
// });

type CallbackOptions<T, P> = (item: T, index: number) => P;

async function asyncMap<T, P>(coll: Promise<T>[], callback: CallbackOptions<T, P>) {
  return Promise.all(coll.map(async (item, index) => {
    const resolveItem = await item;
    return callback(resolveItem, index);
  }));
}

export default asyncMap;

/* __tests__ */

import * as ta from 'type-assertions';
import asyncMap from '../solution';

test('asyncMap', async () => {
  const result = await asyncMap([Promise.resolve(1), Promise.resolve(2)], (item) => item * 2);
  expect(result).toEqual([2, 4]);

  const result2 = await asyncMap([Promise.resolve('one'), Promise.resolve('two'), Promise.resolve('three')], (item) => item.toUpperCase());
  expect(result2).toEqual(['ONE', 'TWO', 'THREE']);

  const result3 = await asyncMap(
    [Promise.resolve(1), Promise.resolve(2)],
    (item, index) => item * index,
  );
  expect(result3).toEqual([0, 2]);

  ta.assert<ta.Equal<typeof result, number[]>>();
  ta.assert<ta.Equal<typeof result2, string[]>>();
});
