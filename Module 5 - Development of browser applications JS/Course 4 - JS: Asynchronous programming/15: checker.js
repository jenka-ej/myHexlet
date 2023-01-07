// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход ссылку на страницу какого-то сайта, загружает содержимое этой страницы, 
// извлекает из него ссылки и проверяет их доступность. Функция должна вернуть список битых ссылок.

import { URL } from 'url';
import axios from 'axios';

const extractLinks = (content) => {
  const host = 'http://localhost:8080';
  const linkRx = /href="(.+?)"/ig;
  const results = content.matchAll(linkRx);
  return Array.from(results).map((r) => r[1])
    .map((rawLink) => new URL(rawLink, host).toString());
};

const getBadLinks = async (url) => {
  const response = await axios.get(url);
  const links = extractLinks(response.data);
  const fn = (link) => axios.get(link).then(() => null).catch(() => link);
  const mapped = await Promise.all(links.map((link) => fn(link)));
  return mapped.filter((badUrl) => badUrl !== null);
};
export default getBadLinks;

/* __tests__ */

import getBadLinks from '../checker.js';

test('/', async () => {
  const url = 'http://localhost:8080';
  const links = await getBadLinks(url);
  const expected = [
    'http://localhost:8080/second',
  ];
  expect(links.sort()).toEqual(expected.sort());
});

test('/first', async () => {
  const url = 'http://localhost:8080/first';
  const links = await getBadLinks(url);
  const expected = [
    'http://localhost:8080/pages/products',
    'http://localhost:8080/pages/reports',
    'http://localhost:8080/pages/users',
  ];
  expect(links.sort()).toEqual(expected.sort());
});
