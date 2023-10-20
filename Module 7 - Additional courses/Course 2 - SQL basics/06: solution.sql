/* Составьте запрос, который извлекает из таблицы users данные о пользователях, рожденных не позже 1 января 2000 года. Нужны два поля:
1) first_name — имя
2) last_name — фамилия */

SELECT
    first_name,
    last_name
FROM users WHERE birthday <= '2000.01.01';

/* init.sql */

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id bigint,
    first_name varchar(255),
    last_name varchar(255),
    birthday date
);


INSERT INTO users (id, first_name, last_name, birthday) VALUES
(1, 'Winthrop', 'Roony', '2018-05-20'),
(2, 'Marjory', 'Collishaw', '2012-08-13'),
(3, 'Mellie', 'Grunder', '2009-12-10'),
(4, 'Ashely', 'Duffie', '2018-03-07'),
(5, 'Kiel', 'Runciman', '2002-05-25'),
(6, 'Sibby', 'Rankling', '1991-08-13'),
(7, 'Shae', 'Witchell', '2020-04-04'),
(8, 'Leeland', 'Whitnall', '2014-04-23'),
(9, 'Bee', 'Sandell', '1992-09-04'),
(10, 'Niall', 'Cornfoot', '2000-01-01');

/* __fixtures__/expected.json */

[
  {
    "first_name": "Sibby",
    "last_name": "Rankling"
  },
  {
    "first_name": "Bee",
    "last_name": "Sandell"
  },
  {
    "first_name": "Niall",
    "last_name": "Cornfoot"
  }
]

/* __tests__ */

import fs from 'fs/promises';
import knex from 'knex';
import expected from '../__fixtures__/expected.json';

let client;

beforeAll(async () => {
  const connection = {
    host: '/var/run/postgresql',
  };
  client = knex({ client: 'pg', connection });
});

test('solution', async () => {
  const sql = await fs.readFile('solution.sql', 'utf-8');
  try {
    await client.transaction(async (trx) => {
      const result = await trx.raw(sql);
      console.table(result.rows);
      expect(result.rows).toEqual(expected);

      throw new Error('ignore');
    });
  } catch (e) {
    if (!e.toString().match(/ignore/)) {
      throw e;
    }
  }
});

afterAll(async () => {
  await client.destroy();
});
