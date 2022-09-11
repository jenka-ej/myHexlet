import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta,
} from '@hexlet/immutable-fs-trees';

export const compressImages = (tree) => {
  const children = getChildren(tree);
  const newchildren = children.map((child) => {
    const name = getName(child);
    const newmeta = _.cloneDeep(getMeta(child));
    if (isFile(child) && name.includes('.jpg')) {
      newmeta.size /= 2;
      return mkfile(name, newmeta);
    }
    if (isFile(child)) {
      return mkfile(name, newmeta);
    }
    return mkdir(name, getChildren(child), newmeta);
  });

  const newmeta = _.cloneDeep(getMeta(tree));
  const newTree = mkdir(getName(tree), newchildren, newmeta);
  return newTree;
};

/* __tests__ */

import {
  getChildren, mkdir, mkfile, getMeta,
} from '@hexlet/immutable-fs-trees';
import { compressImages } from '../tree.js';

test('compressImages 1', () => {
  const tree = mkdir('my documents', [
    mkdir('documents.jpg'),
    mkfile('avatar.jpg', { size: 100 }),
    mkfile('passport.jpg', { size: 200 }),
    mkfile('family.jpg', { size: 150 }),
    mkfile('addresses', { size: 125 }),
    mkdir('presentations'),
  ], { test: 'haha' });

  const newTree = compressImages(tree);

  const expectation = [
    {
      name: 'documents.jpg',
      type: 'directory',
    },
    {
      name: 'avatar.jpg',
      meta: { size: 50 },
      type: 'file',
    },
    {
      name: 'passport.jpg',
      meta: { size: 100 },
      type: 'file',
    },
    {
      name: 'family.jpg',
      meta: { size: 75 },
      type: 'file',
    },
    {
      name: 'addresses',
      meta: { size: 125 },
      type: 'file',
    },
    {
      name: 'presentations',
      type: 'directory',
    },
  ];

  expect(newTree).toMatchObject({
    meta: { test: 'haha' },
    children: expectation,
  });
});

test('compressImages 2', () => {
  const tree = mkdir('my documents', [
    mkdir('presentations'),
  ]);

  const newTree = compressImages(tree);

  expect(newTree).toMatchObject({
    meta: {},
    children: [
      { name: 'presentations' },
    ],
  });
});

test('compressImages 3 - deepClone', () => {
  const tree = mkdir('my documents', [
    mkfile('avatar.jpg', { size: 100, attributes: { hide: false, readOnly: true } }),
    mkdir('presentations'),
  ], { owner: 'hexlet' });

  const newTree = compressImages(tree);
  const newFile = getChildren(newTree)[0];
  const newFileMeta = getMeta(newFile);
  newFileMeta.attributes.hide = true;
  const oldFile = getChildren(tree)[0];
  const oldFileMeta = getMeta(oldFile);
  expect(oldFileMeta.attributes.hide).toEqual(false);

  const newTreeMeta = getMeta(newTree);
  newTreeMeta.owner = 'user';
  expect(getMeta(tree).owner).toEqual('hexlet');
});
