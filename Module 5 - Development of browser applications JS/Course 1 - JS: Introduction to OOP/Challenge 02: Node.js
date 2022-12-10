// Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла.
// Класс должен содержать:
// 1) Геттер getKey() — возвращает ключ.
// 2) Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
// 3) Метод insert(key) — выполняет добавление узла, формируя правильное двоичное дерево.

export default class Node {
  constructor(key = null, lkey = null, rkey = null) {
    this.key = key;
    this.lkey = lkey;
    this.rkey = rkey;
  }

  getKey() {
    return this.key;
  }

  getLeft() {
    return this.lkey;
  }

  getRight() {
    return this.rkey;
  }

  insert(num) {
    if (this.key === null) {
      this.key = num;
      return this.key;
    }
    if (num > this.key) {
      if (this.rkey === null) {
        this.rkey = new Node(num, null, null);
        return this.rkey;
      }
      return this.rkey.insert(num);
    }
    if (num < this.key) {
      if (this.lkey === null) {
        this.lkey = new Node(num, null, null);
        return this.lkey;
      }
      return this.lkey.insert(num);
    }
    this.key = num;
    return this.key;
  }
}

/* __tests__ */

import Node from '../Node.js';

describe('Binary tree', () => {
  test('getters', () => {
    const tree = new Node();
    tree.insert(9);
    tree.insert(4);
    tree.insert(17);

    expect(tree.getKey()).toBe(9);
    expect(tree.getLeft().getKey()).toBe(4);
    expect(tree.getRight().getKey()).toBe(17);
  });

  test('empty tree', () => {
    const tree = new Node();

    expect(tree.getKey()).toBeNull();
    expect(tree.getLeft()).toBeNull();
    expect(tree.getRight()).toBeNull();
  });

  test('insert', () => {
    const tree = new Node();
    tree.insert(9);
    tree.insert(17);
    tree.insert(4);
    tree.insert(3);
    tree.insert(6);
    tree.insert(22);
    tree.insert(5);
    tree.insert(7);
    tree.insert(20);
    tree.insert(4);
    tree.insert(3);

    expect(tree.getKey()).toBe(9);

    expect(tree.getLeft().getKey()).toBe(4);

    expect(tree.getLeft().getLeft().getKey()).toBe(3);
    expect(tree.getLeft().getLeft().getLeft()).toBeNull();
    expect(tree.getLeft().getLeft().getRight()).toBeNull();

    expect(tree.getLeft().getRight().getKey()).toBe(6);

    expect(tree.getLeft().getRight().getLeft().getKey()).toBe(5);
    expect(tree.getLeft().getRight().getLeft().getLeft()).toBeNull();
    expect(tree.getLeft().getRight().getLeft().getRight()).toBeNull();

    expect(tree.getLeft().getRight().getRight().getKey()).toBe(7);
    expect(tree.getLeft().getRight().getRight().getLeft()).toBeNull();
    expect(tree.getLeft().getRight().getRight().getRight()).toBeNull();

    expect(tree.getRight().getKey()).toBe(17);
    expect(tree.getRight().getLeft()).toBeNull();

    expect(tree.getRight().getRight().getKey()).toBe(22);
    expect(tree.getRight().getRight().getRight()).toBeNull();

    expect(tree.getRight().getRight().getLeft().getKey()).toBe(20);
    expect(tree.getRight().getRight().getLeft().getLeft()).toBeNull();
    expect(tree.getRight().getRight().getLeft().getRight()).toBeNull();
  });
});
