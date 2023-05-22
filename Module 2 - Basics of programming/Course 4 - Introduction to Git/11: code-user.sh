# Вы сделали несколько коммитов в репозиторий и в каком-то из них сохранили файл todo.md со списком задач, а потом удалили этот файл. 
# Загвоздка в том, что в комментарии к коммиту добавление этого файла отражено не было.
# Найдите в истории коммит, в котором был добавлен файл todo.md, и переключитесь на него с помощью git checkout.

cd code-user/
git log -p --oneline -- todo.md
git checkout 7c2fcf8

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (dir) => {
  const filenames = fs.readdirSync(dir);
  const expected = ['hexlet.txt', 'index.html', 'todo.md'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
};

test('test-teacher-git', async () => {
  const dir = '/usr/src/app/code-teacher';
  await runCheck(dir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';

  const filenames = await git.listFiles({
    fs, gitdir, ref: '7c97a589864667238b6f78e488e120ad301f12b1',
  });
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expected);
});

test('test-user-git-finish', async () => {
  const dir = '/usr/src/app/code-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(dir);
});
