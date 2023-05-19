// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход файловое дерево и подстроку, а возвращает список файлов, 
// имена которых содержат эту подстроку. Функция должна вернуть полные пути до файлов.

import path from 'path';
import { isFile, getName, getChildren } from '@hexlet/immutable-fs-trees';

const findFilesByName = (tree, substring) => {
  const accum = (node, ancestry) => {
    const name = getName(node);
    const children = getChildren(node);
    const newancestry = path.join(ancestry, name);

    if (isFile(node) && name.includes(substring)) {
      return newancestry;
    }
    if (isFile(node)) {
      return [];
    }

    return children.flatMap((child) => accum(child, newancestry));
  };

  return accum(tree, '/');
};
export default findFilesByName;

/* __tests__ */

import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import findFilesByName from '../findFilesByName.js';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

test('findFilesByName', () => {
  expect(findFilesByName(tree, 'co')).toEqual([
    '/etc/nginx/nginx.conf',
    '/etc/consul/config.json',
  ]);
});

test('findFilesByName 2', () => {
  expect(findFilesByName(tree, 'toohard')).toEqual([]);
});

test('findFilesByName 3', () => {
  expect(findFilesByName(tree, 'data')).toEqual([
    '/etc/consul/data',
  ]);
});
