import _ from 'lodash';
import {
  isFile, getName, getMeta, getChildren,
} from '@hexlet/immutable-fs-trees';

const filesWeight = (tree) => {
  if (isFile(tree)) {
    return getMeta(tree).size;
  }

  const children = getChildren(tree);
  const newChildren = children.map(filesWeight);
  return _.sum(newChildren);
};

const du = (tree) => {
  const children = getChildren(tree);
  const result = children.map((child) => [getName(child), filesWeight(child)]);

  return result.sort(([, size1], [, size2]) => size2 - size1);
};
export default du;

/* __tests__ */

import { mkdir, mkfile, getChildren } from '@hexlet/immutable-fs-trees';
import du from '../du.js';

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

test('du', () => {
  expect(du(tree)).toEqual([
    ['etc', 10280],
    ['hosts', 3500],
    ['resolve', 1000],
  ]);

  expect(du(getChildren(tree)[0])).toEqual([
    ['consul', 9480],
    ['nginx', 800],
    ['apache', 0],
  ]);
});
