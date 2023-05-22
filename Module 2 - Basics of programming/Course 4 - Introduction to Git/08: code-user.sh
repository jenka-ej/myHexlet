# Полностью удалите два последних коммита.

cd code-user/
git reset --hard HEAD~2

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

  const hexletTxtFile2 = await git.readBlob({
    fs, gitdir, oid, filepath: 'index.html',
  });
  const content2 = Buffer.from(hexletTxtFile2.blob).toString('utf8');
  expect(content2.trim()).toContain('<h1>Мама, я коммичу</h1>');
};

test('test-teacher-git', async () => {
  const gitdir = '/usr/src/app/repos/git-teacher';
  await runCheck(gitdir);
});

test('test-user-git-start', async () => {
  const gitdir = '/usr/src/app/repos/git-user';

  const filenames = await git.listFiles({ fs, gitdir, ref: 'HEAD' });
  const expected = ['hexlet.txt', 'index.html'];
  expect(filenames).toEqual(expect.arrayContaining(expected));
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
