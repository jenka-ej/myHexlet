// Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает объекты по совпадению данных, а не по ссылкам.
// Эта функция принимает на вход две компании и возвращает true, если их структура одинаковая, и false в обратном случае. 
// Проверка должна проходить по свойствам name, state, website.

const is = (obj1, obj2) => {
  const name = (obj1.name === obj2.name);
  const state = (obj1.state === obj2.state);
  const website = (obj1.website === obj2.website);
  return (name && state && website);
};
export default is;

/* __tests__ */

import is from '../company.js';

it('is 1', () => {
  const company1 = {};
  const company2 = {};
  expect(is(company1, company2)).toBe(true);
});

it('is 2', () => {
  const company1 = { name: 'Hexlet' };
  const company2 = { name: 'Google' };
  expect(is(company1, company2)).toBe(false);
});

it('is 3', () => {
  const company1 = { name: 'Hexlet' };
  const company2 = { name: 'Hexlet' };
  expect(is(company1, company2)).toBe(true);
});

it('is 4', () => {
  const company1 = { name: 'Hexlet', state: 'published', website: 'https://hexlet.io' };
  const company2 = { name: 'Hexlet', state: 'published', website: 'https://code-basics.com' };
  expect(is(company1, company2)).toBe(false);
});

it('is 5', () => {
  const company1 = { name: 'Hexlet', state: 'published', website: 'https://hexlet.io' };
  const company2 = { name: 'Hexlet', website: 'https://hexlet.io', state: 'published' };
  expect(is(company1, company2)).toBe(true);
});
