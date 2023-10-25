// Реализуйте класс ImageFile, расширяющий (extends) класс File дополнительными приватными полями: width, height.
// Также переопределите метод toString(), теперь он должен дополнительно выводить <width>x<height>.

// const imageFile = new ImageFile({
//   name: 'image.png',
//   size: 100,
//   width: 200,
//   height: 300,
// });

// console.log(imageFile.toString()); // image.png (100 bytes) 200x300

// Для того, чтобы вызвать метод родительского класса используйте super.toString().

type FileOptions = {
  name: string;
  size: number;
};

class File {
  private name: string;

  private size: number;

  constructor(options: FileOptions) {
    this.name = options.name;
    this.size = options.size;
  }

  protected toString() {
    return `${this.name} (${this.size} bytes)`;
  }
}

type ImageOptions = {
  name: string;
  size: number;
  width: number;
  height: number;
};

class ImageFile extends File {
  private width: number;

  private height: number;

  constructor(options: ImageOptions) {
    super(options);
    this.width = options.width;
    this.height = options.height;
  }

  toString(): string {
    const extendString = `${this.width}x${this.height}`;
    return `${super.toString()} ${extendString}`;
  }
}

export default ImageFile;

/* __tests__ */

import ImageFile from '../solution';

test('ImageFile', () => {
  const imageFile = new ImageFile({
    name: 'image.png',
    size: 100,
    width: 200,
    height: 300,
  });

  expect(imageFile.toString()).toBe('image.png (100 bytes) 200x300');

  const imageFile2 = new ImageFile({
    name: 'image2.png',
    size: 400,
    width: 500,
    height: 600,
  });

  expect(imageFile2.toString()).toBe('image2.png (400 bytes) 500x600');
  // @ts-expect-error - private property
  expect(imageFile2.name).toBe('image2.png');
  // @ts-expect-error - private property
  expect(imageFile2.size).toBe(400);
  // @ts-expect-error - private property
  expect(imageFile2.width).toBe(500);
  // @ts-expect-error - private property
  expect(imageFile2.height).toBe(600);
});
