// Реализуйте функцию lessonsCount(), которая принимает на вход курс и возвращает количество лекций внутри него:
// const course = { lessons: ['intro', 'lala'] };
// lessonsCount(course); // 2

// Используйте внутри деструктуризацию, чтобы извлечь уроки прямо в параметрах функции.

type Course = {
  lessons: string[];
};

function lessonsCount({ lessons }: Course): number {
  return lessons.length;
}

export default lessonsCount;

/* __tests__ */

import lessonsCount from '../solution';

test('function', () => {
  expect(lessonsCount({ lessons: [] })).toBe(0);
  const course = { lessons: ['intro'] };
  expect(lessonsCount(course)).toBe(1);
});
