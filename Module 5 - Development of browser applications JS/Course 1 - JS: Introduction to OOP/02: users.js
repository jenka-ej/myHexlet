// Реализуйте и экспортируйте функцию getMutualFriends(), которая принимает на вход двух пользователей 
// и возвращает массив состоящий из общих друзей этих пользователей.
// Интерфейс абстракции "Пользователь":
// user.id – возвращает идентификатор пользователя, по которому можно его отличить от остальных.
// user.getFriends() – возвращает список друзей (то есть пользователей).

export function getMutualFriends(user1, user2) {
  const cb = (acc, friend) => {
    acc.push(friend.id);
    return acc;
  };
  const friends1 = user1.getFriends().reduce(cb, []);
  return user2.getFriends().filter((friend2) => friends1.includes(friend2.id));
}

/* __tests__ */

import makeUser from '../user.js';
import { getMutualFriends } from '../users.js';

test('without friends', () => {
  const user1 = makeUser();
  const user2 = makeUser();
  expect(getMutualFriends(user1, user2)).toEqual([]);
});

test('with friends', () => {
  const expected = [makeUser({ id: 2 }), makeUser({ id: 8 })];
  const user1 = makeUser({
    friends: [makeUser({ id: 2 }), makeUser({ id: 8 }), makeUser({ id: 100 })],
  });
  const user2 = makeUser({
    friends: [makeUser({ id: 2 }), makeUser({ id: 7 }), makeUser({ id: 8 })],
  });
  const mutualFriends = getMutualFriends(user1, user2);

  expect(JSON.stringify(mutualFriends)).toEqual(JSON.stringify(expected));
});
