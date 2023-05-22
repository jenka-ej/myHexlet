# Выполните следующие действия:
# 1) Удалите файл index.html
# 2) Переименуйте файл hexlet.txt в hexlet2.txt
# После каждого действия добавляйте изменения в отслеживание и изучайте вывод команды git diff --staged и git status. 
# Обратите внимание на различия вывода последней команды до добавления изменений в индекс и после.
# Закоммитьте каждое изменение отдельно.

cd code-user/ # Переходим в директорию code-user
rm -f index.html
git add index.html
git commit -m 'remove index.html'
mv hexlet.txt hexlet2.txt
git add hexlet.txt
git add hexlet2.txt
git commit -m 'rename hexlet.txt to hexlet2.txt'

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const filenames = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['hexlet2.txt'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';

  if (!fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  const filenames = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['index.html', 'hexlet.txt'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
