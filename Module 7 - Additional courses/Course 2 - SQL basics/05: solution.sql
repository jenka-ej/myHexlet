/* Составьте запрос, который извлекает из таблицы companies:
1) company_name — названия компаний
2) url — адрес компаний в интернете */

SELECT
    company_name,
    url
FROM companies;

/* init.sql */

DROP TABLE IF EXISTS companies;
CREATE TABLE companies (
    id bigint,
    company_name varchar(255),
    phone varchar(255),
    url varchar(255)
);

INSERT INTO companies (id, company_name, phone, url) VALUES
(1, 'Gigazoom', '+389 (420) 676-1326', 'https://mozilla.org'),
(2, 'Twitterwire', '+970 (678) 891-4269', 'http://yahoo.com'),
(3, 'Cogibox', '+81 (315) 592-1839', 'http://sakura.ne.jp'),
(4, 'Twinder', '+370 (916) 707-7594', 'http://hostgator.com'),
(5, 'Vimbo', '+62 (237) 990-4645', 'http://xing.com');

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
