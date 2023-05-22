// Реализуйте и экспортируйте по умолчанию класс DatabaseConfigLoader, который отвечает за загрузку конфигурации для базы данных. У класса следующий интерфейс:
// 1) Конструктор - принимает на вход путь, по которому нужно искать конфигурацию
// 2) load(env) - метод, который грузит конфигурацию для конкретной среды окружения. Он загружает файл database.${env}.json, парсит его и возвращает результат наружу
// Если в загружаемой конфигурации есть ключ extend, то нужно загрузить конфигурацию с именем, хранящимся в этом ключе.
// Конфигурации сливаются между собой так, что приоритет имеет загруженная раньше. Итоговая конфигурация не должна содержать ключ extend.

import fs from 'fs';
import path from 'path';

export default class DatabaseConfigLoader {
  constructor(pathToFixtures) {
    this.pathToFixtures = pathToFixtures;
  }

  load(env) {
    const pathToConfig = path.join(this.pathToFixtures, `database.${env}.json`);
    const raw = fs.readFileSync(pathToConfig);
    let config = JSON.parse(raw);
    const makeExtension = () => {
      const nextPathToConfig = path.join(this.pathToFixtures, `database.${config.extend}.json`);
      const nextRaw = fs.readFileSync(nextPathToConfig);
      const nextConfig = JSON.parse(nextRaw);
      const mainKeys = Object.keys(config).filter((mainKey) => mainKey !== 'extend');
      const addKeys = Object.keys(nextConfig).filter((addKey) => !mainKeys.includes(addKey));
      const mergedKeys = mainKeys.concat(addKeys);
      config = mergedKeys.reduce((acc, mergedKey) => {
        let value;
        if (mainKeys.includes(mergedKey)) {
          value = config[mergedKey];
        } else {
          value = nextConfig[mergedKey];
        }
        acc[mergedKey] = value;
        return acc;
      }, {});
    };
    const recursion = () => {
      if (Object.getOwnPropertyDescriptor(config, 'extend')) {
        makeExtension();
        recursion();
      }
    };
    recursion();
    return config;
  }
}

/* __tests__ */

import path from 'path';
import DatabaseConfigLoader from '../DatabaseConfigLoader.js';

describe('DatabaseConfigLoader', () => {
  const pathToConfigs = path.join('__fixtures__');
  const loader = new DatabaseConfigLoader(pathToConfigs);

  it('load 1', () => {
    const expected = {
      host: 'google.com',
      username: 'postgres',
    };
    expect(loader.load('production')).toEqual(expected);
  });

  it('load 2', () => {
    const expected = {
      username: 'mysupername',
    };
    expect(loader.load('custom')).toEqual(expected);
  });

  it('load with extend', () => {
    const expected = {
      host: 'localhost',
      username: 'postgres',
      port: 5000,
    };
    expect(loader.load('development')).toEqual(expected);
  });

  it('load with deep extend', () => {
    const expected = {
      host: 'dev.server',
      username: 'postgres',
      port: 5000,
      password: 'admin',
    };
    expect(loader.load('preproduction')).toEqual(expected);
  });
});
