// Реализуйте функцию extract(object, keys), которая возвращает новый объект c указанными ключами. Например:

// const user = {
//   name: 'Tirion',
//   email: 'tirion@lanister.got',
//   age: 35,
// }
 
// extract(user, ['name', 'age']); // { name: 'Tirion', age: 35 }

function extract(obj: object, keys: string[]): object {
  return keys.reduce((acc, key) => {
    if (obj[key]) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
}

export default extract;

/* __tests__ */

import extract from '../solution';

test('extract', () => {
  const obj = {
    name: 'John',
    age: 30,
    address: {
      street: 'Main Street',
      number: 123,
    },
  };

  expect(extract(obj, ['name', 'address'])).toEqual({
    name: 'John',
    address: obj.address,
  });

  expect(extract(obj, ['name', 'lastName'])).toEqual({
    name: 'John',
  });
});
