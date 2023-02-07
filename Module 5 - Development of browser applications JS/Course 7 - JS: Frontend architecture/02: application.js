// В этом задании необходимо реализовать простой калькулятор, который умеет только складывать. Но делает это для любого количества чисел, а не только двух.
// Реализуйте и экспортируйте по умолчанию функцию, реализующую приложение "суммирующий калькулятор".
// Калькулятор представляет из себя одно поле для ввода чисел и две кнопки: сложение и сброс.
// Под калькулятором выводится текущая сумма, которая изначально равна нулю. Каждое нажатие кнопки plus добавляет к этой сумме введенное значение. 
// Нажатие кнопки сброс возвращает состояние к первоначальному (сумма устанавливается в 0).
// Сделайте калькулятор дружественным пользователю: 
// 1) Устанавливайте фокус на поле для ввода при каждой отрисовке формы (включая первую).
// 2) Очищайте форму после отправки/очистки.

export default () => {
  let sum = 0;
  const result = document.querySelector('#result');
  const mainForm = document.querySelector('.form-inline');
  const inputForm = document.querySelector('.form-control');
  inputForm.focus();
  const plusHandle = (e) => {
    e.preventDefault();
    sum += parseInt(inputForm.value, 10);
    mainForm.reset();
    result.textContent = sum;
    inputForm.focus();
  };
  const resetHandle = (e) => {
    sum = 0;
    mainForm.reset();
    result.textContent = sum;
    inputForm.focus();
    e.preventDefault();
  };
  const plusButton = document.querySelector('.btn-primary');
  plusButton.addEventListener('click', plusHandle);
  const resetButton = document.querySelector('.btn-outline-primary');
  resetButton.addEventListener('click', resetHandle);
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom, { fireEvent } from '@testing-library/dom';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('working process 1', async () => {
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');
  const reset = screen.getByRole('button', { name: /reset/i });
  const result = document.getElementById('result');
  expect(input).toHaveFocus();
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '3' } });
  await fireEvent.click(submit);
  expect(input).toHaveFocus();
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);

  await fireEvent.change(input, { target: { value: '10' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^13$/);

  await fireEvent.change(input, { target: { value: '7' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^20$/);

  await fireEvent.click(reset);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '10' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^10$/);

  await fireEvent.change(input, { target: { value: '7' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^17$/);
});

test('working process 2', async () => {
  const result = document.getElementById('result');
  const submit = screen.getByRole('button', { name: /plus/i });
  const input = screen.getByRole('spinbutton');

  expect(input).toHaveFocus();
  expect(result).toHaveTextContent(/^0$/);

  await fireEvent.change(input, { target: { value: '3' } });
  await fireEvent.click(submit);
  expect(input).toHaveValue(null);
  expect(result).toHaveTextContent(/^3$/);
});
