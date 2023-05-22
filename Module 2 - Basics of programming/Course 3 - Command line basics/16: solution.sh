# 1) В директории config создайте файл myfile с текстом Hello, World!
# 2) Запишите команду в файл solution, которая это делает

echo 'Hello, World!' | sudo tee config/myfile

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

test('check solution', () => {
  const path = '/usr/src/app/config/myfile';

  if (fs.existsSync(path)) {
    execSync(`sudo rm ${path}`);
  }

  const command = fs.readFileSync('solution')
    .toString()
    .trim();
  execSync(command, { shell: '/bin/bash' });
  const result = fs.readFileSync('config/myfile')
    .toString()
    .trim();
  expect(result).toBe('Hello, World!');
});
