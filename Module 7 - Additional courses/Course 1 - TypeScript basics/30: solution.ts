// Реализуйте тип Admin, который является пересечением типов AdminPermission и User.
// Реализуйте функцию addAdmin(), которая принимает значение с типом User и возвращает значение с типом Admin.
// В качестве значения для свойства permission должно быть значение Permission.READ.

// const user: User = { login: 'login1' };
// const admin = addAdmin(user); // { login: 'login1', permission: Permission.READ }

enum Permission {
  READ,
  WRITE,
  DELETE,
}

type User = {
  login: string,
};

type AdminPermission = {
  permission: Permission,
};

type Admin = AdminPermission & User;

const addAdmin = (user: User): Admin => ({ ...user, permission: Permission.READ });

export { User, Admin, Permission };
export default addAdmin;

/* __tests__ */

import addAdmin, { User, Permission } from '../solution';

test('addAdmin', () => {
  const user: User = {
    login: 'login1',
  };

  const admin = addAdmin(user);
  expect(admin).toEqual({ ...user, permission: Permission.READ });
});
