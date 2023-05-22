# Для решения этого задания зайдите в терминал и наберите команду vim solution. Она откроет редактор Vim, а внутри файл solution.
# Добавьте в файл фразу Hello, World!, после чего сохраните внесенные изменения.

Hello, World!

# __tests__

const fs = require('fs');

test('check solution', () => {
  const data = fs.readFileSync(`${__dirname}/../solution`).toString();
  const expected = 'Hello, World!';
  expect(data).toContain(expected);
});
