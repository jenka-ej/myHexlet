// Реализуйте код, вызывающий сервис и печатающий на экран ожидаемую строку. Для извлечения города из аргументов командной строки, 
// воспользуйтесь свойством argv глобального объекта process. 
// Первый аргумент (передаваемое имя города) находится под индексом 2. Посмотреть описание и пример можно в документации.

import axios from 'axios';
import WeatherService from '../WeatherService.js';

const city = process.argv[2];
const weather = new WeatherService(axios, city);
const response = await weather.get();
const { temperature } = JSON.parse(response.data);
console.log(`Temperature in ${city}: ${temperature}C`);

/* __tests__ */

import { execSync } from 'child_process';
import { URL } from 'url';
import path from 'path';

const dirname = path.dirname(new URL(import.meta.url).pathname);
const binPath = path.join(dirname, '..', 'bin/weather.js');

test('berlin', () => {
  const expected = expect.stringMatching(/Temperature in berlin: \d+C/);
  const actual = execSync(`node ${binPath} berlin`).toString();
  expect(actual).toEqual(expected);
});

test('monaco', () => {
  const expected = expect.stringMatching(/Temperature in monaco: \d+C/);
  const actual = execSync(`node ${binPath} monaco`).toString();
  expect(actual).toEqual(expected);
});
