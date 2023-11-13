// Реализуйте функцию sanitize(), которая принимает на вход объект и массив ключей. Также она должна возвращать новый объект, но уже без указанных полей.

// const user = sanitize({
//   name: 'John',
//   password: '1q2w3e',
//   token: 'test',
// }, ['password', 'token']); // { name: string }
 
// console.log(user); // => { name: 'John' }
// Обратите внимание, что в выходном типе также не должно быть этих полей.

function sanitize<O, K extends keyof O>(obj: O, keysToDel: K[]): Omit<O, K> {
  const sanitized = { ...obj };
  keysToDel.forEach((keyToDel) => delete sanitized[keyToDel]);
  return sanitized;
}

export default sanitize;

/* __tests__ */

import * as ta from 'type-assertions';

import sanitize from '../solution';

test('sanitize', () => {
  const obj = {
    name: 'John',
    age: 30,
    password: '123456',
  };

  expect(sanitize(obj, ['name', 'age'])).toEqual({
    password: '123456',
  });

  const user = sanitize(obj, ['password']);

  ta.assert<ta.Equal<typeof user, { name: string; age: number }>>();

  const params = {
    page: 1,
    limit: 10,
    filter: {
      name: 'John',
    },
  };

  const query = sanitize(params, ['filter']);
  expect(query).toEqual({
    page: 1,
    limit: 10,
  });

  ta.assert<ta.Equal<typeof query, { page: number; limit: number, }>>();
});
