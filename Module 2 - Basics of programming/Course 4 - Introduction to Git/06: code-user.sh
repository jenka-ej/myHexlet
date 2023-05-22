# 1) Посмотрите изменения, сделанные в последнем коммите
# 2) Внесите обратные изменения в файл hexlet2.txt
# 3) Сделайте коммит
# Таким образом новым коммитом мы перезаписываем изменения, сделанные в последнем коммите.

cd code-user/ # Переходим в директорию code-user
git log -p
echo 'Hello Hexlet!' > hexlet2.txt
git add hexlet2.txt
git commit -m 'fix hexlet2.txt'

# __tests__

import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const runCheck = async (gitdir) => {
  const oid = await git.resolveRef({ fs, gitdir, ref: 'HEAD' });

  const hexlet2TxtFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'hexlet2.txt',
  });
  const content = Buffer.from(hexlet2TxtFile.blob).toString('utf8');
  expect(content.trim()).toContain('Hello Hexlet!');

  const headCommit = await git.readCommit({ fs, gitdir, oid });
  const head2Oid = headCommit.commit.parent.toString();
  const head2Hexlet2TxtFile = await git.readBlob({
    fs, gitdir, oid: head2Oid, filepath: 'hexlet2.txt',
  });
  const content2 = Buffer.from(head2Hexlet2TxtFile.blob).toString('utf8').trim();
  expect(content2).toEqual('Hexlet Hello!');
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

  const oid = await git.resolveRef({ fs, gitdir, ref: 'HEAD' });

  const hexletTxtFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'hexlet2.txt',
  });
  const content = Buffer.from(hexletTxtFile.blob).toString('utf8');
  expect(content.trim()).toContain('Hexlet Hello!');
});

test('test-user-git-finish', async () => {
  const gitdir = '/usr/src/app/repos/git-user';
  if (fs.existsSync(path.join(__dirname, '..', 'teacher-mode'))) {
    return;
  }

  await runCheck(gitdir);
});
