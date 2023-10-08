// Перед прохождением данного испытания рекомендуется пройти и проанализировать решение учителя в испытании "Построение маршрута".

// Реализуйте и экспортируйте по умолчанию функцию, которая строит дерево относительно заданного корневого узла.
// Функция принимает 2 аргумента:
// 1) Исходное дерево
// 2) Узел, от которого будет построено новое дерево

// Функция должна возвращать новое дерево с сохранёнными связями между узлами, в котором переданный узел является корневым.

// Примеры:
// const tree = ['A', [ //     A
//   ['B', [            //    / \
//     ['D'],           //   B   C
//   ]],                //  /   / \
//   ['C', [            // D   E   F
//     ['E'],
//     ['F'],
//   ]],
// ]];
 
// transform(tree, 'B');
 
// ['B', [           //   B
//   ['D'],          //  / \
//   ['A', [         // D   A
//     ['C', [       //      \
//       ['E'],      //       C
//       ['F'],      //      / \
//     ]],           //     E   F
//   ]],
// ]];

// Подсказки:
// 1) Другие примеры можно посмотреть в файле с тестами
// 2) Используйте функции из библиотеки lodash
// 3) Работа с иерархическими структурами данных

// import _ from 'lodash';

const transform = (mainTree, mainPoint) => {
  // find absolute path (flattened) to main point

  const buildWay = (tree, point, path = []) => {
    const [newParentNode, children] = tree;
    if (newParentNode === point) {
      return [...path, newParentNode];
    }
    if (!children) {
      return null;
    }
    return children.map((node) => buildWay(node, point, [...path, newParentNode]));
  };

  const flattenWay = (array) => array.flat(Infinity).filter((el) => el !== null);

  const mainAbsPath = flattenWay(buildWay(mainTree, mainPoint));

  // find children on every element of absolute path with filter on next element

  const childLeafs = (absPath, anotherTree) => {
    const result = [];
    const findLeafs = (point, tree, nextPoint = '') => {
      const [newParentNode, children] = tree;
      if (!children) {
        return null;
      }
      if (newParentNode === point) {
        const temp = children.filter((node) => !node.includes(nextPoint));
        result.push(temp);
        return null;
      }
      return children.forEach((node) => findLeafs(point, node, nextPoint));
    };
    absPath.forEach((point, index) => {
      const nextPoint = absPath[index + 1];
      if (!nextPoint) {
        return findLeafs(point, anotherTree);
      }
      return findLeafs(point, anotherTree, nextPoint);
    });
    return result;
  };

  const mainAbsPathChildren = childLeafs(mainAbsPath, mainTree);

  // construct new tree

  const construct = (absPath, leafes) => {
    // join parents with children

    const mainAbsPathWithChildren = absPath.map((parent, index) => {
      const child = leafes[index];
      if (!child) {
        return parent;
      }
      if (child.length === 0) {
        return [parent];
      }
      return [parent, child];
    });

    // build new tree by pushing current element to next

    return mainAbsPathWithChildren.reduce((acc, node) => {
      if (acc.length === 0) {
        return node;
      }
      if (Array.isArray(node)) {
        const [parent, child] = node;
        const newChild = child;
        if (!newChild) {
          node.push([acc]);
          return node;
        }
        newChild.push(acc);
        const compare = (a, b) => {
          if (a[0] > b[0]) {
            return 1;
          }
          if (a[0] < b[0]) {
            return -1;
          }
          return 0;
        };
        return [parent, newChild.sort(compare)];
      }
      return [node, acc];
    }, []);
  };

  return construct(mainAbsPath, mainAbsPathChildren);
};

export default transform;

/* __tests__ */

import { sortTree } from '@hexlet/graphs';
import transform from '../transformer.js';

describe('transform', () => {
  describe('simple tree', () => {
    const tree = ['A', [
      ['B', [
        ['D'],
      ]],
      ['C', [
        ['E'],
        ['F'],
      ]],
    ]];

    it('#simple test1', () => {
      const expected = ['B', [
        ['A', [
          ['C', [
            ['E'],
            ['F'],
          ]],
        ]],
        ['D'],
      ]];

      const actual = transform(tree, 'B');
      expect(sortTree(actual)).toEqual(expected);
    });
  });

  describe('hard tree', () => {
    const tree = ['A', [
      ['B', [
        ['D', [
          ['H'],
        ]],
        ['E'],
      ]],
      ['C', [
        ['F', [
          ['I', [
            ['M'],
          ]],
          ['J', [
            ['N'],
            ['O'],
          ]],
        ]],
        ['G', [
          ['K'],
          ['L'],
        ]],
      ]],
    ]];

    it('#hard test 1', () => {
      const expected = ['F', [
        ['C', [
          ['A', [
            ['B', [
              ['D', [
                ['H'],
              ]],
              ['E'],
            ]],
          ]],
          ['G', [
            ['K'],
            ['L'],
          ]],
        ]],
        ['I', [
          ['M'],
        ]],
        ['J', [
          ['N'],
          ['O'],
        ]],
      ]];

      const actual = transform(tree, 'F');
      expect(sortTree(actual)).toEqual(expected);
    });

    it('#hard test 2', () => {
      const expected = ['I', [
        ['F', [
          ['C', [
            ['A', [
              ['B', [
                ['D', [
                  ['H'],
                ]],
                ['E'],
              ]],
            ]],
            ['G', [
              ['K'],
              ['L'],
            ]],
          ]],
          ['J', [
            ['N'],
            ['O'],
          ]],
        ]],
        ['M'],
      ]];

      const actual = transform(tree, 'I');
      expect(sortTree(actual)).toEqual(expected);
    });
  });
});
