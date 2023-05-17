// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход односвязный список и переворачивает его.

import Node from './Node';

export default (mainlist) => {
  const iter = (list, acc) => {
    if (!list) {
      return acc;
    }
    return iter(list.getNext(), new Node(list.getValue(), acc));
  };
  return iter(mainlist, null);
};

/* Node.js */

class Node {
  constructor(value, node = null) {
    this.next = node;
    this.value = value;
  }

  getNext() {
    return this.next;
  }

  getValue() {
    return this.value;
  }
}

export default Node;

/* __tests__ */

import Node from '../Node';
import reverse from '../linkedList';

describe('reverse', () => {
  it('test 1', () => {
    const list = new Node(true);
    const reversedList = reverse(list);
    expect(reversedList).toEqual(list);
  });

  it('test 2', () => {
    const numbers = new Node(1, new Node(2, new Node(3)));
    const reversedNumbers = reverse(numbers);
    expect(reversedNumbers.getValue()).toBe(3);
    expect(reversedNumbers.getNext().getValue()).toBe(2);
    expect(reversedNumbers.getNext().getNext().getValue()).toBe(1);
  });
});
