// Реализуйте следующие методы в классе:
// 1) getCount() — возвращает количество узлов в дереве.
// 2) getSum() — возвращает сумму всех ключей дерева.
// 3) toArray() — возвращает одномерный массив содержащий все ключи.
// 4) toString() — возвращает строковое представление дерева.
// 5) every(fn) — проверяет, удовлетворяют ли все ключи дерева условию, заданному в передаваемой функции.
// 6) some(fn) - проверяет, удовлетворяет ли какой-либо ключ дерева условию, заданному в передаваемой функции.
// При обходе дерева нужно использовать порядок слева-направо. То есть вначале обрабатываем ключ узла, затем ключ левого ребёнка, после чего ключ правого ребёнка.

export default class Node {
  constructor(key = null, left = null, right = null) {
    this.key = key;
    this.left = left;
    this.right = right;
  }

  getCount() {
    const mass = [this.key, this.left, this.right];
    return mass.reduce((acc, node) => {
      if (typeof node !== 'number') {
        if (node === null) {
          return acc;
        }
        const newAcc = acc + node.getCount();
        return newAcc;
      }
      const newAcc = acc + 1;
      return newAcc;
    }, 0);
  }

  getSum() {
    const mass = [this.key, this.left, this.right];
    return mass.reduce((acc, node) => {
      if (typeof node !== 'number') {
        if (node === null) {
          return acc;
        }
        const newAcc = acc + node.getSum();
        return newAcc;
      }
      const newAcc = acc + node;
      return newAcc;
    }, 0);
  }

  toArray() {
    const mass = [this.key, this.left, this.right];
    return mass.reduce((acc, node) => {
      if (typeof node !== 'number') {
        if (node === null) {
          return acc;
        }
        acc.push(node.toArray());
        return acc;
      }
      acc.push(node);
      return acc;
    }, []).flat();
  }

  toString() {
    const result = JSON.stringify(this.toArray());
    return result.split('')
      .reduce((acc, item) => {
        if (item === '[') {
          acc.push('(');
          return acc;
        }
        if (item === ']') {
          acc.push(')');
          return acc;
        }
        acc.push(item);
        return acc;
      }, [])
      .join('')
      .split(',')
      .join(', ');
  }

  every(fn) {
    const mass = this.toArray();
    return mass.reduce((acc, num) => {
      if (!fn(num)) {
        return false;
      }
      return acc;
    }, true);
  }

  some(fn) {
    const mass = this.toArray();
    return mass.reduce((acc, num) => {
      if (fn(num)) {
        return true;
      }
      return acc;
    }, false);
  }
}

/* __tests__ */

import Node from '../Node.js';

describe('Binary tree', () => {
  const tree = new Node(
    9,
    new Node(
      4,
      new Node(8),
      new Node(
        6,
        new Node(3),
        new Node(7),
      ),
    ),
    new Node(
      17,
      null,
      new Node(
        22,
        null,
        new Node(20),
      ),
    ),
  );

  test('methods', () => {
    expect(tree.getCount()).toBe(9);
    expect(tree.getSum()).toBe(96);
    expect(tree.toArray()).toEqual([9, 4, 8, 6, 3, 7, 17, 22, 20]);
    expect(tree.toString()).toEqual('(9, 4, 8, 6, 3, 7, 17, 22, 20)');
  });

  test('predicate methods', () => {
    expect(tree.some((key) => key < 4)).toBeTruthy();
    expect(tree.some((key) => key > 22)).toBeFalsy();
    expect(tree.every((key) => key <= 22)).toBeTruthy();
    expect(tree.every((key) => key < 22)).toBeFalsy();
    expect(tree.every(Number.isInteger)).toBeTruthy();
  });
});
