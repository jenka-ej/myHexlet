// Реализуйте класс SmartFileInfo, наследующийся от FileInfo. Этот класс должен расширять поведение метода getSize. 
// В новом классе этот метод принимает на вход аргумент, который обозначает единицу измерения возвращаемых данных. По умолчанию это b, то есть байты. 
// Но можно передать и kb, то есть килобайты. В случае килобайтов, переопределённый метод делит байты на 1024 и получившееся значение возвращает наружу.
// Метод должен обрабатывать ситуацию, когда на вход поступает что-то другое, кроме указанных значений. Обработка сводится к возбуждению исключения Error.

import FileInfo from './FileInfo.js';

class SmartFileInfo extends FileInfo {
  getSize(unitOfMeasurement = '') {
    switch (unitOfMeasurement) {
      case '':
        return super.getSize();
      case 'b':
        return super.getSize();
      case 'kb':
        return super.getSize() / 1024;
      default:
        throw new Error('Error');
    }
  }
}

export default SmartFileInfo;

/* FileInfo.js */

import fs from 'fs';

export default class FileInfo {
  constructor(filePath) {
    this.filePath = filePath;
    this.fileStat = fs.statSync(filePath);
  }

  getSize() {
    return this.fileStat.size;
  }
}

/* __tests__ */

import path from 'path';
import SmartFileInfo from '../SmartFileInfo.js';

const filePath = path.resolve('Makefile');

test('GetSize', () => {
  const file = new SmartFileInfo(filePath);
  expect(file.getSize()).toBe(45);
  expect(file.getSize('b')).toBe(45);
  expect(file.getSize('kb')).toBe(0.0439453125);
});

test('Exception', () => {
  const file = new SmartFileInfo(filePath);
  expect(() => file.getSize('udav')).toThrow();
});
