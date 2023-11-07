// Реализуйте класс очереди (Queue) с методами enqueue и dequeue.
// Метод enqueue добавляет элемент в конец очереди, а метод dequeue удаляет элемент из начала очереди.
// Если очередь пуста, то при вызове метода dequeue должно быть выброшено исключение Error.

// const queue = new Queue<number>();
// queue.enqueue(1);
// queue.dequeue(); // 1
// queue.dequeue(); // Error: Queue is empty

class Queue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T {
    if (this.items.length === 0) {
      throw new Error('Queue is empty');
    }
    return this.items.shift() as T;
  }
}

export default Queue;

/* __tests__ */

import Queue from '../solution';

test('Queue', () => {
  const queue = new Queue<number>();
  queue.enqueue(1);
  queue.enqueue(2);
  queue.enqueue(3);
  expect(queue.dequeue()).toBe(1);
  expect(queue.dequeue()).toBe(2);
  expect(queue.dequeue()).toBe(3);
  expect(() => queue.dequeue()).toThrow();

  const queue2 = new Queue<string>();
  queue2.enqueue('one');
  queue2.enqueue('two');
  expect(queue2.dequeue()).toBe('one');
  expect(queue2.dequeue()).toBe('two');
  expect(() => queue2.dequeue()).toThrow();
});
