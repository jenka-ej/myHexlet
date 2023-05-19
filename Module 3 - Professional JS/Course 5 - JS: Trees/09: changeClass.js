// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход html-дерево и заменяет во всех узлах имя класса, имена классов передаются через параметры. 
// Функция не должна мутировать исходное дерево.

import _ from 'lodash';

const changeClass = (tree, oldclassName, newclassName) => {
  const newTree = _.cloneDeep(tree);

  if (_.has(newTree, 'className')) {
    const resultName = newTree.className === oldclassName ? newclassName : newTree.className;
    newTree.className = resultName;
  }

  const rename = newTree.children
    .map((child) => {
      const newchild = { ...child };
      if (newchild.type === 'tag-internal') {
        return changeClass(newchild, oldclassName, newclassName);
      }
      return newchild;
    });

  return { ...newTree, children: rename };
};
export default changeClass;

/* __tests */

import _ from 'lodash';
import treeData from '../__fixtures__/tree.js';
import changeClass from '../changeClass.js';

test('changeClass', () => {
  const {
    htmlTreeSource,
    htmlTree,
    classNameFrom,
    classNameTo,
  } = treeData;
  const sourceCloned = _.cloneDeep(htmlTreeSource);

  const result = changeClass(htmlTreeSource, classNameFrom, classNameTo);
  expect(result).toEqual(htmlTree);
  expect(htmlTreeSource).toEqual(sourceCloned);
});
