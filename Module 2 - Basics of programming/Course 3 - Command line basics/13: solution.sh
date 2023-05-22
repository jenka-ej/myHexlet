# Выполните следующие задачи:
# 1) В списке переменных окружения локальной среды Хекслета есть переменная, имя которой начинается на букву "M". 
# Глобально измените значение этой переменной на /var/tmp
# 2) Глобально добавьте новую переменную окружения NEW_VAR и установите для нее значение value
# 3) Запишите команду, которая выполнит эти операции, в файл solution в одну строку

export MAIL=/var/tmp NEW_VAR=value

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

test('check solution', () => {
  const command = fs.readFileSync('solution')
    .toString()
    .trim();
  const result = execSync(`${command}; printenv MAIL NEW_VAR`, { shell: '/bin/bash' })
    .toString()
    .trim()
    .split('\n');
  const expected = ['/var/tmp', 'value'];
  expect(result).toEqual(expected);
});
