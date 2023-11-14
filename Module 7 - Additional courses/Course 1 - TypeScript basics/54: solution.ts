// Реализуйте функцию createAccessChecker(), которая принимает на вход объект с разрешениями для ролей и возвращает функцию,
// проверяющую, есть ли у пользователя доступ к ресурсу.

// type UserRole = 'admin' | 'user' | 'guest';
// type UserResource = 'document' | 'user' | 'adminPanel';
 
// const userRolePermissions: Record<UserRole, Array<UserResource>> = {
//   admin: ['document', 'user', 'adminPanel'],
//   user: ['document', 'user'],
//   guest: ['document'],
// };
 
// const checkUserAccess = createAccessChecker<UserRole, UserResource>(userRolePermissions);
 
// const isAdminAllowed = checkUserAccess('admin', 'adminPanel');
// console.log(isAdminAllowed); // => true
 
// const isUserAllowed = checkUserAccess('user', 'adminPanel');
// console.log(isUserAllowed); // => false

type DynamicKey = string | number | symbol;

function createAccessChecker<K extends DynamicKey, V>(obj: Record<K, Array<V>>) {
  return function isAllowed(key: K, resource: V): boolean {
    return obj[key].includes(resource);
  };
}

export default createAccessChecker;

/* __tests__ */

import * as ta from 'type-assertions';

import createAccessChecker from '../solution';

test('function', () => {
  type UserRole = 'admin' | 'user' | 'guest';
  type UserResource = 'document' | 'user' | 'adminPanel';

  const userRolePermissions: Record<UserRole, Array<UserResource>> = {
    admin: ['document', 'user', 'adminPanel'],
    user: ['document', 'user'],
    guest: ['document'],
  };

  const checkUserAccess = createAccessChecker<UserRole, UserResource>(userRolePermissions);

  const isAdminAllowed = checkUserAccess('admin', 'adminPanel');
  expect(isAdminAllowed).toBe(true);

  const isUserAllowed = checkUserAccess('user', 'adminPanel');
  expect(isUserAllowed).toBe(false);

  ta.assert<ta.Equal<Parameters<typeof checkUserAccess>, [UserRole, UserResource]>>();
});
