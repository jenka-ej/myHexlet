// Реализуйте и экспортируйте по умолчанию функцию normalize() которая принимает на вход список городов и стран, нормализует их имена, 
// сортирует города и группирует их по стране.

export default function normalize(coll) {
  const mappedColl = coll.map((obj) => {
    const keys = Object.keys(obj);
    return keys.reduce((acc, key) => {
      acc[key] = obj[key].toLowerCase().trim();
      return acc;
    }, {});
  });
  const compare = (a, b) => {
    if (a.country > b.country) {
      return 1;
    }
    if (a.country < b.country) {
      return -1;
    }
    return 0;
  };
  const sortedColl = mappedColl.sort(compare);
  const reducedColl = sortedColl.reduce((acc, obj) => {
    const { name, country } = obj;
    if (acc[country] !== undefined) {
      if (acc[country].includes(name)) {
        return acc;
      }
      acc[country].push(name);
      acc[country].sort();
      return acc;
    }
    acc[country] = [name];
    return acc;
  }, {});
  return reducedColl;
}

/* __tests__ */

import normalize from '../solution.js';

test('#1 normalize', () => {
  const raw = [
    { name: 'istanbul', country: 'turkey' },
    { name: 'Moscow ', country: ' Russia' },
    { name: 'iStanbul', country: 'tUrkey' },
    { name: 'antalia', country: 'turkeY ' },
    { name: 'samarA', country: '  ruSsiA' },
    { name: 'Miami', country: 'usa' },
  ];

  const expected = {
    russia: [
      'moscow',
      'samara',
    ],
    turkey: [
      'antalia',
      'istanbul',
    ],
    usa: [
      'miami',
    ],
  };

  const actual = normalize(raw);
  expect(actual).toEqual(expected);
});

test('#2 normalize', () => {
  const raw = [
    {
      name: 'pariS ',
      country: ' france',
    },
    {
      name: ' madrid',
      country: ' sPain',
    },
    {
      name: 'valencia',
      country: 'spain',
    },
    {
      name: 'marcel',
      country: 'france',
    },
    {
      name: ' madrid',
      country: ' sPain',
    },
  ];

  const expected = {
    france: [
      'marcel',
      'paris',
    ],
    spain: [
      'madrid',
      'valencia',
    ],
  };

  const actual = normalize(raw);
  expect(actual).toEqual(expected);
});
