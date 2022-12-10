// Реализуйте и экспортируйте по умолчанию класс, который реализует представление узла. 
// Конструктор класса принимает на вход значение ключа (число), и двух детей, которые в свою очередь также являются узлами. Дерево может быть создано пустым.
// Класс должен содержать методы:
// 1) Геттер getKey() — возвращает ключ. Если дерево пустое, возвращает null.
// 2) Геттеры getLeft(), getRight() — возвращают соответственно левого и правого ребёнка. Если ребёнок в узле отсутствует, геттер возвращает null.
// 3) search(key) — выполняет поиск узла в правильном двоичном дереве по ключу и возвращает узел. Если узел не найден, возвращается null.

export default class Node {
  constructor(key = null, kid1 = null, kid2 = null) {
    this.key = key;
    this.lkey = kid1;
    this.rkey = kid2;
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

  search(num) {
    if (this.key === null) {
      return this.key;
    }
    if (num === this.key) {
      return this;
    }
    if (num < this.key) {
      return this.lkey === null ? this.lkey : this.lkey.search(num);
    }
    return this.rkey === null ? this.rkey : this.rkey.search(num);
  }
}

/* __tests__ */

import Node from '../Node.js';

describe('Binary tree', () => {
  test('getters', () => {
    const tree = new Node(9, new Node(4), new Node(17));

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

  test('search', () => {
    const expected1 = new Node(5);
    const expected2 = new Node(22, new Node(20), null);
    const tree = new Node(
      9,
      new Node(
        4,
        new Node(3),
        new Node(
          6,
          expected1,
          new Node(7),
        ),
      ),
      new Node(
        17,
        null,
        expected2,
      ),
    );

    expect(tree.search(5)).toBe(expected1);
    expect(tree.search(22)).toBe(expected2);
    expect(tree.search(35)).toBeNull();
    expect(tree.search(2)).toBeNull();
  });

  test('search algorithm', () => {
    const tree = new Node(
      9,
      new Node(
        4,
        new Node(
          6,
          new Node(5),
          new Node(7),
        ),
        new Node(3),
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

    expect(tree.search(5)).toBeNull();
    expect(tree.search(7)).toBeNull();
    expect(tree.search(6)).toBeNull();
    expect(tree.search(4).getKey()).toBe(4);
    expect(tree.search(22).getKey()).toBe(22);
  });
});
