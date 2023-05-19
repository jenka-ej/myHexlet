// В проекте имеются три функции по работе с массивами: get(), indexOf() и slice(). 
// Программист, работавший на этом проекте до вас, недостаточно ответственно отнесся к написанию тестов. 
// Вам нужно исправить этот недочет и дописать недостающие тесты. Тут вам поможет отчет по покрытию тестами. 
// Работу в этом упражнении можно выстроить следующим образом:
// 1) Выполните в терминале команду make test-coverage, и сгенерируйте отчет по покрытию кода тестами. Отчет по покрытию поможет выявить в коде места, 
// не покрытые тестами
// 2) Изучите получившуюся статистику. Посмотрите, какие функции недостаточно покрыты тестами. Обратите внимание на столбец Uncovered Line. 
// Здесь показано, какие именно строки в файлах с функциями не покрыты тестами
// 3) Изучите эти файлы в директории implementations/right. Разберитесь, что происходит в непокрытых строках. Это поможет понять, какие еще случаи нужно проверить
// 4) Допишите тесты на те функции, которые не достаточно покрыты тестами, опираясь на описание их работы и отчет по покрытию

/* right/get.js */

import _ from 'lodash';

const get = (arr, index, defaultValue) => {
  if (index >= arr.length || index < 0) {
    if (_.isNil(defaultValue)) {
      return null;
    }
    return defaultValue;
  }
  return arr[index];
};

export default get;

/* right/indexOf.js */

const indexOf = (coll, value, fromIndex = 0) => {
  const collLength = coll.length;

  if (collLength === 0) {
    return -1;
  }
  let index = fromIndex;

  if (index < 0) {
    if (-index > collLength) {
      index = 0;
    } else {
      index += collLength;
    }
  }

  return coll.indexOf(value, index);
};

export default indexOf;

/* right/slice.js */

const slice = (coll, start = 0, end = coll.length) => {
  const collLength = coll.length;
  if (collLength === 0) {
    return [];
  }
  let normalizedStart = start;

  if (normalizedStart < 0) {
    if (-normalizedStart > collLength) {
      normalizedStart = 0;
    } else {
      normalizedStart += collLength;
    }
  }

  return coll.slice(normalizedStart, end);
};

export default slice;

/* wrong1/get.js */

const get = (arr, index, defaultValue) => {
  if (index >= arr.length || index < 0) {
    if (defaultValue) {
      return false;
    }
    return null;
  }
  return arr[index];
};

export default get;

/* wrong1/indexOf.js */

const indexOf = (coll, value, fromIndex = 0) => {
  const collLength = coll.length;

  if (collLength === 0) {
    return null;
  }

  return coll.indexOf(value, fromIndex);
};

export default indexOf;

/* wrong1/slice.js */

const slice = (coll, start = 0, end = coll.length) => {
  if (coll.length === 0) {
    return null;
  }
  return coll.slice(start, end);
};

export default slice;

/* wrong2/get.js */

const get = (arr, index, defaultValue) => {
  if (index >= arr.length || index < 0) {
    if (defaultValue) {
      return defaultValue;
    }
    return false;
  }
  return arr[index];
};

export default get;

/* wrong2/indexOf.js */

onst indexOf = (coll, value, fromIndex = 0) => {
  if (fromIndex < 0) {
    if (-fromIndex > coll.length) {
      return [];
    }
  }
  return coll.indexOf(value, fromIndex);
};

export default indexOf;

/* wrong2/slice.js */

const slice = (coll, start = 0, end = coll.length) => {
  const collLength = coll.length;

  if (start < 0) {
    if (-start > collLength) {
      return [];
    }
  }

  return coll.slice(start, end);
};

export default slice;

/* wrong3/get.js */

const get = (arr, index, defaultValue = null) => {
  if (defaultValue) {
    return defaultValue;
  }
  if (index >= arr.length || index < 0) {
    return defaultValue;
  }
  return arr[index];
};

export default get;

/* wrong3/indexOf.js */

const indexOf = (coll, value, fromIndex = 0) => {
  if (fromIndex < 0) {
    if (-fromIndex <= coll.length) {
      return coll.indexOf(value);
    }
  }
  return coll.indexOf(value, fromIndex);
};

export default indexOf;

/* wrong3/slice.js */

