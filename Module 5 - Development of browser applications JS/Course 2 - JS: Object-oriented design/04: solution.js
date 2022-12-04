// Реализуйте в классе Truncater конструктор и метод truncate(). Метод принимает текст и следующие опции:
// 1) separator - символ, заменяющий обрезанную часть строки
// 2) length - максимальная длина исходной строки. Если строка короче, чем эта опция, то возвращается исходная строка.
// Конфигурацию по умолчанию можно переопределить через конструктор класса и вторым аргументом метода truncate(). Оба способа можно комбинировать.

export default class Truncater {
  static defaultOptions = {
    separator: '...',
    length: 200,
  };

  constructor(options) {
    this.options = { ...Truncater.defaultOptions, ...options };
  }

  truncate(text, options) {
    const newOptions = { ...this.options, ...options };
    if (text.length <= newOptions.length) {
      return text;
    }
    return `${text.substring(0, newOptions.length)}${newOptions.separator}`;
  }
}

/* __tests__ */

import Truncater from '../solution.js';

const cases1 = [
  [{}, 'one two'],
  [{ length: 6 }, 'one tw...'],
  [{ separator: '.' }, 'one two'],
  [{ length: 3 }, 'one...'],
  [{ length: 7 }, 'one two'],
];

describe('Truncater with default options', () => {
  const truncater = new Truncater();

  test.each(cases1)('extend options: %o', (params, expected) => {
    expect(truncater.truncate('one two', params)).toEqual(expected);
  });
});

const cases2 = [
  [{}, 'one...'],
  [{ separator: '!' }, 'one!'],
  [{}, 'one...'],
  [{ length: 7 }, 'one two'],
];

describe('Truncater with custom length', () => {
  const truncater = new Truncater({ length: 3 });

  test.each(cases2)('extend options: %o', (params, expected) => {
    expect(truncater.truncate('one two', params)).toEqual(expected);
  });
});

const cases3 = [
  [{}, 'one two'],
  [{ length: 3 }, 'one__'],
  [{ length: 5, separator: '' }, 'one t'],
  [{}, 'one two'],
];

describe('Truncater with custom separator', () => {
  const truncater = new Truncater({ separator: '__' });

  test.each(cases3)('extend options: %o', (params, expected) => {
    expect(truncater.truncate('one two', params)).toEqual(expected);
  });
});
