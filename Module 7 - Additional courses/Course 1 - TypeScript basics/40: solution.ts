// Другое полезное применение статических свойств и методов - создание фабричных методов. Фабричный метод - это статический метод,
// который возвращает новый экземпляр класса. Реализуйте класс UserResponse с полем user: string и фабричный метод fromArray,
// который принимает массив и возвращает массив экземпляров класса UserResponse:

// const response = UserResponse.fromArray(['user1', 'user2', 'user3']);
// console.log(response[0].user); // user1
// console.log(response[0] instanceof UserResponse); // true

class UserResponse {
  static fromArray(users: string[]): UserResponse[] {
    return users.map((user) => new UserResponse(user));
  }

  constructor(public user: string) {}
}

export default UserResponse;

/* __tests__ */

import UserResponse from '../solution';

test('UserResponse', () => {
  const users = ['user1', 'user2'];
  const result = UserResponse.fromArray(users);

  expect(result).toEqual([
    new UserResponse('user1'),
    new UserResponse('user2'),
  ]);
  expect(result[0]).toBeInstanceOf(UserResponse);

  const users2 = ['user3', 'user4', 'user5'];
  const result2 = UserResponse.fromArray(users2);

  expect(result2[0].user).toBe('user3');
  expect(result2[2]).toBeInstanceOf(UserResponse);
});