const slice = (coll, start = 0, end = coll.length) => {
  const collLength = coll.length;

  if (start < 0) {
    if (-start <= collLength) {
      return coll.slice(1);
    }
  }

  return coll.slice(start, end);
};

export default slice;

/* index.js */

import getRight from './right/get.js';
import indexOfRight from './right/indexOf.js';
import sliceRigth from './right/slice.js';

import getWrong1 from './wrong1/get.js';
import indexOfWrong1 from './wrong1/indexOf.js';
import sliceWrong1 from './wrong1/slice.js';

import getWrong2 from './wrong2/get.js';
import indexOfWrong2 from './wrong2/indexOf.js';
import sliceWrong2 from './wrong2/slice.js';

import getWrong3 from './wrong3/get.js';
import indexOfWrong3 from './wrong3/indexOf.js';
import sliceWrong3 from './wrong3/slice.js';

const implementations = {
  right: {
    get: getRight,
    indexOf: indexOfRight,
    slice: sliceRigth,
  },
  wrong1: {
    get: getWrong1,
    indexOf: indexOfWrong1,
    slice: sliceWrong1,
  },
  wrong2: {
    get: getWrong2,
    indexOf: indexOfWrong2,
    slice: sliceWrong2,
  },
  wrong3: {
    get: getWrong3,
    indexOf: indexOfWrong3,
    slice: sliceWrong3,
  },
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right';
  return implementations[name];
};

/* __tests__/functions.test.js */

import getImpelementation from '../implementations/index.js';

const { get, slice, indexOf } = getImpelementation();

test('testing function get()', () => {
  const actual1 = get([1, 2, 3], 1, 'a');
  expect(actual1).toBe(2);

  const actual2 = get([1, 2, 3], 4, 'a');
  expect(actual2).toBe('a');

  const actual3 = get([1, 2, 3], 4);
  expect(actual3).toBeNull();
});

test('testing function slice()', () => {
  const actual1 = slice([1, 2, 3, 4, 5, 6], 1, 4);
  expect(actual1).toEqual([2, 3, 4]);

  expect(slice([])).toEqual([]);

  const actual3 = slice([1, 2, 3, 4, 5, 6], -4, -2);
  expect(actual3).toEqual([3, 4]);

  const actual4 = slice([1, 2, 3, 4], -10, 10);
  expect(actual4).toEqual([1, 2, 3, 4]);
});

test('testing function indexOf()', () => {
  const actual1 = indexOf([2, 7, 3, 2, 4], 2);
  expect(actual1).toBe(0);

  const actual4 = indexOf([], 0);
  expect(actual4).toBe(-1);

  const actual2 = indexOf([1, 2, 3, 2, 4], 2, -3);
  expect(actual2).toBe(3);

  const actual5 = indexOf([1, 2, 2], 2, -10);
  expect(actual5).toBe(1);
});

/* __tests__/test.test.js */

import jest from 'jest';
import path from 'path';
import _ from 'lodash';

const setWrongImplementation = (name) => {
  process.env.FUNCTION_VERSION = name;
};

const unsetImplementation = () => _.unset(process.env, 'FUNCTION_VERSION');

const runTests = (options = {}) => {
  const { showOutput } = options;
  const setupFilesAfterEnv = showOutput
    ? null
    : [path.join(process.cwd(), 'jest.setup.inner.js')];
  return jest.runCLI({
    '_': ['functions.test.js'],
    setupFilesAfterEnv,
    testEnvironment: 'node',
  }, [process.cwd()]);
};

const getNumFailedTests = (testsResult) => {
  const { results } = testsResult;
  return results.numFailedTests;
};

beforeEach(() => {
  unsetImplementation();
});

test('check correct implementation', async () => {
  const testsResult = await runTests({ showOutput: true });
  expect(getNumFailedTests(testsResult)).toBe(0);
});

test('check wrong1', async () => {
  setWrongImplementation('wrong1');
  const testsResult = await runTests();
  expect(getNumFailedTests(testsResult)).toBe(3);
});

test('check wrong2', async () => {
  setWrongImplementation('wrong2');
  const testsResult = await runTests();
  expect(getNumFailedTests(testsResult)).toBe(3);
});

test('check wrong3', async () => {
  setWrongImplementation('wrong3');
  const testsResult = await runTests();
  expect(getNumFailedTests(testsResult)).toBe(3);
});
