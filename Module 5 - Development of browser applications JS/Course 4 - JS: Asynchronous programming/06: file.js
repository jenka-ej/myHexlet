// Реализуйте и экспортируйте функцию move, которая асинхронно перемещает файл из одного места в другое. Ее параметры:
// 1) Путь до файла исходника
// 2) Путь по которому нужно копировать файл
// 3) Колбек, у которого единственный аргумент — ошибка
// 4) Алгоритм работы функции следующий:
// 4.1) Читаем исходный файл
// 4.2) Создаём новый файл и записываем туда данные исходного файла (это важно сделать до попытки удаления исходного файла!)
// 4.3) Удаляем исходный файл

import fs from 'fs';

export function move(pathToSrc, pathToCopy, cb) {
  fs.readFile(pathToSrc, (error1, dataSrc) => {
    if (error1) {
      cb(error1);
      return;
    }
    fs.writeFile(pathToCopy, dataSrc, (error2) => {
      if (error2) {
        cb(error2);
        return;
      }
      fs.unlink(pathToSrc, (error3) => cb(error3));
    });
  });
}

/* __tests__ */

import path from 'path';
import os from 'os';
import fs from 'fs';
import { move } from '../file.js';

test('move1', (done) => {
  move('/undefined', '/undefined2', (error) => {
    expect(error).not.toBeNull();
    expect(error.syscall).toBe('open');
    expect(error.code).toBe('ENOENT');
    done();
  });
});

test('move2', (done) => {
  const dirname = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-'));
  const from = path.join(dirname, 'source');
  fs.writeFileSync(from, 'haha');
  move(from, '/undefined', (error) => {
    expect(error).not.toBeNull();
    const exists1 = fs.existsSync(from);
    expect(exists1).toBe(true);
    done();
  });
});

test('move3', (done) => {
  const dirname = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-'));
  const to = path.join(dirname, 'dest');
  move('/etc/passwd', to, (error) => {
    expect(error).not.toBeNull();
    done();
  });
});

test('move4', (done) => {
  const dirname = fs.mkdtempSync(path.join(os.tmpdir(), 'hexlet-'));
  const from = path.join(dirname, 'source');
  fs.writeFileSync(from, 'haha');
  const to = path.join(dirname, 'dest');
  move(from, to, (error) => {
    expect(error).toBeNull();
    const exists1 = fs.existsSync(from);
    expect(exists1).toBe(false);
    const exists2 = fs.existsSync(to);
    expect(exists2).toBe(true);
    const content = fs.readFileSync(to, 'utf-8');
    expect(content).toBe('haha');
    done();
  });
});
