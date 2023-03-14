// В этом задании нужно протестировать такую же функцию getUserMainLanguage(user), но используя не инверсию зависимостей, а манки патчинг через библиотеку nock.

/* functions.js */

import _ from 'lodash';
import octokitRest from '@octokit/rest';

const { Octokit } = octokitRest;

const getUserMainLanguage = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username });
  if (data.length === 0) {
    return null;
  }
  const languages = data.map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = _.get(acc, `${name}.count`, 0) + 1;
      return { ...acc, [name]: { count, name } };
    }, {});
  const { name } = _.maxBy(Object.values(languages), (lang) => lang.count);
  return name;
};

const wrong1 = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username });
  if (data.length === 0) {
    return '';
  }
  const languages = data.map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = _.get(acc, `${name}.count`, 0) + 1;
      return { ...acc, [name]: { count, name } };
    }, {});
  const { name } = _.maxBy(Object.values(languages), (lang) => lang.count);
  return name;
};

const wrong2 = async (username, client = new Octokit()) => {
  const { data } = await client.repos.listForUser({ username });
  if (data.length === 0) {
    return null;
  }
  const languages = data.map((repo) => repo.language)
    .reduce((acc, name) => {
      const count = _.get(acc, `${name}.count`, 0) + 1;
      return { ...acc, [name]: { count, name } };
    }, {});
  const { name } = _.minBy(Object.values(languages), (lang) => lang.count);
  return name;
};

const functions = {
  right1: getUserMainLanguage,
  wrong1,
  wrong2,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import nock from 'nock';
import getFunction from '../functions.js';

const getUserMainLanguage = getFunction();

nock.disableNetConnect();

test('correct', async () => {
  nock(/api\.github\.com/)
    .get(/\/users\/jenka-ej\/repos/)
    .reply(200, [{ language: 'javascript' }, { language: 'php' }, { language: 'javascript' }]);

  const mainLanguage = await getUserMainLanguage('jenka-ej');
  expect(mainLanguage).toEqual('javascript');
});

test('null', async () => {
  nock(/api\.github\.com/)
    .get(/\/users\/jenka-ej\/repos/)
    .reply(200, []);

  const mainLanguage = await getUserMainLanguage('jenka-ej');
  expect(mainLanguage).toEqual(null);
});
