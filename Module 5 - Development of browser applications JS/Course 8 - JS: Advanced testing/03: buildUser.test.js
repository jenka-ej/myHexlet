// Протестируйте функцию, которая генерирует случайного пользователя. Пользователь, в данном случае, это объект с тремя полями: email, firstName, lastName.

// Для генерации данных используется библиотека fakerator

// console.log(buildUser());
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Elizabeth',
//   lastName: 'Zulauf',
// }
 
// Если какой-то из параметров нужно задать точно, то его можно передать в функцию

// console.log(buildUser({ firstName: 'Petya' }));
// {
//   email: 'Zion.Reichel12@yahoo.com',
//   firstName: 'Petya',
//   lastName: 'Zulauf',
// }

// Вам нужно протестировать три ситуации:
// 1) Что вызов buildUser() возвращает объект нужной структуры.
// 2) Что каждый вызов buildUser() возвращает объект с другими данными.
// 3) Что работает установка свойств через параметры.

/* functions.js */

import Fakerator from 'fakerator';

const fakerator = Fakerator();

const getDefaultData = () => ({
  email: fakerator.internet.email(),
  firstName: fakerator.names.firstName(),
  lastName: fakerator.names.lastName(),
});

const buildUser = (data) => {
  const defaultData = getDefaultData();
  return { ...defaultData, ...data };
};

const buildUser2 = () => getDefaultData();

const buildUser3 = (data) => {
  fakerator.seed(1);
  const defaultData = getDefaultData();
  return { ...defaultData, ...data };
};

const buildUser4 = (data) => {
  const defaultData = {
    firstName: fakerator.names.firstName(),
  };
  return { ...defaultData, ...data };
};

const functions = {
  right1: buildUser,
  wrong1: buildUser2,
  wrong2: buildUser3,
  wrong3: buildUser4,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import getFunction from '../functions.js';

const buildUser = getFunction();

test('Correct structure', () => {
  expect(Object.keys(buildUser())).toEqual(['email', 'firstName', 'lastName']);
});

test('Different data', () => {
  expect(buildUser().email).not.toBe(buildUser().email);
});

test('Incoming parameters', () => {
  expect(buildUser({ firstName: 'Evgeniy' })).toEqual(expect.objectContaining({
    email: expect.any(String),
    firstName: 'Evgeniy',
    lastName: expect.any(String),
  }));
});
