// С помощью предоставленного интерфейса IPhonebook и типа Entry реализуйте класс Phonebook, представляющий из себя телефонный справочник, в котором должны быть свойства:
// 1) entries: наша база данных, объект, записи в котором представляют собой имена в качестве ключей и телефоны в качестве значений. Свойство должно быть неизменяемым и доступным только для чтения
// 2) get: метод, возвращающий телефон по имени
// 3) set: метод, записывающий имя и телефон в наш справочник

// Примеры:

// const myNote = new Phonebook();
// myNote.set('help', 911);
// myNote.get('help'); // 911

type Entry = {
  [key: string]: number
};

interface IPhonebook {
  get(key: string): number | null
  set(key: string, value: number): void
}

class Phonebook implements IPhonebook {
  private readonly entries: Entry = {};

  get(key: string): number | null {
    return this.entries[key] ?? null;
  }

  set(key: string, value: number): void {
    this.entries[key] = value;
  }
}

export default Phonebook;

/* __tests__ */

import Phonebook from '../solution';

test('myBook', () => {
  const myBook = new Phonebook();
  myBook.set('test1', 1);
  expect(myBook.get('test1')).toBe(1);
  expect(myBook.get('test2')).toBe(null);
});
