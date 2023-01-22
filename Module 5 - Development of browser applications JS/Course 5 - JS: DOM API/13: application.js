// Реализуйте логику переключения табов.
// По клику на таб происходит следующее:
// 1) Класс active снимается с текущего элемента меню и активного блока с данными
// 2) Класс active добавляется табу, по которому кликнули и соответствующему блоку с данными
// 3) Сопоставление таба и блока данных идёт по идентификатору, который прописывается в атрибут data-bs-target табов. По клику на таб, код должен извлечь id, 
// найти соответствующий элемент и сделать его активным, не забыв при этом снять класс active с таба и блока, которые были активными до клика.
// Постройте свою логику так, чтобы она позволила использовать на одной странице любое количество компонентов nav.

export default () => {
  const activeElements = document.querySelectorAll('.nav-link');
  activeElements.forEach((element) => {
    element.addEventListener('click', () => {
      const closest = element.closest('.nav');
      const activeCloseElement = closest.querySelector('.active');

      const dataActiveCloseElement = document.querySelector(activeCloseElement.dataset.bsTarget);
      const newDataActiveCloseElement = document.querySelector(element.dataset.bsTarget);

      activeCloseElement.classList.remove('active');
      dataActiveCloseElement.classList.remove('active');
      element.classList.add('active');
      newDataActiveCloseElement.classList.add('active');
    });
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
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('user tabs', async () => {
  const userSettingsTab1 = screen.getByRole('tab', { name: 'User settings' });
  const userSettingsContentTab1 = screen.getByText('User settings tab');
  expect(userSettingsTab1).not.toHaveClass('active');
  expect(userSettingsContentTab1).not.toHaveClass('active');

  await userEvent.click(userSettingsTab1);
  const userHomeTab2 = screen.getByRole('tab', { name: 'User home' });
  const userSettingsTab2 = screen.getByRole('tab', { name: 'User settings' });
  expect(userHomeTab2).not.toHaveClass('active');
  expect(userSettingsTab2).toHaveClass('active');

  const userHomeContentTab1 = screen.getByText('User home tab');
  expect(userHomeContentTab1).not.toHaveClass('active');
  const userSettingsContentTab2 = screen.getByText('User settings tab');
  expect(userSettingsContentTab2).toHaveClass('active');
});

test('app tabs', async () => {
  const appSettingsTab1 = screen.getByRole('tab', { name: 'Messages settings' });
  const appSettingsContentTab1 = screen.getByText('Messages settings tab');
  expect(appSettingsTab1).not.toHaveClass('active');
  expect(appSettingsContentTab1).not.toHaveClass('active');

  await userEvent.click(appSettingsTab1);
  const appSettingsTab2 = screen.getByRole('tab', { name: 'Messages settings' });
  const appSettingsContentTab2 = screen.getByText('Messages settings tab');
  expect(appSettingsTab2).toHaveClass('active');
  expect(appSettingsContentTab2).toHaveClass('active');

  const appMessagesTab1 = screen.getByRole('tab', { name: 'Messages' });
  const appMessagesContentTab1 = screen.getByText('Messages tab');
  expect(appMessagesTab1).not.toHaveClass('active');
  expect(appMessagesContentTab1).not.toHaveClass('active');
});

test('user tabs after app', async () => {
  const userSettingsTab1 = screen.getByRole('tab', { name: 'User settings' });
  const userSettingsContentTab1 = screen.getByText('User settings tab');
  expect(userSettingsTab1).toHaveClass('active');
  expect(userSettingsContentTab1).toHaveClass('active');

  await userEvent.click(userSettingsTab1);
  const userSettingsTab2 = screen.getByRole('tab', { name: 'User settings' });
  const userSettingsContentTab2 = screen.getByText('User settings tab');
  expect(userSettingsTab2).toHaveClass('active');
  expect(userSettingsContentTab2).toHaveClass('active');

  const userProfileTab1 = screen.getByRole('tab', { name: 'User profile' });
  const userProfileContentTab1 = screen.getByText('User profile tab');
  expect(userProfileTab1).not.toHaveClass('active');
  expect(userProfileContentTab1).not.toHaveClass('active');

  await userEvent.click(userProfileTab1);
  const userProfileTab2 = screen.getByRole('tab', { name: 'User profile' });
  const userProfileContentTab2 = screen.getByText('User profile tab');
  expect(userProfileTab2).toHaveClass('active');
  expect(userProfileContentTab2).toHaveClass('active');

  const userSettingsTab3 = screen.getByRole('tab', { name: 'User settings' });
  const userSettingsContentTab3 = screen.getByText('User settings tab');
  expect(userSettingsTab3).not.toHaveClass('active');
  expect(userSettingsContentTab3).not.toHaveClass('active');
});

test('app tabs after user', async () => {
  const appSettingsTab1 = screen.getByRole('tab', { name: 'Messages settings' });
  const appSettingsContentTab1 = screen.getByText('Messages settings tab');
  expect(appSettingsTab1).toHaveClass('active');
  expect(appSettingsContentTab1).toHaveClass('active');

  const appMessagesTab2 = screen.getByRole('tab', { name: 'Messages' });
  await userEvent.click(appMessagesTab2);
  const appSettingsTab2 = screen.getByRole('tab', { name: 'Messages settings' });
  const appSettingsContentTab2 = screen.getByText('Messages settings tab');
  expect(appSettingsTab2).not.toHaveClass('active');
  expect(appSettingsContentTab2).not.toHaveClass('active');

  const appMessagesTab3 = screen.getByRole('tab', { name: 'Messages' });
  const appMessagesContentTab3 = screen.getByText('Messages tab');
  expect(appMessagesTab3).toHaveClass('active');
  expect(appMessagesContentTab3).toHaveClass('active');
});
