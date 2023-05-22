# 1) С помощью конвейера отсортируйте содержимое файла languages в алфавитном порядке и выведите на экран только первые две строки
# 2) Запишите получившуюся команду в файл solution

sort languages | head -n 2

# __tests__

const fs = require('fs');
const { execSync } = require('child_process');

test('check solution', () => {
  const command = fs.readFileSync(`${__dirname}/../solution`)
    .toString()
    .trim();
  const expected = 'clojure\nelixir';
  const result = execSync(command).toString().trim();
  expect(result).toEqual(expected);
});
