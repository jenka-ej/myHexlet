# 1) У команды id есть опция, которая позволяет вывести на экран только id пользователя. Найдите эту опцию и выведите на экран id пользователя nobody
# 2) Запишите получившуюся команду в файл solution

id -u nobody

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

test('check solution', () => {
  const command = fs.readFileSync('solution')
    .toString()
    .trim();
  const result = execSync(command).toString().trim();
  const expected = '65534';
  expect(result).toBe(expected);
});
