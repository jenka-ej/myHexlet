import _ from 'lodash';

const count = (word, mass) => {
  let repeat = 0;
  for (const massiveWord of mass) {
    if (word === massiveWord) {
      repeat += 1;
    }
  }
  return repeat;
};
const countWords = (str) => {
  const mass = _.words(str.toLowerCase());
  const uniqmass = _.uniq(mass);
  const cb = (acc, key) => {
    acc[key] = count(key, mass);
    return acc;
  };
  return uniqmass.reduce(cb, {});
};
export default countWords;

/* __tests__ */

import countWords from '../words.js';

test('countWords 1', () => {
  const text = '';
  const expected = {};
  expect(countWords(text)).toEqual(expected);
});

test('countWords 2', () => {
  const text = 'one two three two ONE one wow';
  const expected = {
    one: 3,
    two: 2,
    three: 1,
    wow: 1,
  };
  expect(countWords(text)).toEqual(expected);
});

test('countWords 3', () => {
  const text = 'another one sentence with strange Words words';
  const expected = {
    another: 1,
    one: 1,
    sentence: 1,
    with: 1,
    strange: 1,
    words: 2,
  };
  expect(countWords(text)).toEqual(expected);
});
