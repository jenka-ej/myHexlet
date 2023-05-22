# 1) Измените права доступа к файлу myfile. Для владельца файла установите разрешение только на чтение и исполнение файла. 
# Для пользователей, входящих в группу владельца, и для остальных пользователей установите разрешение только на исполнение
# 2) Запишите в файл solution команду, которая это делает

chmod 511 myfile

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

const path = 'myfile';

beforeAll(() => {
  if (fs.existsSync(path)) {
    fs.chmod(path, 0o644, () => {});
  }
});

test('check solution', () => {
  const command = fs.readFileSync('solution').toString().trim();
  execSync(command);

  const stat = fs.statSync(path);

  const permissions = (stat.mode & 0o777).toString(8); // eslint-disable-line no-bitwise
  const expected = '511';
  expect(permissions).toBe(expected);
});
