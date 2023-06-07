// Реализуйте класс, отвечающий за парсинг json. Используйте внутри JSON.parse().

export default class JsonParser {
  constructor(file) {
    this.file = file;
  }

  parse() {
    return JSON.parse(this.file);
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
