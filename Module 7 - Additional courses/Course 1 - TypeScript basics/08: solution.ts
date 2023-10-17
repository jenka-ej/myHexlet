// Реализуйте функцию isComplete(), которая принимает на вход курс и определяет, завершен ли он.
// Завершенным считается курс, в который добавлено четыре или более уроков:

// Определите тип исходя из структуры объекта:

// const course = {
//   name: 'Java',
//   lessons: ['variables', 'functions', 'conditions'],
// };

// isComplete(course); // false

function isComplete(course: { name: string, lessons: string[] }): boolean {
  return course.lessons.length >= 4;
}

export default isComplete;

/* __tests__ */

import * as ta from 'type-assertions';

import isComplete from '../solution';

test('function', () => {
  const course1 = {
    name: 'Java',
    lessons: ['variables', 'functions', 'conditions'],
  };
  expect(isComplete(course1)).toBe(false);

  const course2 = {
    name: 'Java',
    lessons: ['variables', 'functions', 'conditions', 'loops'],
  };
  expect(isComplete(course2)).toBe(true);

  ta.assert<ta.Equal<ReturnType<typeof isComplete>, boolean>>();
  ta.assert<ta.Equal<Parameters<typeof isComplete>[0], { name: string, lessons: string[] }>>();
});
