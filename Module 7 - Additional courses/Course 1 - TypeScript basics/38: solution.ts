// Реализуйте класс CustomFile, в конструктор которого передается имя файла и размер в байтах. Внутри класса определите метод toString(),
// который должен вернуть форматированную строку в формате <file-name> (<size> bytes). Используйте свойства параметров для заполнения свойств класса.

// const file = new CustomFile('open-world.jpeg', 1000);
// console.log(file); // open-world.jpeg (1000 bytes)

class CustomFile {
  constructor(private name: string, private size: number) {}

  toString(): string {
    return `${this.name} (${this.size} bytes)`;
  }
}

export default CustomFile;

/* __tests__ */

import CustomFile from '../solution';

test('CustomFile', () => {
  const file = new CustomFile('foo.txt', 4);

  expect(file.toString()).toBe('foo.txt (4 bytes)');

  const file2 = new CustomFile('bar.txt', 8);
  expect(file2.toString()).toBe('bar.txt (8 bytes)');
});
