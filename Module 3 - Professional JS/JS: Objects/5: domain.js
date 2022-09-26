const getDomainInfo = (url) => {
  if (!url.includes('http')) {
    return {
      scheme: 'http',
      name: url,
    };
  }
  return {
    scheme: url.split('://')[0],
    name: url.split('://')[1],
  };
};
export default getDomainInfo;

/* __tests__ */

import getDomainInfo from '../domain.js';

it('getDomainInfo', () => {
  const expected1 = {
    scheme: 'http',
    name: 'yandex.ru',
  };
  expect(getDomainInfo('yandex.ru')).toEqual(expected1);

  const expected2 = {
    scheme: 'https',
    name: 'hexlet.io',
  };
  expect(getDomainInfo('https://hexlet.io')).toEqual(expected2);

  const expected3 = {
    scheme: 'http',
    name: 'google.com',
  };
  expect(getDomainInfo('http://google.com')).toEqual(expected3);
});
