# Наберите команду echo $PWD. Следующей строкой она выведет результат работы. Вручную скопируйте результат в файл solution.

/usr/src/app

# __tests__

const fs = require('fs');

test('check solution', () => {
  const data = fs.readFileSync(`${__dirname}/../solution`).toString();
  const expected = process.cwd();
  expect(data.trim()).toBe(expected);
});
