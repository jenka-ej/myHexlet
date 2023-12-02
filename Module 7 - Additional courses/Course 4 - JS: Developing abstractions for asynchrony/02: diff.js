// Реализуйте и экспортируйте по умолчанию функцию, которая сравнивает два файла построчно.
// Сигнатура функции: (path1, path2, callback), где path1 и path2 — пути до первого и второго файла соответственно,
// а callback — это функция, которая будет вызвана после проведения сравнения. Сигнатура функции callback — (err, data).

// Результатом функции является массив, каждый элемент которого состоит из двух элементов.
// Первый — это строчка из первого файла, второй — это соответствующая строчка из второго. Если строки совпадают, то они не попадают в результат.
// Если в одном из файлов строка отсутствует, то в массиве подставляется null.

// Подробнее в примере:
// diff('fixtures/file4', 'fixtures/file5', (err, data) => {
//   console.log(data);
//   // [['text', 'ext'], ['', 'haha'], ['ehu', ''], ['', 'text'], ['aha', null]];
// });

// Содержимое файла file4:
// hello, world
// text
 
// ehu
 
// aha

// Содержимое файла file5:
// hello, world
// ext
// haha
 
// text

// Подсказки:
// 1) Данные, которые читаются из файла, преобразуются к строке используя метод toString
// 2) Альтернативный способ, это передача в readFile вместо двух, три аргумента. Подробнее можно посмотреть в документации

import fs from 'fs';

const compare = (data1, data2) => {
  const lines1 = data1.split('\n').slice(0, -1);
  const lines2 = data2.split('\n').slice(0, -1);

  const maxLength = lines1.length > lines2.length ? lines1.length : lines2.length;
  const result = [];
  for (let i = 0; i < maxLength; i += 1) {
    const str1 = lines1[i] ?? null;
    const str2 = lines2[i] ?? null;
    if (str1 !== str2) {
      result.push([str1, str2]);
    }
  }
  return result;
};

export default function diff(path1, path2, callback) {
  fs.readFile(path1, (err1, data1) => {
    if (!err1) {
      fs.readFile(path2, (err2, data2) => {
        if (!err2) {
          callback(null, compare(data1.toString(), data2.toString()));
        } else {
          callback(err2);
        }
      });
    } else {
      callback(err1);
    }
  });
}

/* __tests__/fixtures/file1 */



/* __tests__/fixtures/file2 */



/* __tests__/fixtures/file3 */

hello, world


/* __tests__/fixtures/file4 */

hello, world
text

ehu

aha


/* __tests__/fixtures/file5 */

hello, world
ext
haha

text


/* __tests__/diff.test.js */

import diff from '../diff.js';

const getFixturePath = (fileName) => `__tests__/fixtures/${fileName}`;

describe('Diff', () => {
  it('should work', () => (
    new Promise((done) => {
      diff(getFixturePath('file1'), getFixturePath('file2'), (err, data) => {
        expect(data).toEqual([]);
        done();
      });
    })
  ));

  it('should work 2', () => (
    new Promise((done) => {
      diff(getFixturePath('file1'), getFixturePath('file3'), (err, data) => {
        expect(data).toEqual([[null, 'hello, world']]);
        done();
      });
    })
  ));

  it('should work 3', () => (
    new Promise((done) => {
      diff(getFixturePath('file3'), getFixturePath('file2'), (err, data) => {
        expect(data).toEqual([['hello, world', null]]);
        done();
      });
    })
  ));

  it('should work 4', () => (
    new Promise((done) => {
      diff(getFixturePath('file4'), getFixturePath('file5'), (err, data) => {
        const result = [
          ['text', 'ext'],
          ['', 'haha'],
          ['ehu', ''],
          ['', 'text'],
          ['aha', null],
        ];
        expect(data).toEqual(result);
        done();
      });
    })
  ));

  it('should work 5', () => (
    new Promise((done) => {
      diff(getFixturePath('file5'), getFixturePath('file4'), (err, data) => {
        const result = [
          ['ext', 'text'],
          ['haha', ''],
          ['', 'ehu'],
          ['text', ''],
          [null, 'aha'],
        ];
        expect(data).toEqual(result);
        done();
      });
    })
  ));

  it('shouldn\'t work 1', () => (
    new Promise((done) => {
      diff('non-existent file', getFixturePath('file5'), (err) => {
        expect(err.errno).toBe(-2);
        done();
      });
    })
  ));

  it('shouldn\'t work 2', () => (
    new Promise((done) => {
      diff(getFixturePath('file4'), 'non-existent file', (err) => {
        expect(err.code).toEqual('ENOENT');
        done();
      });
    })
  ));
});
