// Реализуйте и экспортируйте асинхронную функцию getDirectorySize(), которая считает размер переданной директории не включая поддиректории. 
// Анализ размера файла должен происходить параллельно, для этого воспользуйтесь библиотекой async.

import path from 'path';
import fs from 'fs';
import _ from 'lodash';
import async from 'async';

export function getDirectorySize(pathToDir, cb) {
  fs.readdir(pathToDir, (error1, files) => {
    if (error1) {
      cb(error1);
      return;
    }
    const mappedFiles = files.map((file) => path.join(pathToDir, file));

    function size(file, callback) {
      fs.stat(file, (error2, stat) => {
        if (error2) {
          return callback(error2);
        }
        return callback(null, stat);
      });
    }

    async.map(mappedFiles, size, (error3, info) => {
      if (error3) {
        cb(error3);
        return;
      }
      const filteredInfo = info.filter((file) => file.isFile());
      const result = _.sumBy(filteredInfo.map((file) => file.size));
      cb(null, result);
    });
  });
  
  /* __tests__ */
  
  import path from 'path';
import fs from 'fs';
import { getDirectorySize } from '../info.js';

const getPath = (dirpath) => path.join('__fixtures__', dirpath);

test('getDirectorySize', () => (
  new Promise((done) => {
    const dirpath = getPath('/undefined');
    getDirectorySize(dirpath, (err) => {
      expect(err).not.toBeNull();
      done();
    });
  })
));

test('getDirectorySize2', () => (
  new Promise((done) => {
    const dirpath = getPath('/opt');
    if (!fs.existsSync(dirpath)) {
      fs.mkdirSync(dirpath);
    }
    getDirectorySize(dirpath, (err, size) => {
      expect(err).toBeNull();
      expect(size).toBe(0);
      done();
    });
  })
));

test('getDirectorySize3', () => (
  new Promise((done) => {
    const dirpath = getPath('/usr/local/bin');
    getDirectorySize(dirpath, (err, size) => {
      expect(err).toBeNull();
      expect(size).toBe(1240);
      done();
    });
  })
));

test('getDirectorySize4', () => (
  new Promise((done) => {
    const dirpath = getPath('/usr/local/lib');
    getDirectorySize(dirpath, (err, size) => {
      expect(err).toBeNull();
      expect(size).toBe(0);
      done();
    });
  })
));
}
