// Реализуйте функцию getOlderUser(), которая принимает на вход двух пользователей и возвращает того, который старше.
// Если пользователи являются ровесниками, то возвращается null.
// const user1 = { name: 'Petr', age: 8 };
// Определите для пользователя псевдоним, чтобы не дублировать определение его типа в параметрах функции.

type User = {
  name: string,
  age: number,
};

function getOlderUser(user1: User, user2: User): User | null {
  if (user1.age > user2.age) {
    return user1;
  }
  if (user1.age < user2.age) {
    return user2;
  }
  return null;
}

export type { User };
export default getOlderUser;

/* __tests__ */

import * as ta from 'type-assertions';

import getOlderUser, { User } from '../solution';

test('function', () => {
  const user1 = {
    name: 'sem',
    age: 3,
  };

  const user2 = {
    name: 'inna',
    age: 5,
  };

  const user3 = {
    name: 'mika',
    age: 5,
  };

  expect(getOlderUser(user1, user2)).toEqual(user2);
  expect(getOlderUser(user2, user1)).toEqual(user2);

  expect(getOlderUser(user2, user3)).toBeNull();

  ta.assert<ta.Equal<ReturnType<typeof getOlderUser>, User | null>>();
});
