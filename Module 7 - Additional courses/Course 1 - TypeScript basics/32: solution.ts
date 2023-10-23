// Реализуйте функцию getUserFriends(), которая принимает JSON с массивом пользователей и с массивом id друзей, и возвращает список друзей пользователя по id.
// Друзья каждого пользователя хранятся в поле friends.

// Если пользователь с указанным id не найден, то функция должна вернуть пустой массив.

// const userJson = JSON.stringify({
//   users: [
//     { id: 1, name: 'John', age: 20 },
//     { id: 2, name: 'Mary', age: 21 },
//     { id: 3, name: 'Kate', age: 19 },
//     { id: 4, name: 'Ann', age: 18 },
//   ],
//   friends: [
//     [1, 2],
//     [1, 3]
//   ],
// });
 
// getUserFriends(userJson, 1); // [{ id: 2, name: 'Mary', age: 21 }, { id: 3, name: 'Kate', age: 19 }]
// getUserFriends(userJson, 2); // [{ id: 1, name: 'John', age: 20 }]
// getUserFriends(userJson, 3); // [{ id: 1, name: 'John', age: 20 }]
// getUserFriends(userJson, 4); // []

// В примере выше имеется 4 пользователя. Массив friends содержит массивы с id пользователей кто с кем дружит.
// В примере выше пользователь с id равным 1 дружит с двумя пользователями с id равным 2 и 3.

type User = {
  id: number,
  name: string,
  age: number,
};

type Friends = [number, number];

export type UserResponse = {
  users: User[],
  friends: Friends[]
};

function getUserFriends(userJson: string, currId: number): User[] {
  const parsedUserJson: UserResponse = JSON.parse(userJson);
  const { users, friends } = parsedUserJson;
  const init: User[] = [];
  return friends.reduce((acc: User[], friendPair: Friends): User[] => {
    if (!friendPair.includes(currId)) {
      return acc;
    }
    const [ownerId, anotherId] = friendPair;
    const friendId = ownerId === currId ? anotherId : ownerId;
    return [...acc, ...users.filter(({ id }) => id === friendId)];
  }, init);
}

export default getUserFriends;

/* __tests__ */

import getUserFriends, { UserResponse } from '../solution';

test('getUserFriends', () => {
  const userJson = JSON.stringify(<UserResponse>{
    users: [
      { id: 1, name: 'John', age: 20 },
      { id: 2, name: 'Mary', age: 21 },
      { id: 3, name: 'Peter', age: 22 },
      { id: 4, name: 'Ann', age: 23 },
    ],
    friends: [
      [1, 2],
      [1, 3],
      [3, 2],
    ],
  });

  const friends = getUserFriends(userJson, 10);
  expect(friends).toEqual([]);

  const friends1 = getUserFriends(userJson, 1);
  expect(friends1).toEqual([
    { id: 2, name: 'Mary', age: 21 },
    { id: 3, name: 'Peter', age: 22 },
  ]);

  const friends2 = getUserFriends(userJson, 2);
  expect(friends2).toEqual([
    { id: 1, name: 'John', age: 20 },
    { id: 3, name: 'Peter', age: 22 },
  ]);

  const friends3 = getUserFriends(userJson, 3);
  expect(friends3).toEqual([
    { id: 1, name: 'John', age: 20 },
    { id: 2, name: 'Mary', age: 21 },
  ]);
});
