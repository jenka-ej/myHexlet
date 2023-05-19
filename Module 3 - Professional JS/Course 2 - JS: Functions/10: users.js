// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список пользователей и возвращает плоский список подруг всех пользователей 
// (без сохранения ключей). 
// Друзья каждого пользователя хранятся в виде массива в ключе friends. Пол доступен по ключу gender и может принимать значения male или female.

export default (users) => {
  const friendsOfUsers = users.map(({ friends }) => friends);
  return friendsOfUsers.flat().filter(({ gender }) => gender === 'female');
};

/* __tests__ */

import { describe, it, expect } from '@jest/globals';
import getGirlFriends from '../users.js';

describe('getGirlFriends', () => {
  it('should be empty', () => {
    expect(getGirlFriends([])).toEqual([]);
  });

  it('should return girl friends', () => {
    const users = [
      {
        name: 'Tirion',
        friends: [
          { name: 'Mira', gender: 'female' },
          { name: 'Ramsey', gender: 'male' },
        ],
      },
      { name: 'Bronn', friends: [] },
      {
        name: 'Sam',
        friends: [
          { name: 'Aria', gender: 'female' },
          { name: 'Keit', gender: 'female' },
        ],
      },
      {
        name: 'Rob',
        friends: [
          { name: 'Taywin', gender: 'male' },
        ],
      },
    ];

    const expected = [
      { name: 'Mira', gender: 'female' },
      { name: 'Aria', gender: 'female' },
      { name: 'Keit', gender: 'female' },
    ];

    expect(getGirlFriends(users)).toEqual(expected);
  });
});
