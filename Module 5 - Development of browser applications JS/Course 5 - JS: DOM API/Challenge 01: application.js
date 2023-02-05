// Реализуйте и экспортируйте по умолчанию функцию, которая отвечает за показ модальных окон:
// 1) Кнопки модальных окон определяются по селектору data-toggle="modal".
// 2) Идентификатор самого окна хранится в аттрибуте data-target кнопки.
// 3) Чтобы окно всплыло, необходимо в элемент с id из data-target добавить класс show и стиль display выставить в block.
// 4) За скрытие модального окна отвечает крестик доступный по селектору data-dismiss="modal" внутри модального окна. 
// 5) Нажатие на кнопку приводит к обратному эффекту, удаляется класс show, а display выставляется в none.

export default () => {
  const buttons = document.querySelectorAll('[data-toggle="modal"]');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const modal = document.querySelector(e.target.dataset.target);
      modal.classList.add('show');
      modal.style.display = 'block';
      const closeButton = modal.querySelector('[data-dismiss="modal"]');
      closeButton.addEventListener('click', () => {
        modal.classList.remove('show');
        modal.style.display = 'none';
      });
    });
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen, within } = testingLibraryDom;
const getElement = {
  openButton: (n) => screen.getByRole('button', { name: `Launch demo modal ${n}` }),
  modal: (n) => document.querySelector(`#exampleModal${n}`),
  closeButton: (modal) => within(modal).getByText('×'),
};

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('Modal 1', async () => {
  await userEvent.click(getElement.openButton(1));
  let modal1 = getElement.modal(1);
  const modal2 = getElement.modal(2);
  expect(modal2).not.toHaveClass('show');
  expect(modal1).toHaveClass('show');
  expect(modal1).toHaveStyle('display: block');

  await userEvent.click(getElement.closeButton(modal1));
  modal1 = getElement.modal(1);
  expect(modal1).not.toHaveClass('show');
  expect(modal1).toHaveStyle('display: none');
});

test('Modal 2', async () => {
  await userEvent.click(getElement.openButton(2));
  const modal1 = getElement.modal(1);
  let modal2 = getElement.modal(2);
  expect(modal1).not.toHaveClass('show');
  expect(modal2).toHaveClass('show');
  expect(modal2).toHaveStyle('display: block');

  await userEvent.click(getElement.closeButton(modal2));
  modal2 = getElement.modal(1);
  expect(modal2).not.toHaveClass('show');
  expect(modal2).toHaveStyle('display: none');
});

test('Click another button', async () => {
  await userEvent.click(getElement.openButton(1));
  const modal2 = getElement.modal(2);

  await userEvent.click(getElement.closeButton(modal2));
  const modal1 = getElement.modal(1);
  expect(modal1).toHaveClass('show');
  expect(modal1).toHaveStyle('display: block');
  await userEvent.click(getElement.closeButton(modal1));
});

test('Modal 2 again', async () => {
  await userEvent.click(getElement.openButton(2));
  const modal1 = getElement.modal(1);
  let modal2 = getElement.modal(2);
  expect(modal1).not.toHaveClass('show');
  expect(modal2).toHaveClass('show');
  expect(modal2).toHaveStyle('display: block');

  await userEvent.click(getElement.closeButton(modal2));
  modal2 = getElement.modal(1);
  expect(modal2).not.toHaveClass('show');
  expect(modal2).toHaveStyle('display: none');
});
