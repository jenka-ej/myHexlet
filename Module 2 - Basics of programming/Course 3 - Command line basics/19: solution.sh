# В текущей директории находится программа, которая называется program. В упражнении вам нужно будет запустить эту программу на исполнение. 
# Но прежде, чем запускать программу, нужно сделать файл program исполняемым.
# 1) Сделайте файл program исполняемым
# 2) Запустите программу на исполнение и результат её выполнения скопируйте в файл solution

.
├── Makefile
├── package.json
├── program
├── solution
└── __tests__
    └── test.js

1 directory, 5 files

# __tests__

import fs from 'fs';
import { execSync } from 'child_process';

test('check solution', () => {
  const result = fs.readFileSync('solution')
    .toString()
    .trim();
  const expected = execSync('tree')
    .toString()
    .trim();
  expect(result).toBe(expected);
});
