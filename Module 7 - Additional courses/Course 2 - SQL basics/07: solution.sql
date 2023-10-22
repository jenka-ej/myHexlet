/* Представьте, что вы работаете в интернет-магазине. Раньше пользователи могли не указывать номер телефона при регистрации,
но теперь политика сайта изменилась — номер телефона должен быть у всех.

Нам нужно предупредить клиентов об этих изменениях — отправить письмо всем, у кого не заполнен номер телефона.
Для этого нужно найти имена и адреса электронной почты всех таких пользователей.

Составьте запрос, который извлекает из таблицы users данные о пользователях, у которых не заполнен номер телефона (поле phone_number).
Для этого нужно извлечь два поля:
1) first_name — имя
2) email — электронная почта */

SELECT
    first_name,
    email
FROM users
WHERE phone_number IS NULL;

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
(1, 'Toddie', 'Lamp', 'tlamp0@google.cn', '+55-544-156-3886'),
(2, 'Gilli', 'Giannoni', 'ggiannoni1@networkadvertising.org', null),
(3, 'Kyle', 'Karle', 'kkarle2@squidoo.com', null),
(4, 'Dag', 'Shardlow', 'dshardlow3@github.com', null),
(5, 'Manfred', 'Cano', 'mcano4@nba.com', '+689-389-150-8462'),
(6, 'Corette', 'Emmer', 'cemmer5@t-online.de', '+689-123-150-3476'),
(7, 'Mercie', 'Damarell', 'mdamarell6@ow.ly', null),
(8, 'Antonius', 'Swinbourne', 'aswinbourne7@acquirethisname.com', '+86-965-702-4848'),
(9, 'Madelena', 'Petley', 'mpetley8@biblegateway.com', null),
(10, 'Tuesday', 'Brougham', 'tbrougham9@facebook.com', '+689-389-150-8434');

/* __fixtures__/expected.json */

[
  {
    "first_name": "Gilli",
    "email": "ggiannoni1@networkadvertising.org"
  },
  {
    "first_name": "Kyle",
    "email": "kkarle2@squidoo.com"
  },
  {
    "first_name": "Dag",
    "email": "dshardlow3@github.com"
  },
  {
    "first_name": "Mercie",
    "email": "mdamarell6@ow.ly"
  },
  {
    "first_name": "Madelena",
    "email": "mpetley8@biblegateway.com"
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
