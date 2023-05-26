// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает приветствие для пользователя. 
// Это приветствие показывается пользователю на сайте. Если пользователь гость, то выводится "Nice to meet you Guest!", если не гость, 
// то "Hello <Имя>!", где "<Имя>" это имя реального пользователя.
// В этой задаче, способ решения остается на ваше усмотрение. Используйте знания полученные в этом курсе.

export default (mainUser) => {
  const setting = {
    Guest: (user) => `Nice to meet you ${user.getName()}!`,
    User: (user) => `Hello ${user.getName()}!`,
  };

  return setting[mainUser.isType()](mainUser);
};

/* Guest.js */

class Guest {
  constructor() {
    this.type = 'Guest';
    this.name = 'Guest';
  }

  getName() {
    return this.name;
  }

  isType() {
    return this.type;
  }
}

export default Guest;

/* User.js */

class User {
  constructor(name) {
    this.type = 'User';
    this.name = name;
  }

  getName() {
    return this.name;
  }

  isType() {
    return this.type;
  }
}

export default User;

/* __tests__ */

import Guest from '../Guest.js';
import User from '../User.js';
import getGreeting from '../helpers.js';

it('getGreeting', () => {
  const guest = new Guest();
  expect(getGreeting(guest)).toBe('Nice to meet you Guest!');

  const user1 = new User('Petr');
  expect(getGreeting(user1)).toBe('Hello Petr!');

  const user2 = new User('Mark');
  expect(getGreeting(user2)).toBe('Hello Mark!');

  const user3 = new User('Guest');
  expect(getGreeting(user3)).toBe('Hello Guest!');
});
