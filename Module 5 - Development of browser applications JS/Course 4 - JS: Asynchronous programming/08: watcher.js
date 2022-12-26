// Реализуйте и экспортируйте по умолчанию асинхронную функцию, которая следит за изменением файла с заданной периодичностью. 
// Функция должна возвращать идентификатор таймера, запущенного внутри.
// Если файл был изменён со времени предыдущей проверки, то необходимо вызвать колбек. 
// Если во время анализа файла (через fs.stat) произошла ошибка, то нужно остановить таймер и вызвать колбек, передав туда ошибку.
// Отслеживание изменений файла должно начинаться с момента вызова функции. Параметры функции:
// 1) Путь до файла, который нужно отслеживать
// 2) Период отслеживания
// 3) Колбек, принимающий аргументом ошибку

import fs from 'fs';

export default function watch(path, delay, cb) {
  const id = setInterval(() => fs.stat(path, (err, stats) => {
    if (err) {
      clearInterval(id);
      return cb(err);
    }
    if ((Date.now() - stats.mtimeMs) < delay) {
      return cb(null);
    }
    return id;
  }), delay);
  return id;
}

/* __tests__ */

import path from 'path';
import os from 'os';
import fs from 'fs';
import watch from '../watcher.js';

const buildFilePath = (n) => path.join(os.tmpdir(), `example-2-${n}`);
const prepareFileSync = (n) => {
  const filepath = buildFilePath(n);
  fs.writeFileSync(filepath, '');
  return filepath;
};

const ensureDone = (done, timeout = 3000) => {
  const wastedTimeoutId = setTimeout(() => done('WASTED'), timeout);
  return () => {
    clearTimeout(wastedTimeoutId);
    done();
  };
};

test('watch', (done) => {
  const finish = ensureDone(done);
  const id = watch('/undefined', 4, (err) => {
    clearInterval(id);
    expect(err).not.toBeNull();
    finish();
  });
});

test('watch 2', (done) => {
  const finish = ensureDone(done);
  const filepath = prepareFileSync(2);
  const id = watch(filepath, 500, (err) => {
    clearInterval(id);
    expect(err).toBeNull();
    finish();
  });
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700);
});

test('watch 3', (done) => {
  const finish = ensureDone(done);
  const id = watch('/etc/hosts', 100, () => {
    expect(true).toBe(false);
  });
  setTimeout(() => {
    clearInterval(id);
    finish();
  }, 200);
});

test('watch 4', (done) => {
  const finish = ensureDone(done);
  const filepath = prepareFileSync(4);
  let count = 0;
  const id = watch(filepath, 500, (err) => {
    count += 1;
    if (count === 2) {
      clearInterval(id);
      expect(err).toBeNull();
      finish();
    }
  });
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 700);
  setTimeout(() => fs.appendFileSync(filepath, 'uhe'), 1100);
});

/* __tests__ */

import path from 'path';
import os from 'os';
import fs from 'fs';
import watch from '../watcher.js';

const buildFilePath = (n) => path.join(os.tmpdir(), `example-2-${n}`);
const prepareFileSync = (n) => {
  const filepath = buildFilePath(n);
  fs.writeFileSync(filepath, '');
  return filepath;
};

test('watch 5: cb should be called once', (done) => {
  const filepath = prepareFileSync(5);
  let count = 0;
  const id = watch(filepath, 500, () => {
    count += 1;
  });
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 300);
  setTimeout(() => {
    clearInterval(id);
    expect(count).toBe(1);
    done();
  }, 1100);
});

test('watch 6', (done) => {
  const filepath = prepareFileSync(6);
  const id = watch(filepath, 500, () => {
    expect(id._idleNext).toBeNull(); //eslint-disable-line
    clearInterval(id);
    done();
  });
  setTimeout(() => fs.unlink(filepath, () => {}), 700);
});

test('watch 7', (done) => {
  const filepath = prepareFileSync(7);
  let count = 0;
  const id = watch(filepath, 500, () => {
    count += 1;
  });
  setTimeout(() => fs.appendFileSync(filepath, 'ehu'), 100);
  setTimeout(() => fs.appendFileSync(filepath, 'abc'), 300);
  setTimeout(() => {
    clearInterval(id);
    expect(count).toBe(1);
    done();
  }, 1100);
});
