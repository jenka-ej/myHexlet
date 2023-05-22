# 1) Прочитайте в командной строке содержимое файла source и перенаправьте его в файл /tmp/result, которого не существует
# 2) Запишите получившуюся команду в файл solution

cat source > /tmp/result

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

test('check solution', () => {
  const path = '/tmp/result';

  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }

  const expected = fs.readFileSync('source').toString().trim();
  const command = fs.readFileSync('solution').toString().trim();
  execSync(command, { shell: '/bin/bash' }).toString().trim();
  const actual = fs.readFileSync(path).toString().trim();
  expect(actual).toEqual(expected);
});
