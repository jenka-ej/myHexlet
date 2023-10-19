/* В этом задании вам предстоит попрактиковаться в работе с языком SQL – пройти путь от добавления данных в таблицу до их удаления. Все запросы нужно записывать в файл, указанный в заголовке.
Система проверки сама их выполнит внутри базы данных и проверит результат выполнения.

Запишите в файл следующие три запроса:
1) Запрос, который добавляет в таблицу users пользователя Gregory с почтой gregory@google.com
2) Запрос, который изменяет адрес электронной почты у пользователя John на johny@hotmail.com
3) Запрос, который удаляет из таблицы users пользователя с именем Alex */

INSERT INTO users (first_name, email) VALUES ('Gregory', 'gregory@google.com');
UPDATE users SET email = 'johny@hotmail.com' WHERE first_name = 'John';
DELETE FROM users WHERE first_name = 'Alex';

/* init.sql */

DROP TABLE IF EXISTS users;
CREATE TABLE users (
    first_name varchar(255),
    email varchar(255)
);

INSERT INTO users (first_name, email) VALUES
('John', 'john@mail.com'),
('Alex', 'alexx@google.com'),
('Ann', 'ann@yahoo.com');

/* __tests__ */

import fs from 'fs/promises';
import knex from 'knex';

let client;

beforeAll(async () => {
  const connection = {
    host: '/var/run/postgresql',
  };
  client = knex({ client: 'pg', connection });
  // client.on('query', console.log);
});

test('solution', async () => {
  const initSql = await fs.readFile('init.sql', 'utf-8');
  const sql = await fs.readFile('solution.sql', 'utf-8');
  await client.raw(initSql);
  try {
    await client.transaction(async (trx) => {
      await trx.raw(sql);

      const gregory = await trx.from('users').where({ email: 'gregory@google.com' }).first();
      expect(gregory).toMatchObject({ first_name: 'Gregory', email: 'gregory@google.com' });

      const john = await trx.from('users').where({ first_name: 'John' }).first();
      expect(john).toMatchObject({ first_name: 'John', email: 'johny@hotmail.com' });

      const alex = await trx.from('users').where({ first_name: 'Alex' }).first();
      expect(alex).toBeUndefined();

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
