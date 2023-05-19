// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список емейлов, а возвращает количество емейлов, расположенных на каждом бесплатном домене. 
// Список бесплатных доменов хранится в константе freeEmailDomains.

import get from 'lodash/get.js';

const freeEmailDomains = [
  'gmail.com',
  'yandex.ru',
  'hotmail.com',
  'yahoo.com',
];

const getFreeDomainsCount = (emails) => emails
  .map((email) => {
    const [, domain] = email.split('@');
    return domain;
  })
  .filter((domain) => freeEmailDomains.includes(domain))
  .reduce((acc, domain) => {
    const count = get(acc, domain, 0) + 1;
    return { ...acc, [domain]: count };
  }, {});

export default getFreeDomainsCount;

/* __tests__ */

import getFreeDomainsCount from '../emails.js';

describe('getFreeDomainsCount', () => {
  it('should be empty', () => {
    expect(getFreeDomainsCount([])).toEqual({});
  });

  it('should be equal', () => {
    const emails = [
      'info@gmail.com',
      'info@yandex.ru',
      'info@hotmail.com',
      'mk@host.com',
      'support@hexlet.io',
      'key@yandex.ru',
      'sergey@gmail.com',
      'vovan@gmail.com',
      'vovan@hotmail.com',
      'ivan@yahoo.com',
    ];

    const expected = {
      'gmail.com': 3,
      'yandex.ru': 2,
      'hotmail.com': 2,
      'yahoo.com': 1,
    };

    expect(getFreeDomainsCount(emails)).toEqual(expected);
  });

  it('should not contains yahoo', () => {
    const emails = [
      'info@yandex.ru',
      'mk@host.com',
      'support@hexlet.io',
      'sergey@gmail.com',
      'vovan@gmail.com',
      'vovan@hotmail.com',
    ];

    const expected = {
      'gmail.com': 2,
      'yandex.ru': 1,
      'hotmail.com': 1,
    };

    expect(getFreeDomainsCount(emails)).toEqual(expected);
  });
});
