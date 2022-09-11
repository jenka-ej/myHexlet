import getGcd from './utils.js';

const makeRational = (numer, denom) => {
  const gcd = getGcd(numer, denom);
  return { numer: numer / gcd, denom: denom / gcd };
};

const getNumer = (rational) => rational.numer;

const getDenom = (rational) => rational.denom;

const add = (rational1, rational2) => {
  const newDenomrat1 = getNumer(rational1) * getDenom(rational2);
  const newDenomrat2 = getNumer(rational2) * getDenom(rational1);
  const newNumer = newDenomrat1 + newDenomrat2;
  const newDenom = getDenom(rational1) * getDenom(rational2);
  return makeRational(newNumer, newDenom);
};

const sub = (rational1, rational2) => {
  const newDenomrat1 = getNumer(rational1) * getDenom(rational2);
  const newDenomrat2 = getNumer(rational2) * getDenom(rational1);
  const newNumer = newDenomrat1 - newDenomrat2;
  const newDenom = getDenom(rational1) * getDenom(rational2);
  return makeRational(newNumer, newDenom);
};

const ratToString = (rat) => `${getNumer(rat)}/${getDenom(rat)}`;

export {
  makeRational,
  getNumer,
  getDenom,
  add,
  sub,
  ratToString,
};

/* __tests__ */

import {
  makeRational, getNumer, getDenom, add, sub, ratToString,
} from '../rational.js';

test('rational', () => {
  const rat1 = makeRational(3, 9);
  expect(getNumer(rat1)).toBe(1);
  expect(getDenom(rat1)).toBe(3);

  const rat2 = makeRational(10, 3);
  expect(add(rat1, rat2)).toEqual(makeRational(11, 3));
  expect(sub(rat1, rat2)).toEqual(makeRational(-3, 1));

  const rat3 = makeRational(-4, 16);
  expect(getNumer(rat3)).toBe(-1);
  expect(getDenom(rat3)).toBe(4);

  const rat4 = makeRational(12, 5);
  expect(add(rat3, rat4)).toEqual(makeRational(43, 20));
  expect(sub(rat3, rat4)).toEqual(makeRational(-53, 20));

  expect(ratToString(rat1)).toBe('1/3');
  expect(ratToString(rat3)).toBe('-1/4');

  const rat5 = makeRational(1, 15);
  const rat6 = makeRational(4, 25);
  expect(add(rat5, rat6)).toEqual(makeRational(17, 75));
  expect(sub(rat5, rat6)).toEqual(makeRational(-7, 75));
});
