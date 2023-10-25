// Реализуйте класс File, в конструктор которого передается имя файла и размер в байтах или другой файл.
// Внутри класса определите метод toString(), который должен вернуть форматированную строку в формате (copy) <file-name> (<size> bytes).
// (copy) должно выводиться только в случае, если файл является копией другого файла.

// const file1 = new File({ name: 'open-world.jpeg', size: 1000 });
// console.log(`${file1}`); // open-world.jpeg (1000 bytes)
 
// const file2 = new File(file1);
// console.log(`${file2}`); // (copy) open-world.jpeg (1000 bytes)
 
// const file3 = new File(file2);
// console.log(`${file3}`); // (copy) open-world.jpeg (1000 bytes)

type FileOptions = {
  name: string,
  size: number
};

class File {
  name: string;

  size: number;

  private clone: boolean;

  constructor(options: FileOptions | File) {
    this.name = options.name;
    this.size = options.size;
    this.clone = options instanceof File;
  }

  toString(): string {
    if (this.clone) {
      return `(copy) ${this.name} (${this.size} bytes)`;
    }
    return `${this.name} (${this.size} bytes)`;
  }
}

export default File;

/* __tests__ */

import File from '../solution';

test('File', () => {
  const file = new File({ name: 'foo.txt', size: 4000 });

  expect(file.name).toBe('foo.txt');
  expect(file.size).toBe(4000);
  expect(`${file}`).toBe('foo.txt (4000 bytes)');

  const file2 = new File(file);
  expect(`${file2}`).toBe('(copy) foo.txt (4000 bytes)');
});
