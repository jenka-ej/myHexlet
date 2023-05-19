// Напишите тесты для объекта Validator. Этот валидатор проверяет корректность данных. Принцип его работы следующий:
// 1) С помощью метода addCheck(fn) в валидатор добавляются проверки. Каждая проверка представляет из себя функцию-предикат, 
// которая принимает на вход проверяемое значение и возвращает либо true либо false в зависимости от того, соответствует ли значение требованиям проверки или нет. 
// Проверки, добавленные в валидатор, накапливаются. Каждая следующая добавленная проверка дополняет предыдущую
// 2) С помощью метода isValid(value), пользователь Validator проверяет соответствие значения всем добавленным проверкам. 
// Если не было добавлено ни одной проверки, считается, что любое значение верное

/* right1.js */

export default () => ({
  checks: [],

  addCheck(fn) {
    this.checks.push(fn);
  },

  isValid(data) {
    return this.checks.every((fn) => fn(data));
  },
});

/* wrong1.js */

export default () => ({
  checks: [],

  addCheck(fn) {
    this.checks.push(fn);
  },

  isValid() {
    return false;
  },
});

/* wrong2.js */

export default () => ({
  checks: [],

  addCheck(fn) {
    this.checks = [fn];
  },

  isValid(data) {
    return this.checks.every((fn) => fn(data));
  },
});

/* wrong3.js */

export default () => ({
  checks: [],

  addCheck(fn) {
    this.checks.push(fn);
  },

  isValid() {
    return true;
  },
});

/* index.js */

import right1 from './right1.js';
import wrong1 from './wrong1.js';
import wrong2 from './wrong2.js';
import wrong3 from './wrong3.js';

const implementations = {
  right1, wrong1, wrong2, wrong3,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return implementations[name];
};

/* __tests__ */

import _ from 'lodash';
import getImplementation from '../implementations/index.js';

const makeValidator = getImplementation();

test('validator', () => {
  const validator = makeValidator();
  expect(validator.isValid('value')).toBe(true);

  validator.addCheck(_.isNumber);
  expect(validator.isValid('string')).toBe(false);

  validator.addCheck((v) => v > 10);
  expect(validator.isValid(100)).toBe(true);

  validator.addCheck((v) => v % 2 === 0);
  expect(validator.isValid(11)).toBe(false);
  expect(validator.isValid(12)).toBe(true);
  expect(validator.isValid(8)).toBe(false);
});
