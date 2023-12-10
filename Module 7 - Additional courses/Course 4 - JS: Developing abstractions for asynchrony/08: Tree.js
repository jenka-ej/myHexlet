// Расширьте реализацию дерева функциями addChild() и removeChild() и добавьте два события: add и remove, которые должны порождаться при добавлении
// или удалении узла. Сам узел должен передаваться в функцию обратного вызова. Если удаляемого ключа нет, то нужно бросать исключение (текст любой),
// событие, при этом, не генерируется.

// tree = new Tree('start');
// tree.addChild('example');
 
// tree.on('add', node => {
//   console.log('add %s', node.getKey());
// });
// tree.addChild('test');
 
// tree.on('remove', node => {
//   console.log('remove %s', node.getKey());
// });
// tree.removeChild('example');

// @ts-check

import EventEmitter from 'events';

class Tree extends EventEmitter {
  constructor(key, parent) {
    super();
    this.parent = parent;
    this.key = key;
    this.children = new Map();
  }

  getKey() {
    return this.key;
  }

  getParent() {
    return this.parent;
  }

  addChild(child) {
    this.children.set(child, '');
    this.emit('add', new Tree(child, this));
  }

  removeChild(child) {
    if (!this.children.has(child)) {
      throw new Error('Key is missing');
    }
    this.children.delete(child);
    this.emit('remove', new Tree(child, this));
  }
}

export default Tree;

/* __tests__ */

import Tree from '../Tree.js';

describe('Tree', () => {
  let tree;

  beforeEach(() => {
    tree = new Tree('start');
    tree.addChild('example');
  });

  it('#addChild', () => (
    new Promise((done) => {
      tree.on('add', (node) => {
        expect(node.getKey()).toBe('test');
        expect(node.getParent().getKey()).toBe('start');
        done();
      });
      tree.addChild('test');
    })
  ));

  it('#removeChild', () => (
    new Promise((done) => {
      tree.on('remove', (node) => {
        expect(node.getKey()).toBe('example');
        expect(node.getParent().getKey()).toBe('start');
        done();
      });
      tree.removeChild('example');
    })
  ));

  it('#removeChildWhenNotExists', () => {
    expect(() => tree.removeChild('not exists')).toThrow();
  });

  it('#childrenState', () => {
    tree.addChild('test');
    tree.removeChild('example');

    expect(tree.children.has('test')).toBe(true);
    expect(tree.children.has('example')).toBe(false);
  });
});
