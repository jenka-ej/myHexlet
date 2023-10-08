// Перед прохождением данного испытания рекомендуется пройти испытание "Трансформер".

// Реализуйте и экспортируйте по умолчанию функцию, которая объединяет отдельные ветки в одно дерево. Каждая из веток в свою очередь является также деревом.
// Функция может принимать на вход неограниченное количество веток и соединяет их.
// Корневым узлом объединённого дерева является корневой узел первой переданной ветки.

// Примеры:
// const branch1 = ['A', [ //   A
//   ['B', [               //   |
//     ['C'],              //   B
//     ['D'],              //  / \
//   ]],                   // C   D
// ]];
 
// const branch2 = ['B', [ //   B
//   ['D', [               //   |
//     ['E'],              //   D
//     ['F'],              //  / \
//   ]],                   // E   F
// ]];
 
// const branch3 = ['I', [ //   I
//   ['A', [               //   |
//     ['B', [             //   A
//       ['C'],            //   |
//       ['H'],            //   B
//     ]],                 //  / \
//   ]],                   // C   H
// ]];
 
// combine(branch1, branch2, branch3);
 
// ['A', [      //     A
//   ['B', [    //    / \
//     ['C'],   //   B   I
//     ['D', [  //  /|\
//       ['E'], // C D H
//       ['F'], //  / \
//     ]],      // E   F
//     ['H'],
//   ]],
//   ['I'],
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

const compare = (mainBranch, secondBranch) => {
  // rebuild second branch by finding first general element with main branch

  const rebuildSecondTree = (mainTree, addedTree) => {
    let result;
    const rebuild = (firstTree, secondTree) => {
      const [newParentNode, children] = firstTree;
      const flattenSecondTree = secondTree.flat(Infinity);
      if (flattenSecondTree.includes(newParentNode)) {
        result = transform(secondTree, newParentNode);
        return;
      }
      if (!children) {
        return;
      }
      children.forEach((node) => rebuild(node, secondTree));
    };
    rebuild(mainTree, addedTree);
    return result;
  };
  const rebuildSecondBranch = rebuildSecondTree(mainBranch, secondBranch);

  // then write function, that gives direct link on element
  // this is not immutable, so later we change input massive

  const find = (mainTree, mainPoint) => {
    let result;
    const findChildrenNode = (tree, point) => {
      const [newParentNode, children] = tree;
      if (newParentNode === point) {
        result = tree;
        return;
      }
      if (!children) {
        return;
      }
      children.forEach((node) => findChildrenNode(node, point));
    };
    findChildrenNode(mainTree, mainPoint);
    return result;
  };

  // function for sort children by alphabet

  const compareSort = (a, b) => {
    if (a[0] > b[0]) {
      return 1;
    }
    if (a[0] < b[0]) {
      return -1;
    }
    return 0;
  };

  // next write function that iterates through rebuild second branch
  // if it has children differences, it pushes main tree

  const findDifferences = (tree) => {
    const [newParentNode, children] = tree;
    const nodeInMainTree = find(mainBranch, newParentNode);
    if (!children) {
      return;
    }
    children.forEach((child) => {
      const findNodeChildren = nodeInMainTree[1];
      const [childParent, childChildren] = child;
      const childrenInMainTree = find(mainBranch, childParent);
      if (!childrenInMainTree) {
        if (!findNodeChildren) {
          nodeInMainTree.push([child]);
          return;
        }
        findNodeChildren.push(child);
        findNodeChildren.sort(compareSort);
        return;
      }
      if (!childChildren) {
        return;
      }
      findDifferences(child);
    });
  };
  findDifferences(rebuildSecondBranch);

  // return main tree, because it was changed directly

  return mainBranch;
};

const cloneDeep = (tree) => {
  const [newParentNode, children] = tree;
  if (!children) {
    return [newParentNode];
  }
  return [newParentNode, children.map((child) => cloneDeep(child))];
};

const puzzle = (mainTree, ...params) => {
  // clone deep main tree for immutability

  const mainBranch = cloneDeep(mainTree);
  params.forEach((secondaryTree) => {
    compare(mainBranch, secondaryTree);
  });
  return mainBranch;
};

export default puzzle;

/* __tests__ */

import { sortTree } from '@hexlet/graphs';
import combine from '../puzzle.js';

describe('combine', () => {
  const branch1 = ['A', [
    ['B', [
      ['C'],
      ['D'],
    ]],
  ]];

  const branch2 = ['B', [
    ['D', [
      ['E'],
      ['F'],
    ]],
  ]];

  const branch3 = ['I', [
    ['A', [
      ['B', [
        ['C'],
        ['H'],
      ]],
    ]],
  ]];

  it('#test1', () => {
    const expected = ['A', [
      ['B', [
        ['C'],
        ['D', [
          ['E'],
          ['F'],
        ]],
        ['H'],
      ]],
      ['I'],
    ]];

    const actual = combine(branch1, branch2, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test2', () => {
    const expected = ['B', [
      ['A', [
        ['I'],
      ]],
      ['C'],
      ['D', [
        ['E'],
        ['F'],
      ]],
      ['H'],
    ]];

    const actual = combine(branch2, branch1, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test3', () => {
    const expected = ['I', [
      ['A', [
        ['B', [
          ['C'],
          ['D', [
            ['E'],
            ['F'],
          ]],
          ['H'],
        ]],
      ]],
    ]];

    const actual = combine(branch3, branch2, branch1);
    expect(sortTree(actual)).toEqual(expected);
  });

  it('#test4', () => {
    const expected = ['B', [
      ['A', [
        ['I'],
      ]],
      ['C'],
      ['D', [
        ['E'],
        ['F'],
      ]],
      ['H'],
    ]];

    const actual = combine(branch2, branch3);
    expect(sortTree(actual)).toEqual(expected);
  });
});
