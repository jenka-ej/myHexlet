// В задании дана форма обратной связи, состоящая из трех полей: email, name и comment. Напишите и экспортируйте функцию по умолчанию, 
// которая при отправке формы получает из неё данные и экранирует их. Когда форма заполнена и "отправлена" (нажата кнопка send), 
// то вместо формы появляется документ с такой структурой (элемент формы заменяется на другой элемент):
// <div>
//   <p>Feedback has been sent</p>
//   <div>Email: test@email.com</div>
//   <div>Name: Matz</div>
//   <div>Comment: My Comment</div>
// </div>

export default () => {
  const mainDiv = document.createElement('div');
  mainDiv.innerHTML = '<p>Feedback has been sent</p>';
  const sendButton = document.querySelector('.feedback-form');
  sendButton.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const entries = [...formData.entries()];
    entries.map((entrie) => {
      const [key, value] = entrie;
      const div = document.createElement('div');
      div.textContent = `${key[0].toUpperCase() + key.substring(1)}: ${value}`;
      mainDiv.append(div);
      return null;
    });
    document.querySelector('.feedback-form').replaceWith(mainDiv);
  });
};

/* index.js */

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';

import app from './application.js';

app();

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import { htmlEscape } from 'escape-goat';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application 1', async () => {
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const emailField = screen.getByRole('textbox', { name: 'Email' });
  const nameField = screen.getByRole('textbox', { name: 'Name' });
  await userEvent.type(emailField, 'a@b.c');
  await userEvent.type(nameField, 'Toto');
  await userEvent.click(sendButton);

  const sendText = screen.getByText('Feedback has been sent');
  const emailText = screen.getByText('Email: a@b.c');
  const nameText = screen.getByText('Name: Toto');

  expect(sendText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
  expect(nameText.outerHTML).toEqual('<div>Name: Toto</div>');
});

test('application 2', async () => {
  const sendButton = screen.getByRole('button', { name: 'Send' });
  const emailField = screen.getByRole('textbox', { name: 'Email' });
  const nameField = screen.getByRole('textbox', { name: 'Name' });
  const commentField = screen.getByRole('textbox', { name: 'Comment' });
  await userEvent.type(emailField, 'toto@hexlet.io');
  await userEvent.type(nameField, 'Toto Robbins');
  await userEvent.type(commentField, 'If you <i>can</i> do, you <b>must</b> do');
  await userEvent.click(sendButton);

  const sendText = screen.getByText('Feedback has been sent');
  const commentText = screen.getByText(/Comment.*/);

  expect(sendText).toBeInTheDocument();
  expect(commentText).toBeInTheDocument();
  expect(commentText.outerHTML).toEqual(`<div>Comment: ${htmlEscape('If you <i>can</i> do, you <b>must</b> do')}</div>`);
});
