# 1) Выполните команду man cowsay и изучите полученную документацию к этой программе
# 2) Найдите в документации, какую опцию нужно использовать, чтобы передать имя cowfile и вывести на экран другого персонажа
# 3) Сделайте так, чтобы на экране появился пингвин Тукс
# 4) Сделайте так, чтобы пингвин сказал: "I love Hexlet!"
# 5) Запишите полученную команду в файл solution. Обратите внимание, что нужно записать именно команду, а не её вывод. 
# Тесты сами выполнят эту команду и проверят, что она работает верно

cowsay -f tux 'I love Hexlet!'

# __tests__

const fs = require('fs');
const { execSync } = require('child_process');

test('check solution', () => {
  const expected = fs.readFileSync(`${__dirname}/__fixtures__/output`).toString();
  const data = fs.readFileSync(`${__dirname}/../solution`).toString();
  const command = data.trim();
  const result = execSync(command).toString();
  expect(result).toEqual(expected);
});
