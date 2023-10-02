// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход массив определённой структуры и возвращает объект, полученный из этого массива.
// Массив устроен таким образом, что с помощью него можно представлять ассоциативные массивы. Каждое значение внутри него — это массив из двух элементов, 
// где первый элемент — ключ, а второй — значение. В свою очередь, если значение тоже является массивом, то считается, 
// что это вложенное представление ассоциативного массива. Другими словами, любой массив внутри исходного массива всегда рассматривается как данные, 
// которые нужно конвертировать в объект.

const convert = (mass) => {
  const cb = (acc, massive) => {
    const [key, value] = massive;
    if (Array.isArray(value)) {
      acc[key] = { ...convert(value) };
      return acc;
    }
    acc[key] = value;
    return acc;
  };
  return mass.reduce(cb, {});
};
export default convert;

/* __tests__ */

import convert from '../convert.js';

test('convert', () => {
  const tree1 = [];
  const result1 = convert(tree1);
  expect(result1).toEqual({});

  const tree2 = [['key', 'value']];
  const result2 = convert(tree2);
  expect(result2).toEqual({ key: 'value' });

  const tree3 = [['key2', 'value2'], ['key', 'value']];
  const result3 = convert(tree3);
  expect(result3).toEqual({ key: 'value', key2: 'value2' });

  const tree4 = [
    ['key2', 'value2'],
    ['anotherKey', [
      ['key2', false],
      ['innerKey', []],
    ]],
    ['key', null],
    ['anotherKey2', [
      ['wow', [['one', 'two'], ['three', 'four']]],
      ['key2', true],
    ]],
  ];
  const result4 = convert(tree4);
  expect(result4).toEqual({
    anotherKey: {
      innerKey: {}, key2: false,
    },
    anotherKey2: {
      key2: true,
      wow: {
        one: 'two',
        three: 'four',
      },
    },
    key: null,
    key2: 'value2',
  });
});
