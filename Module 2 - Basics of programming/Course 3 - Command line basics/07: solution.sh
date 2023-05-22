# 1) Выведите на экран первые шесть строк файла /home/tirion/.bashrc, прочитав их командой head
# 2) Запишите получившуюся команду в файл solution

head -n 6 /home/tirion/.bashrc

# __tests__

const fs = require('fs');
const { execSync } = require('child_process');

test('check solution', () => {
  const command = fs.readFileSync(`${__dirname}/../solution`)
    .toString().trim();
  const result = execSync(command).toString().trim();
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/output`)
    .toString()
    .trim();
  expect(result).toEqual(expected);
});
