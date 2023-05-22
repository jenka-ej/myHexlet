# 1) Выполните клонирование репозитория
# 2) Перейдите в директорию code-user, в которой находится склонированный репозиторий. В репозитории уже есть два файла. Измените их так:
# 2.1) В hexlet.txt добавьте второй строчкой текст I like to change files
# 2.2) В index.html замените текст на <h1>С помощью Git можно писать книги</h1>
# 3) Выполните один коммит, содержащий сразу эти два изменения. Во время коммита Git попросит ввести электронную почту и имя пользователя.
# Сделайте это, используя любые вымышленные данные
# 4) Добавьте изменения в основной репозиторий с помощью git push

git clone repos/git-user code-user
cd code-user/
echo 'I like to change files' >> hexlet.txt
echo '<h1>С помощью Git можно писать книги</h1>' > index.html
git add hexlet.txt
git add index.html
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git commit -m 'fix hexlet.txt and index.html'
git push

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
  const lines = content1.trim().split('\n');
  const [line1, line2] = lines;
  expect(line1).toEqual('Hello Hexlet!');
  expect(line2).toEqual('I like to change files');

  const indexHtmlFile = await git.readBlob({
    fs, gitdir, oid, filepath: 'index.html',
  });
  const content2 = Buffer.from(indexHtmlFile.blob).toString('utf8');
  expect(content2.trim()).toContain('можно писать книги');
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
