// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список тегов (только <a>, <link> и <img>) и возвращает список ссылок, 
// извлеченных из этих тегов.

import { map } from '@hexlet/pairs-data';
import { getAttribute } from './tags.js';

// Code version #1

const extract = (list) => (map((unit) => {
  if (getAttribute('href', unit) !== undefined) {
    return getAttribute('href', unit);
  }
  return getAttribute('src', unit);
}, list));

export default extract;

// Code version #2

import { map } from '@hexlet/pairs-data';
import { getAttribute, getName } from './tags.js';

const mapping = {
  a: (t) => getAttribute('href', t),
  img: (t) => getAttribute('src', t),
  link: (t) => getAttribute('href', t),
};

export default (tags) => map((tag) => mapping[getName(tag)](tag), tags);

/* __tests__ */

import { l, toString } from '@hexlet/pairs-data';
import { make } from '../tags.js';
import extract from '../extract.js';

test('extract 1', () => {
  expect(extract(l())).toBe(l());
  const tags1 = l(
    make('a', { href: '/about', title: 'about company' }),
    make('img', { src: '/avatar.jpeg', alt: 'my avatar' }),
    make('link', { href: '/favicon.ico', 'data-test': 'custom attribute' }),
  );
  const expected1 = l('/about', '/avatar.jpeg', '/favicon.ico');
  expect(toString(extract(tags1))).toBe(toString(expected1));

  const tags2 = l(
    make('img', { src: '/he.jpg', alt: 'hello' }),
    make('a', { href: '/about' }),
    make('img', { src: '/she.jpg', style: 'width: 80%' }),
  );
  const expected2 = l('/he.jpg', '/about', '/she.jpg');
  expect(toString(extract(tags2))).toBe(toString(expected2));
});
