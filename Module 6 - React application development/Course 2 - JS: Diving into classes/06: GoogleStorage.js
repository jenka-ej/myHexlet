// В этом задании вам придется написать код, который нарушает принцип Лисков. Запомните его и никогда так больше не делайте :D
// Представьте себе библиотеку, которая предоставляет абстракции для работы с хранилищами ключ-значение. Все они предоставляют интерфейс из трех методов:
// 1) set(key, value) – устанавливает значение
// 2) get(key) – возвращает значение
// 3) count() – возвращает количество ключей в хранилище
// В директории src три таких хранилища: Redis, InMemory, GoogleStorage. Первые два умеют возвращать число ключей внутри них, а последнее – нет.

// Реализуйте интерфейс хранилища в классе GoogleStorage.
// Так как GoogleStorage не поддерживает подсчет количества элементов, то сделайте так, чтобы этот метод кидал исключение Error, если его вызывают.

import InMemory from './InMemory.js';

class GoogleStorage extends InMemory {
  count() {
    throw new Error('Error');
  }
}

export default GoogleStorage;

/* InMemory.js */

export default class InMemory {
  constructor(elements = {}) {
    this.elements = elements;
  }

  get(key) {
    return this.elements[key];
  }

  set(key, value) {
    this.elements[key] = value;
  }

  count() {
    return Object.keys(this.elements).length;
  }
}

/* Redis.js */

export default class Redis {
  constructor() {
    this.elements = new Map();
  }

  get(key) {
    if (!this.elements.has(key)) {
      throw new Error(`Not found key "${key}"`);
    }
    return this.elements.get(key);
  }

  set(key, value) {
    this.elements.set(key, value);
  }

  count() {
    return this.elements.size;
  }
}

/* __tests__ */

import GoogleStorage from '../src/GoogleStorage.js';

test('SetGet', () => {
  const storage = new GoogleStorage();
  storage.set('one', 'two');
  expect(storage.get('one')).toEqual('two');
});

test('Count', () => {
  const storage = new GoogleStorage();
  expect(() => storage.count()).toThrow();
});
