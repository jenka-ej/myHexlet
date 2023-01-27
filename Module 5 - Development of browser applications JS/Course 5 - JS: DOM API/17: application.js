// Задача этого упражнения состоит в том, чтобы реализовать автокомплит. На странице присутствуют элементы input, 
// с атрибутами data-autocomplete и data-autocomplete-name, к которым нужно привязаться. 
// Атрибут data-autocomplete содержит ссылку, по которой нужно делать запрос на данные. 
// Атрибут data-autocomplete-name содержит имя, по которому необходимо найти на странице список ul с точно таким же атрибутом и значением. 
// В этом списке выводятся данные.

// При изменении строки в поле ввода (ввод символов или их удаление), необходимо выполнить запрос на сервер с query-параметром search, 
// значением которого будет строка введенная в input. Сервер возвращает массив из стран (на английском языке).

// Если этот массив не пустой, то нужно заполнить список (посмотреть его нахождение можно либо через public/index.html либо открыв исходный код страницы в веб доступе) 
// таким образом:
// <ul data-autocomplete-name="country">
//   <li>pakistan</li>
//   <li>panama</li>
//   <li>paraguay</li>
// </ul>

// Если с сервера пришел пустой список, то нужно вывести:
// <ul data-autocomplete-name="country">
//   <li>Nothing</li>
// </ul>

import 'whatwg-fetch';

export default () => {
  const inputForms = document.querySelectorAll('.ml-2');
  inputForms.forEach((inputForm) => {
    inputForm.addEventListener('input', async (e) => {
      const mainURL = window.location.origin;
      const query = e.target.dataset.autocomplete;
      const nameForSearch = e.target.value;
      const url = new URL(query, mainURL);
      url.searchParams.append('search', nameForSearch);
      const response = await fetch(url);
      const matches = await response.json();
      const listElement = inputForm.closest('.row').querySelector('ul');
      const options = matches.length === 0 ? ['Nothing'] : matches;
      const liElements = options.map((el) => `<li>${el}</li>`).join('\n');
      listElement.innerHTML = liElements;
    });
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import nock from 'nock';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen, waitFor, within } = testingLibraryDom;
const getElement = {
  capitalTextBox: () => screen.getByRole('textbox', { name: 'Capital' }),
  countryTextBox: () => screen.getByRole('textbox', { name: 'Country' }),
  capitalList: () => screen.getByRole('list', { name: 'Capital' }),
  countryList: () => screen.getByRole('list', { name: 'Country' }),
};

nock.disableNetConnect();

const scope = nock(/.*/).get(/(capitals|countries)\.json\?search=.*/);

const mockFetch = (data) => scope.reply(() => [200, JSON.stringify(data)]);

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('Capital', async () => {
  let response;

  response = mockFetch([]);
  await userEvent.type(getElement.capitalTextBox(), 'x');
  await waitFor(() => {
    response.done();
    const autoCompleteResult = getElement.capitalList();
    expect(autoCompleteResult).toHaveTextContent('Nothing');

    const { getAllByRole } = within(autoCompleteResult);
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });

  response = mockFetch([]);
  await userEvent.type(getElement.capitalTextBox(), '{backspace}');
  expect(getElement.capitalTextBox()).not.toHaveValue();
  await waitFor(() => {
    response.done();
    const autoCompleteResult = getElement.capitalList();
    expect(autoCompleteResult).toHaveTextContent('Nothing');

    const { getAllByRole } = within(autoCompleteResult);
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });

  const list1 = ['mariehamn', 'manama', 'minsk', 'moroni'];
  response = mockFetch(list1);
  await userEvent.type(getElement.capitalTextBox(), 'm');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.capitalList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(list1);
  });

  const list2 = ['moroni', 'monrovia', 'monaco', 'moscow'];
  response = mockFetch(list2);
  await userEvent.type(getElement.capitalTextBox(), 'o');
  expect(getElement.capitalTextBox()).toHaveValue('mo');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.capitalList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(list2);
  });

  const list3 = ['moscow'];
  response = mockFetch(list3);
  await userEvent.type(getElement.capitalTextBox(), 's');
  expect(getElement.capitalTextBox()).toHaveValue('mos');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.capitalList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(list3);
  });
});

test('Country', async () => {
  let response;

  response = mockFetch([]);
  await userEvent.type(getElement.countryTextBox(), 'r');
  await waitFor(() => {
    response.done();
    const autoCompleteResult = getElement.countryList();
    expect(autoCompleteResult).toHaveTextContent('Nothing');

    const { getAllByRole } = within(autoCompleteResult);
    const items = getAllByRole('listitem');
    expect(items).toHaveLength(1);
  });

  const list1 = ['russia'];
  response = mockFetch(list1);
  await userEvent.type(getElement.countryTextBox(), 'u');
  expect(getElement.countryTextBox()).toHaveValue('ru');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.countryList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(list1);
  });

  response = mockFetch([]);
  await userEvent.type(getElement.countryTextBox(), 'c');
  expect(getElement.countryTextBox()).toHaveValue('ruc');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.countryList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(['Nothing']);
  });

  const list2 = ['russia'];
  response = mockFetch(list2);
  await userEvent.type(getElement.countryTextBox(), '{backspace}');
  expect(getElement.countryTextBox()).toHaveValue('ru');
  await waitFor(() => {
    response.done();
    const { getAllByRole } = within(getElement.countryList());
    const items = getAllByRole('listitem');

    const list = items.map((item) => item.textContent);
    expect(list).toEqual(list2);
  });
});

test('Not mutated another list', async () => {
  const countryList = ['russia', 'romania'];
  const response1 = mockFetch(countryList);
  await userEvent.type(getElement.countryTextBox(), 'r');
  await waitFor(() => {
    response1.done();
    const { getAllByRole } = within(getElement.capitalList());
    const items = getAllByRole('listitem');
    const list = items.map((item) => item.textContent);
    expect(list).toEqual(['Nothing']);
  });

  const capitalList = ['mariehamn', 'manama', 'minsk', 'moroni'];
  const response2 = mockFetch(capitalList);
  getElement.capitalTextBox().focus();
  await userEvent.type(getElement.capitalTextBox(), 'm');
  await waitFor(() => {
    response2.done();
    const { getAllByRole } = within(getElement.countryList());
    const items = getAllByRole('listitem');
    const list = items.map((item) => item.textContent);
    expect(list).toEqual(countryList);
  });

  await waitFor(() => {
    const { getAllByRole } = within(getElement.capitalList());
    const items = getAllByRole('listitem');
    const list = items.map((item) => item.textContent);
    expect(list).toEqual(capitalList);
  });
});
