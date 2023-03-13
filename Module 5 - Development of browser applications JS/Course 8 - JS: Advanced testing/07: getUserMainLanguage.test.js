// Протестируйте функцию getUserMainLanguage(username, client), которая определяет язык на котором пользователь создал больше всего репозиториев. 
// Для реализации этой задачи, функция getUserMainLanguage() выполняет запрос через @octokit/rest, 
// который извлекает все репозитории указанного пользователя (по первому параметру username). 
// Каждый репозиторий в этом списке содержит указание основного языка репозитория. 
// Эта информация используется для поиска того языка, который используется чаще. Если список репозиториев пуст, функция возвращает null.

// Пример:

// Запрос который выполняет функция getUserMainLanguage
// Именно этот метод нужно будет подменить в фейковом клиенте

// const { data } = await client.repos.listForUser({ username });
// data – список репозиториев. У каждого репозитория может быть много полей
// но нас интересует ровно одно – language
// Эти данные нужно подготовить в тестах для фейкового клиента
// console.log(data);
// [{ language: 'php', ... }, { language: 'javascript', ... }, ...]

// support/OctokitFake.js
// Реализуйте фейковый клиент по такому же принципу как это было сделано в теории. Используйте этот клиент в тестах для подмены.

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
  return getUserMainLanguage(username, client);
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
  right: getUserMainLanguage,
  wrong1,
  wrong2,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right';
  return functions[name];
};

/* OctokitFake.js */

export default class OctokitFake {
  constructor(data) {
    this.data = data;
  }

  repos = {
    listForUser: () => Promise.resolve({ data: this.data }),
  };
}

/* __tests__ */

import OctokitFake from '../support/OctokitFake.js';
import getFunction from '../functions.js';

const getUserMainLanguage = getFunction();

test('getUserMainLanguage', async () => {
  const fakeData = [{ language: 'php' }, { language: 'javascript' }, { language: 'java' }, { language: 'javascript' }];
  const client = new OctokitFake(fakeData);
  const username = 'jenka-ej';
  const mainLanguages = await getUserMainLanguage(username, client);
  expect(mainLanguages).toEqual('javascript');
});

test('null', async () => {
  const fakeData = [];
  const client = new OctokitFake(fakeData);
  const username = 'jenka-ej';
  const mainLanguages = await getUserMainLanguage(username, client);
  expect(mainLanguages).toEqual(null);
});
