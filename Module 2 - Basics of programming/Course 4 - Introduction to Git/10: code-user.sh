# В файл hexlet.txt было добавлено несколько строк.
# 1) Используя интерактивный режим git add, разбейте изменения на две части и затем добавьте в индекс одну из них.
# Не выходя из интерактивного режима, выведите на экран состояние изменений, подготовленных к коммиту. Используйте для этого команду status
# 2) Сделайте коммит, в комментарии которого напишите значение из столбца staged

cd code-user/
git add -i
patch
1
# Подтверждаем выбор нажатием Enter
s
y
n
status
quit
git commit -m '+2/-0'

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const oid = await git.resolveRef({ fs, gitdir, ref: 'HEAD' });
  const commitObject = await git.readCommit({ fs, gitdir, oid });
  expect(commitObject.commit.message).toContain('+2/-0');
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';

  const filenames = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['hexlet.txt'];
  expect(filenames).toEqual(expected);
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
