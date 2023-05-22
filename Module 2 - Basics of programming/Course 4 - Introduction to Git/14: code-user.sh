# В рабочей директории уже есть изменения, сохраните их с помощью git stash.
# 1) Создайте файл todo.md с любым содержимым
# 2) Добавьте в файл hexlet.txt строку: «stash не трогает новые файлы, которые еще не добавлены в индекс.»
# 3) Сделайте коммит только с файлом hexlet.txt
# 4) Восстановите из стэша сохраненные ранее изменения
# 5) Сделайте еще один коммит, включающий все файлы

cd code-user/
git add . # Так как есть изменения не добавленные в индекс
git stash
echo 'Hexlet is awesome!' > todo.md
echo 'stash не трогает новые файлы, которые еще не добавлены в индекс.' >> hexlet.txt
git add hexlet.txt
git commit -m 'refactoring'
git stash pop
git add .
git commit -m 'changes from stash'

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const log = await git.log({ fs, gitdir });
  const [commit1, commit2] = log;

  const file1 = await git.readBlob({
    fs, gitdir, oid: commit1.oid, filepath: 'index.html',
  });
  const content1 = Buffer.from(file1.blob).toString('utf8');
  expect(content1.trim())
    .toContain('Чтобы восстановить спрятанные изменения используется команда git stash pop');

  const filenames1 = await git.listFiles({
    fs, gitdir, oid: commit1.oid,
  });

  const expected1 = ['hexlet.txt', 'index.html', 'quotes.txt', 'todo.md'];
  expect(filenames1).toEqual(expected1);

  const file2 = await git.readBlob({
    fs, gitdir, oid: commit2.oid, filepath: 'hexlet.txt',
  });
  const content2 = Buffer.from(file2.blob).toString('utf8');
  const [, line2] = content2.trim().split('\n').filter((line) => line !== '');

  expect(line2)
    .toEqual('stash не трогает новые файлы, которые еще не добавлены в индекс.');

  const file3 = await git.readBlob({
    fs, gitdir, oid: commit2.oid, filepath: 'index.html',
  });
  const content3 = Buffer.from(file3.blob).toString('utf8');
  expect(content3.trim())
    .toEqual(
      expect.not.stringContaining(
        'Чтобы восстановить спрятанные изменения используется команда git stash pop',
      ),
    );
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const dir = '/usr/src/app/code-user';

  const filenames = fs.readdirSync(dir);
  const expected = ['hexlet.txt', 'index.html', 'quotes.txt'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
