// В этом упражнении вам предстоит запрограммировать мультиязычный счётчик нажатий, состоящий из переключателя языка, кнопки с числом кликов и кнопки сброса счётчика. 
// Начальное состояние:

// <div class="btn-group" role="group">
//     <button type="button" class="btn mb-3 btn-primary">English</button>
//     <button type="button" class="btn mb-3 btn-outline-primary">Русский</button>
// </div>
// <button type="button" class="btn btn-info mb-3 align-self-center">0 clicks</button>
// <button type="button" class="btn btn-warning">Reset</button>

// После двух нажатий по кнопке с классом btn-info и нажатия на кнопку переключения на русский язык:

// <div class="btn-group" role="group">
//     <button type="button" class="btn mb-3 btn-outline-primary">English</button>
//     <button type="button" class="btn mb-3 btn-primary">Русский</button>
// </div>
// <button type="button" class="btn btn-info mb-3 align-self-center">2 клика</button>
// <button type="button" class="btn btn-warning">Сбросить</button>

// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику: работу кнопок счётчика, переключение языка. 
// Тексты должны подставляться через библиотеку i18next.
// Реализуйте тексты для англоязычной версии приложения.
// Реализуйте тексты для русскоязычной версии приложения.

/* en.js */

export default {
  translation: {
    keyWithCount_one: '{{count}} click',
    keyWithCount_other: '{{count}} clicks',
    reset: 'Reset',
  },
};

/* ru.js */

export default {
  translation: {
    keyWithCount_zero: '{{count}} кликов',
    keyWithCount_one: '{{count}} клик',
    keyWithCount_few: '{{count}} клика',
    keyWithCount_many: '{{count}} кликов',
    reset: 'Сбросить',
  },
};

/* application.js */

import i18n from 'i18next';
import onChange from 'on-change';
import resources from './locales/index.js';

const { en } = resources;
const { ru } = resources;

const app = (i18nextInstance) => {
  const state = {
    counter: 0,
    currentLanguage: 'en',
  };

  const mainContainer = document.querySelector('body > div');

  const startPage = () => {
    const div = document.createElement('div');
    div.classList.add('btn-group', 'align-self-center');
    div.setAttribute('role', 'group');

    const firstButton = document.createElement('button');
    firstButton.setAttribute('type', 'button');
    firstButton.classList.add('btn', 'mb-3', 'btn-primary');
    firstButton.textContent = 'English';

    const secondButton = document.createElement('button');
    secondButton.setAttribute('type', 'button');
    secondButton.classList.add('btn', 'mb-3', 'btn-outline-primary');
    secondButton.textContent = 'Русский';
    div.append(firstButton, secondButton);
    mainContainer.append(div);

    const thirdButton = document.createElement('button');
    thirdButton.setAttribute('type', 'button');
    thirdButton.classList.add('btn', 'btn-info', 'mb-3', 'align-self-center');
    thirdButton.textContent = i18nextInstance.t('keyWithCount', { count: state.counter });

    const fourthButton = document.createElement('button');
    fourthButton.setAttribute('type', 'button');
    fourthButton.classList.add('btn', 'btn-warning');
    fourthButton.textContent = i18nextInstance.t('reset');
    mainContainer.append(thirdButton, fourthButton);
  };
  startPage();

  const clickButton = document.querySelector('.btn-info');
  const resetButton = document.querySelector('.btn-warning');

  const render = () => {
    clickButton.textContent = i18nextInstance.t('keyWithCount', { count: state.counter });
  };

  const watchedState = onChange(state, render);

  clickButton.addEventListener('click', (eventForClick) => {
    eventForClick.preventDefault();
    watchedState.counter += 1;
  });

  resetButton.addEventListener('click', (eventForReset) => {
    eventForReset.preventDefault();
    watchedState.counter = 0;
  });

  const enButton = document.querySelector('.btn-primary');
  const ruButton = document.querySelector('.btn-outline-primary');

  enButton.addEventListener('click', (eventRuToEn) => {
    eventRuToEn.preventDefault();
    if (eventRuToEn.target.classList.contains('btn-outline-primary')) {
      eventRuToEn.target.classList.remove('btn-outline-primary');
      eventRuToEn.target.classList.add('btn-primary');
      ruButton.classList.remove('btn-primary');
      ruButton.classList.add('btn-outline-primary');
      i18nextInstance.changeLanguage('en', (err, t) => {
        if (err) {
          return err;
        }
        return t('key');
      });
      resetButton.textContent = i18nextInstance.t('reset');
      watchedState.currentLanguage = 'en';
    }
  });

  ruButton.addEventListener('click', (eventEnToRu) => {
    eventEnToRu.preventDefault();
    if (eventEnToRu.target.classList.contains('btn-outline-primary')) {
      eventEnToRu.target.classList.remove('btn-outline-primary');
      eventEnToRu.target.classList.add('btn-primary');
      enButton.classList.remove('btn-primary');
      enButton.classList.add('btn-outline-primary');
      i18nextInstance.changeLanguage('ru', (err, t) => {
        if (err) {
          return err;
        }
        return t('key');
      });
      resetButton.textContent = i18nextInstance.t('reset');
      watchedState.currentLanguage = 'ru';
    }
  });
};

const runApp = async () => {
  const i18nextInstance = await i18n.createInstance();
  await i18nextInstance.init({
    lng: 'en',
    debug: true,
    resources: {
      en, ru,
    },
  }, (err, t) => {
    if (err) {
      return err;
    }
    return t('key');
  });

  app(i18nextInstance);
};

export default runApp;

/* __tests__ */

import fs from 'fs';
import path from 'path';
import testingLibrary from '@testing-library/dom';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import run from '../src/application.js';

const { screen } = testingLibrary;

const getFixture = (filename) => fs.readFileSync(path.join('__fixtures__', filename)).toString();

beforeEach(async () => {
  const initHtml = getFixture('index.html');
  document.body.innerHTML = initHtml;
  await run();
});

test('i18n', async () => {
  expect(screen.getByRole('button', { name: /0 clicks/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /русский/i }));
  expect(await screen.findByRole('button', { name: /0 кликов/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /сбросить/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /english/i }));
  expect(await screen.findByRole('button', { name: /0 clicks/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
});

test('plurals', async () => {
  await userEvent.click(screen.getByRole('button', { name: /0 clicks/i }));
  expect(screen.getByRole('button', { name: /1 click/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /1 click/i }));
  expect(screen.getByRole('button', { name: /2 clicks/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /русский/i }));
  expect(await screen.findByRole('button', { name: /2 клика/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /2 клика/i }));
  await userEvent.click(screen.getByRole('button', { name: /3 клика/i }));
  await userEvent.click(screen.getByRole('button', { name: /4 клика/i }));
  await userEvent.click(screen.getByRole('button', { name: /5 кликов/i }));
  await userEvent.click(screen.getByRole('button', { name: /сбросить/i }));
  await userEvent.click(screen.getByRole('button', { name: /0 кликов/i }));
  expect(screen.getByRole('button', { name: /1 клик/i })).toBeInTheDocument();
  await userEvent.click(screen.getByRole('button', { name: /english/i }));
  expect(await screen.findByRole('button', { name: /1 click/i })).toBeInTheDocument();
});
