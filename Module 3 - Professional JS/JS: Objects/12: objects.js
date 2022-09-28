const getSortedNames = (mass) => {
  const result = [];
  for (const { name } of mass) {
    result.push(name);
  }
  return result.sort();
};
export default getSortedNames;

/* __tests__ */

import getSortedNames from '../objects.js';

describe('getSortedNames', () => {
  it('test 1', () => {
    const data = [
      { name: 'Bronn', gender: 'male', birthday: '1973-03-23' },
      { name: 'Reigar', gender: 'male', birthday: '1973-11-03' },
      { name: 'Eiegon', gender: 'male', birthday: '1963-11-03' },
      { name: 'Sansa', gender: 'female', birthday: '2012-11-03' },
    ];
    expect(getSortedNames(data)).toEqual(['Bronn', 'Eiegon', 'Reigar', 'Sansa']);
  });

  it('test 2', () => {
    const data = [
      { name: 'Jon', gender: 'male', birthday: '1980-11-03' },
      { name: 'Robb', gender: 'male', birthday: '1980-05-14' },
      { name: 'Tisha', gender: 'female', birthday: '2012-11-03' },
      { name: 'Rick', gender: 'male', birthday: '2012-11-03' },
      { name: 'Joffrey', gender: 'male', birthday: '1999-11-03' },
      { name: 'Edd', gender: 'male', birthday: '1973-11-03' },
    ];
    expect(getSortedNames(data)).toEqual(['Edd', 'Joffrey', 'Jon', 'Rick', 'Robb', 'Tisha']);
  });
});
