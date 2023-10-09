# В этом задании вам нужно написать запрос на получение данных о курсах в формате JSON.
# Используя curl выполните запрос к localhost на порт 8080 по пути /courses.
# В заголовке запроса сообщите серверу, что ожидаете ответа в формате JSON.
# Если запрос успешный, то в терминале упражнения вы увидите список курсов, который вернул сервер.
# Получившуюся команду запишите в файл solution.
# Для указания заголовка используйте флаг -H, а в Accept укажите тип ожидаемых данных.

curl -H "Accept: application/json" localhost:8080/courses

# __tests__

import fs from 'fs';
import url from 'url';
import path from 'path';
import { execSync } from 'child_process';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

test('get courses json', async () => {
  const command = fs.readFileSync('solution', 'utf-8')
    .toString()
    .trim();

  const actualCourses = execSync(command).toString().trim();

  const expectedCourses = readFixture('courses.json').toString().trim();
  expect(actualCourses).toEqual(expectedCourses);
});
