# 1) Грепните файл /home/tirion/.bashrc по строчке then
# 2) Запишите правильную команду в файл solution

grep then /home/tirion/.bashrc

# __tests__

const fs = require('fs');
const { execSync } = require('child_process');

test('check solution', () => {
  const command = fs.readFileSync(`${__dirname}/../solution`)
    .toString()
    .trim();
  const result = execSync(command).toString().trim();
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/output`)
    .toString()
    .trim();
  expect(result).toEqual(expected);
});
