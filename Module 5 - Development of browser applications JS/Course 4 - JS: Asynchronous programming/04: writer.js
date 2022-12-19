// Реализуйте асинхронную функцию, которая записывает данные по указанному пути и оповещает о завершении работы через переданный колбек. 
// Экспортируйте функцию по умолчанию.

import fs from 'fs';

export default function write(path, data, cb) {
  return fs.writeFile(path, data, (_error, cbData) => cb(cbData));
}

/* __tests__ */

import fs from 'fs';
import os from 'os';
import path from 'path';
import write from '../writer.js';

test('readFile', () => {
  const data = 'example';
  const filename = 'test';
  const tmpDir = fs.mkdtempSync(`${os.tmpdir()}/`);
  const filepath = path.join(tmpDir, filename);
  return new Promise((done) => {
    write(filepath, data, (err) => {
      if (err) {
        done.fail(err);
        return;
      }
      const content = fs.readFileSync(filepath, 'utf-8');
      expect(content).toEqual(data);
      done();
    });
  });
});
