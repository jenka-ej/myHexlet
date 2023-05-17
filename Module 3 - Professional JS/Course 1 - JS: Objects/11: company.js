// Реализуйте и экспортируйте по умолчанию функцию, которая создает объект компании и возвращает его. 
// Для создания компании обязательно только одно свойство – имя компании. Остальные свойства добавляются только если они есть. Параметры:
// 1) Имя (обязательно)
// 2) Объект с дополнительными свойствами (если они есть)
// Также, кроме имени, у компаний есть два свойства со значениями по умолчанию. Если значение этих свойств не передано при создании, 
// то они принимают следующие значения:
// 1) state – moderating
// 2) createdAt – текущая дата (в формате Unix-времени. Это число - количество миллисекунд, прошедших с полуночи 1 января 1970 года)

const make = (company, data = {}) => {
  const result = {
    name: company,
    state: 'moderating',
    createdAt: Date.now(),
    ...data,
  };
  return result;
};
export default make;

/* __tests__ */

import make from '../company.js';

it('make 1', () => {
  const company = make('Hexlet');
  const now = Date.now();
  const expected = {
    name: 'Hexlet',
    state: 'moderating',
    createdAt: expect.any(Number),
  };
  expect(company).toMatchObject(expected);
  expect(company.createdAt).toBeLessThanOrEqual(now);
});

it('make 2', () => {
  const company = make('Hexlet', { website: 'hexlet.io', state: 'published' });
  const now = Date.now();
  const expected = {
    name: 'Hexlet',
    state: 'published',
    createdAt: expect.any(Number),
    website: 'hexlet.io',
  };
  expect(company).toMatchObject(expected);
  expect(company).toMatchObject(expected);
  expect(company.createdAt).toBeLessThanOrEqual(now);
});
