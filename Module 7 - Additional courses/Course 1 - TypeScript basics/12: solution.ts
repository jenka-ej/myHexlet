// Реализуйте namespace Company, в котором экспортируется функция isEmployeeEmail(). Функция принимает почту и домен.
// Если емейл пользователя находится в указанном домене, то функция возвращает true:

// Company.isEmployeeEmail('tirion@hexlet.io', 'hexlet.io');
// true
 
// Company.isEmployeeEmail('user@example.com', 'hexlet.io');
// false

namespace Company {
  export function isEmployeeEmail(email: string, companyDomain: string): boolean {
    const domain = email.split('@').pop();
    return domain === companyDomain;
  }
}

type User = {
  email: string
};

function authorize(user: User | null): boolean {
  const companyDomain = 'hexlet.io';

  const email = user?.email ?? '';

  return Company.isEmployeeEmail(email, companyDomain);
}

export default authorize;

/* __tests__ */

import authorize from '../solution';

test('function', () => {
  expect(authorize({ email: 'test@hexlet.io' })).toBe(true);
  expect(authorize({ email: 'hexlet.io@example.com' })).toBe(false);
  expect(authorize({ email: 'test@example.com' })).toBe(false);
  expect(authorize(null)).toBe(false);
});
