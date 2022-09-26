import _ from 'lodash';

const genDiff = (obj1, obj2) => {
  const getKeys = (obj) => Object.keys(obj);
  const mass = getKeys(obj1).concat(getKeys(obj2));
  const uniqSortMass = _.sortBy(mass.filter((key, index) => mass.indexOf(key) === index));
  const cb = (acc, key) => {
    const obj1HasKey = Object.getOwnPropertyDescriptor(obj1, key);
    const obj2HasKey = Object.getOwnPropertyDescriptor(obj2, key);
    if (obj1HasKey && obj2HasKey) {
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (value1 === value2) {
        acc[key] = 'unchanged';
        return acc;
      }
      acc[key] = 'changed';
      return acc;
    }
    if (obj1HasKey && !obj2HasKey) {
      acc[key] = 'deleted';
      return acc;
    }
    acc[key] = 'added';
    return acc;
  };
  return uniqSortMass.reduce(cb, {});
};
export default genDiff;

/* __tests__ */

import genDiff from '../solution.js';

describe('genDiff', () => {
  it('test 1', () => {
    const actual = genDiff({}, {});
    expect(actual).toEqual({});
  });

  it('test 2', () => {
    const actual = genDiff({ one: 'eon' }, { two: 'own' });
    const expected = {
      one: 'deleted',
      two: 'added',
    };
    expect(actual).toEqual(expected);
  });

  it('test 3', () => {
    const actual = genDiff({ one: 'eon', two: 'two' }, { two: 'own', one: 'one' });
    const expected = {
      one: 'changed',
      two: 'changed',
    };
    expect(actual).toEqual(expected);
  });

  it('test 4', () => {
    const actual = genDiff({}, { two: 'own' });
    const expected = {
      two: 'added',
    };
    expect(actual).toEqual(expected);
  });

  it('test 5', () => {
    const actual = genDiff({ one: 'eon' }, {});
    const expected = {
      one: 'deleted',
    };
    expect(actual).toEqual(expected);
  });

  it('test 6', () => {
    const actual = genDiff({ unchanged: 'item' }, { unchanged: 'item' });
    expect(actual).toEqual({ unchanged: 'unchanged' });
  });
});
