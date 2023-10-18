// Реализуйте функцию fail(), которая выбрасывает любое исключение. Пропишете ее возвращаемый тип явно.

function fail(message: string): never {
  throw new Error(message);
}

export default fail;

/* __tests__ */

import fail from '../solution';

test('function', () => {
  expect(fail).toThrow();
});
