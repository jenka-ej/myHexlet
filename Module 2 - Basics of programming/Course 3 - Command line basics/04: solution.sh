# В директории /opt/follow создано множество поддиректорий. Только в одной поддиректории из них лежит файл. 
# В остальных директориях либо пусто, либо лежат другие каталоги. Вам необходимо найти этот файл и записать его имя в файл solution.

i-got-it

# __tests__

const fs = require('fs');

test('check solution', () => {
  const data = fs.readFileSync(`${__dirname}/../solution`).toString().trim();
  const expected = 'i-got-it';
  expect(data === expected).toBe(true);
});
