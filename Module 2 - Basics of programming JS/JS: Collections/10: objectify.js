const objectify = (coll, fn) => {
  const compare = (a, b) => {
    const fn1 = fn(a);
    const fn2 = fn(b);
    if (fn1 > fn2) {
      return 1;
    }
    if (fn1 < fn2) {
      return -1;
    }
    return 0;
  };
  const sortColl = coll.sort(compare);
  const cb = (acc, obj) => {
    acc[fn(obj)] = obj;
    return acc;
  };
  return sortColl.reduce(cb, {});
};
export default objectify;

/* __tests__ */

import objectify from '../objectify';

const cars = [
  {
    id: 1, brand: 'bmw', model: 'm5', year: 2014,
  },
  {
    id: 8, brand: 'bmw', model: 'm4', year: 2013,
  },
  {
    id: 100, brand: 'kia', model: 'sorento', year: 2014,
  },
  {
    id: 93, brand: 'kia', model: 'rio', year: 2010,
  },
  {
    id: 70, brand: 'kia', model: 'sportage', year: 2012,
  },
];

const cars2 = [
  { brand: 'bmw', model: 'm3', year: 2013 },
  { brand: 'opel', model: 'astra', year: 2014 },
  { brand: 'hyundai', model: 'accent', year: 2014 },
  { brand: 'kia', model: 'rio', year: 2013 },
  { brand: 'kia', model: 'sportage', year: 2015 },
];

test('objectify', () => {
  const actual1 = objectify(cars, (car) => car.id);

  const expected1 = {
    1: {
      brand: 'bmw', id: 1, model: 'm5', year: 2014,
    },
    70: {
      brand: 'kia', id: 70, model: 'sportage', year: 2012,
    },
    100: {
      id: 100, brand: 'kia', model: 'sorento', year: 2014,
    },
    8: {
      brand: 'bmw', id: 8, model: 'm4', year: 2013,
    },
    93: {
      brand: 'kia', id: 93, model: 'rio', year: 2010,
    },
  };

  expect(actual1).toEqual(expected1);

  const actual2 = objectify(cars2, (car) => car.model);

  const expected2 = {
    accent: { brand: 'hyundai', model: 'accent', year: 2014 },
    astra: { brand: 'opel', model: 'astra', year: 2014 },
    m3: { brand: 'bmw', model: 'm3', year: 2013 },
    rio: { brand: 'kia', model: 'rio', year: 2013 },
    sportage: { brand: 'kia', model: 'sportage', year: 2015 },
  };

  expect(actual2).toEqual(expected2);
});
