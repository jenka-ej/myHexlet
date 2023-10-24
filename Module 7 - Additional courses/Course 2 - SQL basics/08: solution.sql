/* В этом упражнении вам предстоит найти всех пользователей, которые зарегистрировались с определенного почтового домена.

Составьте запрос, который извлекает из таблицы users имя (поле first_name), фамилию (поле last_name) и электронную почту (поле email).
Нужно извлечь данные о пользователях, которые указали при регистрации почту с доменом google.com. */

SELECT
    first_name,
    last_name,
    email
FROM users
WHERE LOWER(email) LIKE '%google.com';

/* init.sql */

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id bigint,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    phone_number varchar(255)
);

INSERT INTO users (id, first_name, last_name, email, phone_number) VALUES
(1, 'Toddie', 'Lamp', 'tlamp0@google.com', '+55-544-156-3886'),
(2, 'Gilli', 'Giannoni', 'ggiannoni1@google.org', null),
(3, 'Kyle', 'Karle', 'kkarle2@squidoo.com', null),
(4, 'Dag', 'Shardlow', 'dshardlow3@github.com', null),
(5, 'Manfred', 'Cano', 'mcano4@google.com', '+689-389-150-8462'),
(6, 'Corette', 'Emmer', 'cemmer5@t-online.de', '+689-123-150-3476'),
(7, 'Mercie', 'Damarell', 'mdamarell6@ow.ly', null),
(8, 'Antonius', 'Swinbourne', 'aswinbourne7@google.com', '+86-965-702-4848'),
(9, 'Madelena', 'Petley', 'mpetley8@biblegateway.com', null),
(10, 'Tuesday', 'Brougham', 'tbrougham9@facebook.com', '+689-389-150-8434');

/* __fixtures__/expected.json */

[
  {
    "first_name": "Toddie",
    "last_name": "Lamp",
    "email": "tlamp0@google.com"
  },
  {
    "first_name": "Manfred",
    "last_name": "Cano",
    "email": "mcano4@google.com"
  },
  {
    "first_name": "Antonius",
    "last_name": "Swinbourne",
    "email": "aswinbourne7@google.com"
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
