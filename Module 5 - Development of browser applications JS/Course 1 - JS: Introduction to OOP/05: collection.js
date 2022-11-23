// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход коллекцию объектов и колбек функцию. 
// Эта функция должна вызывать колбек для каждого объекта коллекции. 
// Главная особенность этой функции в том, что она передает объекты коллекции не в саму функцию, а устанавливает их как контекст.

export default (coll, fn) => coll.map((item) => fn.call(item));

/* __tests__ */

import each from '../collection.js';

test('each #1', () => {
  const objects = [
    { name: 'Karl' },
    { name: 'Mia' },
  ];
  each(objects, function callback() {
    this.name = this.name.split('').reverse().join('');
  });

  const expected = [
    { name: 'lraK' },
    { name: 'aiM' },
  ];
  expect(objects).toEqual(expected);
});

test('each #2', () => {
  const objects = [
    { name: 'Karl' },
    { name: 'Mia' },
  ];
  each(objects, function callback() {
    this.name = this.name.toUpperCase();
  });

  const expected = [
    { name: 'KARL' },
    { name: 'MIA' },
  ];
  expect(objects).toEqual(expected);
});
