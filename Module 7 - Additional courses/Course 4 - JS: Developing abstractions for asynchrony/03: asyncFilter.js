// Реализуйте и экспортируйте по умолчанию функцию.

// Примеры:
// const coll = [10, 53, true, false, '', NaN, 22];
// asyncFilter(coll, (v) => typeof v === 'number', (result) => {
//   console.log(result); // => [10, 53, NaN, 22]
// });

// Так как фильтр асинхронный, то вызов предиката для каждого элемента коллекции должен выполняться после setTimeout().

// Проверка на соответствие внутри фильтра должна быть нестрогой как и в обычном фильтре:
// [10, 53, true, false, '', NaN, 22].filter(v => v);
// // [ 10, 53, true, 22 ]

export default function asyncFilter(coll, fn, callback) {
  const iter = (massive, acc) => {
    if (massive.length === 0) {
      callback(acc);
      return;
    }
    const [head, ...rest] = massive;
    const newAcc = fn(head) ? [...acc, head] : acc;
    setTimeout(iter, 0, rest, newAcc);
  };
  iter(coll, []);
}

/* __tests__ */

import asyncFilter from '../asyncFilter';

test('should work', () => {
  const coll = [];
  return new Promise((done) => {
    asyncFilter(coll, (x) => x, (result) => {
      expect(result).toEqual(coll);
      expect(result).not.toBe(coll);
      done();
    });
  });
});

test('should work 2', () => {
  const coll = [10, 53, true, false, '', NaN, 22];
  return new Promise((done) => {
    asyncFilter(coll, (x) => x, (result) => {
      expect(result).toEqual([10, 53, true, 22]);
      expect(result).not.toBe(coll);
      done();
    });
  });
});

test('should work async', () => {
  const coll = [1, 5, 2, 3, 4, 10, 9];
  return new Promise((done) => {
    asyncFilter(coll, (x) => x, (result) => {
      expect(result).toEqual(coll);
      expect(result).not.toBe(coll);
      done();
    });
  });
});

test('function should be asynchronous', () => {
  const coll = [1, 2, 3];
  let actual = null;
  asyncFilter(coll, (x) => x, (result) => {
    actual = result;
  });
  expect(actual).toBeNull();
});
