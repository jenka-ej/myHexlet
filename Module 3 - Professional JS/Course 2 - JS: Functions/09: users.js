// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список их детей. 
// Дети каждого пользователя хранятся в виде массива в ключе children.

const getChildren = (users) => {
  const childrenOfUsers = users.map(({ children }) => children);
  return childrenOfUsers.flat();
};

export default getChildren;

/* __tests__ */

import { describe, it, expect } from '@jest/globals';
import getChildren from '../users.js';

describe('getChildren', () => {
  it('should be empty', () => {
    expect(getChildren([])).toEqual([]);
  });

  it('test 1', () => {
    const users = [
      {
        name: 'Tirion',
        children: [
          { name: 'Mira', birthday: '1983-03-23' },
        ],
      },
      { name: 'Bronn', children: [] },
      {
        name: 'Sam',
        children: [
          { name: 'Aria', birthday: '2012-11-03' },
          { name: 'Keit', birthday: '1933-05-14' },
        ],
      },
      {
        name: 'Rob',
        children: [
          { name: 'Tisha', birthday: '2012-11-03' },
        ],
      },
    ];

    const expected = [
      { name: 'Mira', birthday: '1983-03-23' },
      { name: 'Aria', birthday: '2012-11-03' },
      { name: 'Keit', birthday: '1933-05-14' },
      { name: 'Tisha', birthday: '2012-11-03' },
    ];

    expect(getChildren(users)).toEqual(expected);
  });
});
