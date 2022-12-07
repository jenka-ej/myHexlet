// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список книг, находит среди них невалидные и возвращает их наружу.

import yup from 'yup';

const genres = [
  'drama', 'horror', 'fantasy', 'classic',
];

export default function getInvalidBooks(books) {
  const mySchema = yup.object().shape({
    name: yup.string().required(),
    author: yup.string().required(),
    pagesCount: yup.number().positive().integer(),
    link: yup.string().min(1).url(),
    genre: yup.string().oneOf(genres),
  });
  return books.filter((book) => !mySchema.isValidSync(book));
}

/* __tests__ */

import getInvalidBooks from '../index.js';

const books1 = [
  {
    name: 'besi',
    author: 'dostoevski',
    pagesCount: 100,
    genre: 'drama',
    link: 'https://some.ru',
  },
  {
    name: 'book',
    author: 'author',
  },
  {
    name: 'book 2',
    author: 'author 2',
    genre: 'drama',
    pagesCount: '50 страниц', // должно быть числом
  },
  {
    name: 'book 3',
    author: 'author 3',
    genre: 'fantasy',
    pagesCount: -5, // должно быть положительным числом
  },
];

const books2 = [
  {
    name: 'besi',
    author: 'dostoevski',
    pagesCount: 100,
    genre: 'drama',
    link: 'верхняя правая полка', // должен быть url
  },
  {
    name: 'book 2',
    author: 'author 2',
  },
];

const books3 = [
  {
    name: 'besi',
    author: 'dostoevski',
    pagesCount: 100,
    genre: 'drama',
    link: 'https://some.ru',
  },
  {
    name: 'book',
    author: 'author',
    genre: 'fiction', // некорректный жанр
  },
  {
    name: 'book 2',
    author: 'author 2',
    genre: 'fantasy',
    pagesCount: 50,
  },
];

const books4 = [
  {
    name: 'besi',
    author: 'dostoevski',
    pagesCount: 100,
    genre: 'drama',
    link: 'https://some.ru',
  },
  {
    name: 'voina i mir',
    author: 'lev tolstoy',
    pagesCount: 1000,
    genre: 'drama',
    link: '', // не может быть пустой строкой
  },
];

const cases = [
  ['пустая библиотека', [], []],
  ['pagesCount не число или отрицательное', books1, [books1[2], books1[3]]],
  ['link не url', books2, [books2[0]]],
  ['жанр не из списка', books3, [books3[1]]],
  ['link пустая строка', books4, [books4[1]]],
  ['всё вместе',
    [].concat(books1, books2, books3),
    [].concat(books1[2], books1[3], books2[0], [books3[1]]),
  ],
];

test.each(cases)('case %#: %s', (_caseName, books, expected) => {
  expect(getInvalidBooks(books)).toEqual(expected);
});
