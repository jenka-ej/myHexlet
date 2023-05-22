# В репозитории создано две дополнительные ветки, помимо main.
# Переключитесь на ветку refactoring и удалите два последних коммита с помощью git reset --hard.
# Переключитесь на ветку working-on-html и в этой ветке сделайте коммит, отредактировав файл index.html следующим образом:
# 1) Замените содержимое тега h1 на «Ветки в Git достойны отдельного курса»
# 2) Замените содержимое тега p на «Ветки являются ссылками на определённый коммит.»
# Текст размещайте без кавычек.

cd code-user/
git switch refactoring
git reset --hard HEAD~2
git switch working-on-html
# Редактируем и сохраняем файл
vim index.html
git add index.html
git commit -m 'fix index.html'

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const oid = await git.resolveRef({ fs, gitdir, ref: 'refactoring' });
  const filenames = await git.listFiles({
    fs, gitdir, oid,
  });
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expected);

  const file = await git.readBlob({
    fs, gitdir, oid, filepath: 'index.html',
  });
  const content1 = Buffer.from(file.blob).toString('utf8');
  expect(content1.trim())
    .toContain('<h1>Мама, я учусь использовать git checkout!</h1>\n\n<p>С помощью этой команды можно вернуться в прошлое.</p>');

  const file2 = await git.readBlob({
    fs, gitdir, oid, filepath: 'hexlet.txt',
  });
  const content2 = Buffer.from(file2.blob).toString('utf8');
  expect(content2.trim())
    .toContain('Hello, Hexlet!\n\nGit — это круто!');

  const oid2 = await git.resolveRef({ fs, gitdir, ref: 'working-on-html' });
  const file3 = await git.readBlob({
    fs, gitdir, oid: oid2, filepath: 'index.html',
  });
  const content3 = Buffer.from(file3.blob).toString('utf8');
  expect(content3.trim())
    .toContain('<h1>Ветки в Git достойны отдельного курса</h1>');
  expect(content3.trim())
    .toContain('<p>Ветки являются ссылками на определённый коммит.</p>');
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  const oid = await git.resolveRef({ fs, gitdir, ref: 'main' });
  const filenames = await git.listFiles({
    fs, gitdir, oid,
  });
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expected);
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
