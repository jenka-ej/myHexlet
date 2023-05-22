# В истории есть команда, в которой встречается слово MAIL:
# 1) Воспользуйтесь реверсивным поиском, найдите и выполните эту команду
# 2) Результат ее работы скопируйте в файл solution

/var/mail/tirion

# __tests__

import fs from 'fs';

test('check solution', () => {
  const data = fs.readFileSync('solution')
    .toString()
    .trim();
  const expected = '/var/mail/tirion';
  expect(data).toEqual(expected);
});
