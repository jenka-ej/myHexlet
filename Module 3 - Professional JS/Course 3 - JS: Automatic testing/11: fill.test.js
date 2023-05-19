// Напишите тесты для функции fill(coll, value, start, end), которая заполняет элементы массива переданным значением, 
// начиная со старта и заканчивая (но не включая) конечной позицией. Функция меняет исходный массив!
// Функция принимает следующие аргументы:
// 1) coll — массив, элементы которого будут заполнены
// 2) value — значение, которым будут заполнены элементы массива
// 3) start — стартовая позиция, по умолчанию равна нулю
// 4) end — конечная позиция, по умолчанию равна длине массива

// Реализуйте функцию fill(coll, value, start, end), основываясь на описании и примерах её работы. Функция работает с неотрицательными значениями start и end.
// Экспортируйте функцию по умолчанию. 

/* functions.js */

import _ from 'lodash';
import usersFill from '../fill';

const functions = {
  userVersion: usersFill,
  right: _.fill,
  wrong1: (coll, value, start = 1, end = coll.length) => _.fill(coll, value, start, end),
  wrong2: (coll, value, start = 0, end = coll.length) => {
    if (start >= coll.length) {
      coll[start] = value;
    } else {
      _.fill(coll, value, start, end);
    }
    return coll;
  },
  wrong3: (coll, value, start = 0, end = coll.length) => {
    if (start >= end) {
      coll[end] = value;
    } else {
      _.fill(coll, value, start, end);
    }
    return coll;
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'userVersion';
  return functions[name];
};

/* fill.js */

const fill = (coll, value, start = 0, end = coll.length) => {
  const collLength = coll.length;
  const normalizedStart = start > collLength ? end : start;
  const normalizedEnd = end > collLength ? collLength : end;
  for (let i = normalizedStart; i < normalizedEnd; i += 1) {
    coll[i] = value;
  }
  return coll;
};

export default fill;

/* __tests__ */

let array;

beforeEach(() => {
  array = [1, 2, 3, 4];
});

test('common case', () => {
  fill(array, '*', 1, 3);
  expect(array).toEqual([1, '*', '*', 4]);
});

test('should use default start and end', () => {
  fill(array, '*');
  expect(array).toEqual(['*', '*', '*', '*']);
});

test('should works with start >= length', () => {
  fill(array, '*', 10, 12);
  expect(array).toEqual([1, 2, 3, 4]);
});

test('should works with start >= end', () => {
  fill(array, '*', 2, 2);
  expect(array).toEqual([1, 2, 3, 4]);
});

test('should works with end > length', () => {
  fill(array, '*', 0, 10);
  expect(array).toEqual(['*', '*', '*', '*']);
});
