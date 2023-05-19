// Реализуйте функцию takeOldest(), которая принимает на вход список пользователей и возвращает самых взрослых. 
// Количество возвращаемых пользователей задается вторым параметром, который по умолчанию равен единице. Экспортируйте данную функцию по умолчанию.

import _ from 'lodash';

const takeOldest = (users, count = 1) => {
  const sorted = _.sortBy(users, ({ birthday }) => Date.parse(birthday));
  return sorted.slice(0, count);
};

export default takeOldest;

/* __tests__ */

import takeOldest from '../users.js';

describe('takeOldest', () => {
  const users = [
    { name: 'Tirion', birthday: 'Nov 19, 1988' },
    { name: 'Sam', birthday: 'Nov 22, 1999' },
    { name: 'Rob', birthday: 'Jan 11, 1975' },
    { name: 'Sansa', birthday: 'Mar 20, 2001' },
    { name: 'Tisha', birthday: 'Feb 27, 1992' },
    { name: 'Chris', birthday: 'Dec 25, 1995' },
  ];

  it('test 1', () => {
    const expected = [
      { name: 'Rob', birthday: 'Jan 11, 1975' },
    ];
    expect(takeOldest(users)).toEqual(expected);
  });

  it('test 2', () => {
    const expected = [
      { name: 'Rob', birthday: 'Jan 11, 1975' },
      { name: 'Tirion', birthday: 'Nov 19, 1988' },
    ];
    expect(takeOldest(users, 2)).toEqual(expected);
  });

  it('test 3', () => {
    const expected = [
      { name: 'Rob', birthday: 'Jan 11, 1975' },
      { name: 'Tirion', birthday: 'Nov 19, 1988' },
      { name: 'Tisha', birthday: 'Feb 27, 1992' },
      { name: 'Chris', birthday: 'Dec 25, 1995' },
      { name: 'Sam', birthday: 'Nov 22, 1999' },
    ];
    expect(takeOldest(users, 5)).toEqual(expected);
  });
});
