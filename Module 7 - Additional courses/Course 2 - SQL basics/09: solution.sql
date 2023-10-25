/* В нашей базе данных для каждого сотрудника компании указан внутренний номер телефона. Внутренний номер должен состоять ровно из трех цифр.
В этом упражнении вам предстоит найти всех пользователей, у которых неверно указан внутренний номер телефона

Составьте запрос, который извлекает из таблицы users имя (поле first_name) и адрес электронной почты (поле email) пользователей,
у которых некорректно указан внутренний номер телефона (поле telephone).
Считаем, что правильные номера телефона содержат три любые цифры, все остальные номера являются некорректными */

SELECT
    first_name,
    email
FROM users
WHERE telephone NOT SIMILAR TO '[0-9]{3}';

/* init.sql */

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id bigint,
    first_name varchar(255),
    last_name varchar(255),
    email varchar(255),
    telephone varchar(255)
);

INSERT INTO users (id, first_name, last_name, email, telephone) VALUES
(1, 'Toddie', 'Lamp', 'tlamp0@google.com', '197'),
(2, 'Gilli', 'Giannoni', 'ggiannoni1@google.org', '934'),
(3, 'Kyle', 'Karle', 'kkarle2@squidoo.com', '045'),
(4, 'Dag', 'Shardlow', 'dshardlow3@github.com', '19'),
(5, 'Manfred', 'Cano', 'mcano4@google.com', '995'),
(6, 'Corette', 'Emmer', 'cemmer5@t-online.de', '99541'),
(7, 'Mercie', 'Damarell', 'mdamarell6@ow.ly', '381'),
(8, 'Antonius', 'Swinbourne', 'aswinbourne7@google.com', '90r');

/* __fixtures__/expected.json */

[
  {
    "first_name": "Dag",
    "email": "dshardlow3@github.com"
  },
  {
    "first_name": "Corette",
    "email": "cemmer5@t-online.de"
  },
  {
    "first_name": "Antonius",
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
