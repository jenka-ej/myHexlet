# В домашней директории пользователя sansa находится единственный скрытый файл. Найдите его и запишите его имя в файл solution.

.Greeting

# __tests__

import fs from 'fs';

test('check solution', () => {
  const fileName = fs.readFileSync('solution').toString().trim();
  const content = fs.readFileSync(`/home/sansa/${fileName}`).toString().trim();
  const expected = 'Content of hidden file';

  expect(content).toBe(expected);
});
