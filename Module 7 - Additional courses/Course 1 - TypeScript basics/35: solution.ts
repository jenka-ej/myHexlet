// Реализуйте класс File, в конструктор которого передается объект с полями: name - именем файла и size - размером в байтах.
// Внутри класса определите метод toString(), который должен вернуть форматированную строку в формате <file-name> (<size> bytes).

// const file = new File({ name: 'open-world.jpeg', size: 1000 });
// console.log(file); // open-world.jpeg (1000 bytes)

type FileOptions = {
  name: string,
  size: number
};

class File {
  name: string;

  size: number;

  constructor({ name, size }: FileOptions) {
    this.name = name;
    this.size = size;
  }

  toString(): string {
    return `${this.name} (${this.size} bytes)`;
  }
}

export default File;

/* __tests__ */

import File from '../solution';

test('File', () => {
  const file = new File({ name: 'foo.txt', size: 4 });

  expect(file.name).toBe('foo.txt');
  expect(file.size).toBe(4);
  expect(file.toString()).toBe('foo.txt (4 bytes)');
});
