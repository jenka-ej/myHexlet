// Реализуйте функцию getParams(), которая принимает на вход строку запроса (query string) и возвращает параметры в виде объекта:

// getParams('per=10&page=5');
// { per: '10', page: '5' }

// getParams('name=hexlet&count=3&order=asc');
// { name: 'hexlet', count: '3', order: 'asc' }

// Эту задачу лучше всего решать через метод reduce().

function getParams(text: string): any {
  const entries = text.split('&');
  const initial: any = {};
  const result = entries.reduce((acc, entry) => {
    const [key, value] = entry.split('=');
    acc[key] = value;
    return acc;
  }, initial);
  return result;
}

/* __tests__ */

import getParams from '../solution';

test('function', () => {
  expect(getParams('per=10&page=5')).toEqual({ per: '10', page: '5' });
  expect(getParams('name=hexlet&count=3&order=asc')).toEqual({ name: 'hexlet', count: '3', order: 'asc' });
});
