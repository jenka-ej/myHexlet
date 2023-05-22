# Проигнорируйте и удалите из репозитория, если это необходимо, но не удаляйте из рабочей директории файлы notes.txt и todo.md. 
# В конце сделайте коммит со всеми изменениями.

cd code-user/ # Переходим в директорию code-user
echo 'notes.txt' > .gitignore
echo 'todo.md' >> .gitignore
git rm --cached notes.txt
git commit -m 'remove notes.txt from repo'
git add hexlet.txt
git commit -m 'update hexlet.txt'
git add .gitignore
git commit -m 'add .gitignore'

# .gitignore

notes.txt
todo.md

# __tests__

/* eslint-disable jest/expect-expect */
import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const files = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['.gitignore', 'hexlet.txt'];
  expect(files).toEqual(expect.arrayContaining(expected));

  expect(files).not.toContain('notes.txt');
  expect(files).not.toContain('todo.md');
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const dir = '/usr/src/app/code-user';
  const filenames = fs.readdirSync(dir);
  const expected = ['.gitignore', 'hexlet.txt', 'notes.txt', 'todo.md'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
