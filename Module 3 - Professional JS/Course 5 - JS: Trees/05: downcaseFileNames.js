// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход директорию (объект-дерево), 
// приводит имена всех файлов в этой и во всех вложенных директориях к нижнему регистру. 
// Результат в виде обработанной директории возвращается наружу.

import {
  mkdir, mkfile, isFile, getName, getMeta, getChildren,
} from '@hexlet/immutable-fs-trees';
import _ from 'lodash';

const downcaseFileNames = (tree) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    return mkfile(name.toLowerCase(), newMeta);
  }

  const children = getChildren(tree);
  const newChildren = children.map((child) => downcaseFileNames(child));

  const newTree = mkdir(name, newChildren, newMeta);
  return newTree;
};
export default downcaseFileNames;

/* __tests__ */

import _ from 'lodash';
import { mkdir, mkfile } from '@hexlet/immutable-fs-trees';
import downcaseFileNames from '../downcaseFileNames.js';

describe('should', () => {
  test('be immutable', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
          mkfile('config.json'),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const original = _.cloneDeep(tree);

    downcaseFileNames(tree);

    expect(tree).toEqual(original);
  });

  test('downcase file names', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx'),
        mkdir('CONSUL', [
          mkfile('config.JSON'),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const actual = downcaseFileNames(tree);

    const expected = {
      children: [
        {
          children: [
            {
              name: 'NgiNx',
            },
            {
              children: [{ name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      name: '/',
    };

    expect(actual).toMatchObject(expected);
  });

  test('return full copy', () => {
    const tree = mkdir('/', [
      mkdir('eTc', [
        mkdir('NgiNx', [], { size: 4000 }),
        mkdir('CONSUL', [
          mkfile('config.JSON', { uid: 0 }),
        ]),
      ]),
      mkfile('hOsts'),
    ]);
    const actual = downcaseFileNames(tree);

    const expected = {
      children: [
        {
          children: [
            {
              meta: { size: 4000 },
              name: 'NgiNx',
            },
            {
              children: [{ meta: { uid: 0 }, name: 'config.json' }],
              name: 'CONSUL',
            },
          ],
          name: 'eTc',
        },
        { name: 'hosts' },
      ],
      meta: {},
      name: '/',
    };

    expect(actual).toMatchObject(expected);
  });
});
