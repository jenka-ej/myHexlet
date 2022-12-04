// Реализуйте и экспортируйте по умолчанию класс PasswordValidator, ориентируясь на тесты.
// Этот валидатор поддерживает следующие опции:
// 1) minLength (по умолчанию 8) - минимальная длина пароля
// 2) containNumbers (по умолчанию true) - требование содержать хотя бы одну цифру
// Опции передаются одним объектом в конструктор валидатора.

const hasNumber = (string) => (string.search(/\d/) !== -1);

export default class PasswordValidator {
  constructor(options) {
    this.options = { minLength: 8, containNumbers: true, ...options };
  }

  validate(password) {
    const noNum = {
      containNumbers: 'should contain at least one number',
    };
    const noLength = {
      minLength: 'too small',
    };
    const noNumNoLength = {
      minLength: 'too small',
      containNumbers: 'should contain at least one number',
    };
    const okey = {};
    const lengthOkey = password.length >= this.options.minLength;
    if (this.options.containNumbers === true) {
      const numOkey = hasNumber(password);
      if (numOkey && lengthOkey) {
        return okey;
      }
      if (!numOkey) {
        if (lengthOkey) {
          return noNum;
        }
        return noNumNoLength;
      }
      return noLength;
    }
    if (lengthOkey) {
      return okey;
    }
    return noLength;
  }
}

/* __tests__ */

import PasswordValidator from '../solution.js';

test('testValidateWithDefaultOptions', () => {
  const validator = new PasswordValidator();
  const errors1 = validator.validate('qwertya3sdf');
  expect(errors1).toEqual({});

  const errors2 = validator.validate('qwerty');
  expect(errors2).toEqual({
    minLength: 'too small',
    containNumbers: 'should contain at least one number',
  });

  const errors3 = validator.validate('q23ty');
  expect(errors3).toEqual({ minLength: 'too small' });
});

test('testValidateWithOptions 1', () => {
  const validator = new PasswordValidator({ containNumbers: false });
  const errors1 = validator.validate('qwertyui');
  expect(errors1).toEqual({});

  const errors2 = validator.validate('qwerty');
  expect(errors2).toEqual({ minLength: 'too small' });

  const errors3 = validator.validate('another-password');
  expect(errors3).toEqual({});
});

test('testValidateWithOptions 2', () => {
  const validator = new PasswordValidator({ containNumbers: true, minLength: 10 });
  const errors1 = validator.validate('qwert3yag');
  expect(errors1).toEqual({
    minLength: 'too small',
  });

  const errors2 = validator.validate('qwerty');
  expect(errors2).toEqual({
    minLength: 'too small',
    containNumbers: 'should contain at least one number',
  });

  const errors3 = validator.validate('q2wer3ty4i');
  expect(errors3).toEqual({});
});

test('testValidateWithOptions 3', () => {
  const validator = new PasswordValidator({ minLength: 0, containNumbers: null });
  const errors1 = validator.validate('');
  expect(errors1).toEqual({});
});

test('testValidateWithIncorrectOptions', () => {
  const validator = new PasswordValidator({ containNumberz: null });
  const errors1 = validator.validate('qwert5yui');
  expect(errors1).toEqual({});

  const errors2 = validator.validate('0werty');
  expect(errors2).toEqual({ minLength: 'too small' });
});
