// В библиотеке async есть функция waterfall(), которая позволяет строить цепочки асинхронных функций без необходимости вкладывать их друг в друга. 
// Подробнее о том как она работает, посмотрите в документации. Попробуйте решить данное упражнение с применением этой функции.
// Реализуйте и экспортируйте асинхронную функцию unionFiles().

import fs from 'fs';
import async from 'async';

const { waterfall } = async;

export const unionFiles = async (path1, path2, outputPath, cb) => {
  waterfall([
    (callback) => {
      fs.readFile(path1, 'utf-8', (error1, data1) => {
        if (error1) {
          return cb(error1);
        }
        return callback(null, data1);
      });
    },
    (data1, callback) => {
      fs.readFile(path2, 'utf-8', (error2, data2) => {
        if (error2) {
          return cb(error2);
        }
        return callback(null, data1, data2);
      });
    },
    (data1, data2, callback) => {
      fs.writeFile(outputPath, `${data1}${data2}`, (error3, result) => {
        if (error3) {
          return cb(error3);
        }
        return callback(null, result);
      });
    },
  ], cb);
};

/* __tests__ */

import path from 'path';
import os from 'os';
import fs from 'fs';
import { unionFiles } from '../file.js';

let output;
let filepath1;
let filepath2;

beforeAll(() => {
  const tmpDir = fs.mkdtempSync(`${os.tmpdir()}/`);
  output = path.join(tmpDir, 'output');
  filepath1 = path.join(tmpDir, 'source1');
  fs.writeFileSync(filepath1, 'data1');
  filepath2 = path.join(tmpDir, 'source12');
  fs.writeFileSync(filepath2, 'data2');
});

test('unionFiles 1', (done) => {
  unionFiles('/undefined', filepath2, output, (err) => {
    expect(err).not.toBeNull();
    done();
  });
});

test('unionFiles 2', (done) => {
  unionFiles(filepath1, '/undefined', output, (err) => {
    expect(err).not.toBeNull();
    done();
  });
});

test('unionFiles 3', (done) => {
  unionFiles(filepath1, filepath2, '/a/b/c/', (err) => {
    expect(err).not.toBeNull();
    done();
  });
});

test('unionFiles 4', (done) => {
  unionFiles(filepath1, filepath2, output, (err) => {
    expect(err).toBeNull();

    fs.readFile(output, 'utf-8', (err2, data2) => {
      expect(err2).toBeNull();
      expect(data2).toBe('data1data2');
      done();
    });
  });
});
