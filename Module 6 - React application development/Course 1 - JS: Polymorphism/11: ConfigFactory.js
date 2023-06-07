// Создайте фабрику, которая принимает на вход путь до файла конфигурации в формате либо json либо yaml и возвращает объект класса Config. 
// Конструктор класса Config принимает на вход объект с данными, полученными из конфигурационных файлов и предоставляет к нему доступ с помощью метода getValue.

import path from 'path';
import fs from 'fs';
import JsonParser from './parsers/JsonParser.js';
import YamlParser from './parsers/YamlParser.js';
import Config from './Config.js';

export default class {
  static factory(mainPath) {
    const file = fs.readFileSync(mainPath, 'utf8');
    const extension = path.extname(mainPath);
    const setting = {
      '.yaml': (data) => new YamlParser(data).parse(),
      '.yml': (data) => new YamlParser(data).parse(),
      '.json': (data) => new JsonParser(data).parse(),
    };
    const parsedFile = setting[extension](file);
    return new Config(parsedFile);
  }
}

/* __fixtures__/test.yml */

{
  "key": "something else"
}

/* __fixtures__/test.yml */

---

key: value

/* __fixtures__/test2.json */

{
  "key": "value",
  "files": {
    "config": "json",
    "picture": "jpg"
  }
}

/* __fixtures__/test2.yaml */

---

key: another value

/* __tests__ */

import path from 'path';
import ConfigFactory from '../ConfigFactory.js';

describe('ConfigFactory', () => {
  const pathToFixtures = path.join('__fixtures__');

  it('test yml', () => {
    const filePath = path.join(pathToFixtures, 'test.yml');
    const config = ConfigFactory.factory(filePath);
    const actual = config.getValue('key');
    expect(actual).toBe('value');
  });

  it('test yaml', () => {
    const filePath = path.join(pathToFixtures, 'test2.yaml');
    const config = ConfigFactory.factory(filePath);
    const actual = config.getValue('key');
    expect(actual).toBe('another value');
  });

  it('test json 1', () => {
    const filePath = path.join(pathToFixtures, 'test.json');
    const config = ConfigFactory.factory(filePath);
    const actual = config.getValue('key');
    expect(actual).toBe('something else');
  });

  it('test json 2', () => {
    const filePath = path.join(pathToFixtures, 'test2.json');
    const config = ConfigFactory.factory(filePath);
    const actual = config.getValue('files').getValue('config');
    expect(actual).toBe('json');
  });
});
