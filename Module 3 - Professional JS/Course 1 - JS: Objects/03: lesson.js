// Реализуйте и экспортируйте по умолчанию функцию, которая "нормализует" данные переданного урока. То есть приводит их к определенному виду. 
// Нормализация происходит путём изменения исходного объекта.
// На вход этой функции подается объект, описывающий собой урок курса. В уроке содержатся два поля: имя и описание.

import _ from 'lodash';

const lesson = (obj) => {
  obj.name = _.capitalize(obj.name);
  obj.description = obj.description.toLowerCase();
  return obj;
};
export default lesson;

/* __tests__ */

import normalize from '../lesson.js';

test('normalize 1', () => {
  const lesson = { name: 'intro', description: 'about Something' };
  const expected = {
    name: 'Intro',
    description: 'about something',
  };
  normalize(lesson);
  expect(lesson).toEqual(expected);
});

test('normalize 2', () => {
  const lesson = { name: '', description: 'Some Description' };
  const expected = {
    name: '',
    description: 'some description',
  };
  normalize(lesson);
  expect(lesson).toEqual(expected);
});
