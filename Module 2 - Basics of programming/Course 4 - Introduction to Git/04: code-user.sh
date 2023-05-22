# В рабочей директории два изменения: один файл удален, другой изменен. Отмените эти изменения.

cd code-user/
git restore hexlet.txt
git restore index.html

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (dir) => {
  const filenames = fs.readdirSync(dir);
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  const dir = '/usr/src/app/code-teacher';
  await runCheck(dir, gitdir);
});

test('test-user-git-start', async () => {
  const dir = '/usr/src/app/code-user';
  const gitdir = '/usr/src/app/repos/git-user';

  if (!fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  const info1 = await git.status({
    fs,
    dir,
    gitdir,
    filepath: 'index.html',
  });
  expect(info1).toBe('*deleted');
  const info2 = await git.status({
    fs,
    dir,
    gitdir,
    filepath: 'hexlet.txt',
  });
  expect(info2).toBe('*modified');
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  const dir = '/usr/src/app/code-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(dir, gitdir);
});
