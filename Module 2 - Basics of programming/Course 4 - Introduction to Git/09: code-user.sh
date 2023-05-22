# Вы сделали коммит, но забыли добавить в него пару файлов. Измените последний коммит так, чтобы он содержал все три файла одновременно.

cd code-user/
git add index.html
git add todo.md
git commit --amend

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const oid = await git.resolveRef({ fs, gitdir, ref: 'HEAD' });
  const hexletTxtFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'hexlet.txt',
  });
  const content1 = Buffer.from(hexletTxtFile.blob).toString('utf8');
  expect(content1.trim()).toContain('Hello Hexlet!');

  const indexHtmlFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'index.html',
  });
  const content2 = Buffer.from(indexHtmlFile.blob).toString('utf8');
  expect(content2.trim()).toContain('<h1>Git — это круто!</h1>');

  const todoMdFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'todo.md',
  });
  const content3 = Buffer.from(todoMdFile.blob).toString('utf8');
  expect(content3.trim())
    .toContain('* Пройти упражнение\n* Ощутить чувство выполненного долга');

  const headCommit = await git.readCommit({ fs, gitdir, oid });
  const head2Oid = headCommit.commit.parent;
  expect(head2Oid).toEqual([]);
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';

  const filenames = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['hexlet.txt'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
