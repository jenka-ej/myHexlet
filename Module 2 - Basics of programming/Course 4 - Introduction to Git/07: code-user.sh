# Отмените все изменения, сделанные в рабочей директории и индексе.

cd code-user/ # Переходим в директорию code-user
git status
git restore hexlet.txt
git restore --staged index.md index.html
git restore index.html
git clean -fd

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (dir) => {
  const filenames = fs.readdirSync(dir);
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expect.arrayContaining(expected));

  const gitdir = '/usr/src/app/repos/git-user';

  const info2 = await git.status({
    fs, dir, gitdir, filepath: 'hexlet.txt',
  });
  expect(info2).toBe('unmodified');
};

// eslint-disable-next-line
test('test-teacher-git', async () => {
  const dir = '/usr/src/app/code-teacher';
  await runCheck(dir);
});

test('test-user-git-start', async () => {
  const dir = '/usr/src/app/code-user';
  const gitdir = '/usr/src/app/repos/git-user';

  if (!fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  const info1 = await git.status({
    fs, dir, gitdir, filepath: 'index.html',
  });
  expect(info1).toBe('deleted');
  const info2 = await git.status({
    fs, dir, gitdir, filepath: 'hexlet.txt',
  });
  expect(info2).toBe('*modified');

  expect(fs.existsSync(`${dir}/dir`)).toBe(true);
  expect(fs.existsSync(`${dir}/index.md`)).toBe(true);
});

// eslint-disable-next-line
test('test-user-git-finish', async () => {
  const dir = '/usr/src/app/code-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(dir);
});
