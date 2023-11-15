// Реализуйте и экспортируйте по умолчанию функцию, которая обновляет query string в переданном адресе в соответствии с указанными значениями.

// Функция принимает на вход два параметра:
// 1) адрес, который может содержать query string
// 2) объект с параметрами, которые нужно проставить в query string

// import solution from './solution';
// const address = 'https://amazon.com/search?page=10&per=5';
// const actual = solution(address, { page: 100, per: 8, order: 'desc' });
// https://amazon.com/search?page=100&per=8&order=desc

// Как видно параметры могут встречаться одновременно и в адресе, и в объекте.

// const address = 'https://amazon.com/search?page=10&per=5';
// const actual = solution(address, { order: 'desc', per: null });
// // https://amazon.com/search?page=10&order=desc

// Правила подстановки следующие:
// 1) Если параметра не было, то он добавляется
// 2) Если параметр уже был, то его значение заменяется тем, которое передано в объекте
// 3) Если значение параметра null, то сам параметр должен отсутствовать в адресе, даже если он там был

export default function solution(mainUrl, queryParams = {}) {
  const url = new URL(mainUrl);
  Object.entries(queryParams).forEach(([key, value]) => {
    if (queryParams[key] === null) {
      url.searchParams.delete(key);
    } else {
      url.searchParams.set(key, value);
    }
  });
  return url.toString();
}

/* __tests__ */

import solution from '../solution.js';

describe('MergeParams', () => {
  it('without params 1', () => {
    const address = 'https://ru.hexlet.io/';
    const actual = solution(address);
    expect(actual).toBe(address);
  });

  it('without params 2', () => {
    const address = 'https://yandex.com/?page=10&per=5';
    const actual = solution(address);
    expect(actual).toBe(address);
  });

  it('add and update params', () => {
    const address = 'https://amazon.com/search?page=10&per=5';
    const actual = solution(address, {
      page: 100,
      per: 8,
      order: 'desc',
      hidden: false,
    });
    expect(actual).toBe('https://amazon.com/search?page=100&per=8&order=desc&hidden=false');
  });

  it('removes params with `null` value', () => {
    const address = 'https://amazon.com/search?page=10&per=5';
    const actual = solution(address, { order: 'desc', per: null, unknown: null });
    expect(actual).toBe('https://amazon.com/search?page=10&order=desc');
  });
});
