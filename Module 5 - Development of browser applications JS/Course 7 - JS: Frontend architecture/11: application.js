// Добавьте в функцию инициализацию состояния и экземпляра i18next.

// Вторым параметром функция принимает начальное состояние. Если передан не пустой объект, то значения его существующих свойств должны заменить значения в состоянии. 
// Те свойства, которые переданы не были, должны быть заполнены значениями по умолчанию:

// {
//   lng: 'en',
//   clicksCount: 0,
// }

// Проверьте что переключение одного счётчика не влияет на другой.

/* application.js */

import i18n from 'i18next';
import onChange from 'on-change';
import resources from './locales/index.js';

const languages = ['en', 'ru'];

const handleSwitchLanguage = (state) => (evt) => {
  const { lng } = evt.target.dataset;

  state.lng = lng;
};

const render = (container, watchedState, i18nInstance) => {
  const lngToggler = document.createElement('div');
  lngToggler.classList.add('btn-group');
  lngToggler.setAttribute('role', 'group');

  languages.forEach((lng) => {
    const btn = document.createElement('button');
    btn.setAttribute('type', 'button');
    const className = watchedState.lng === lng ? 'btn-primary' : 'btn-outline-primary';
    btn.classList.add('btn', 'mb-3', className);
    btn.setAttribute('data-lng', lng);
    btn.textContent = i18nInstance.t(`languages.${lng}`);
    btn.addEventListener('click', handleSwitchLanguage(watchedState));
    lngToggler.appendChild(btn);
  });

  const counter = document.createElement('button');
  counter.setAttribute('type', 'button');
  counter.classList.add('btn', 'btn-info', 'btn-lg', 'mb-3', 'align-self-center');
  counter.textContent = i18nInstance.t('buttons.counter.count', { count: watchedState.clicksCount });
  counter.addEventListener('click', () => {
    watchedState.clicksCount += 1;
  });

  const reset = document.createElement('button');
  reset.setAttribute('type', 'button');
  reset.classList.add('btn', 'btn-warning');
  reset.textContent = i18nInstance.t('buttons.reset');
  reset.addEventListener('click', () => {
    watchedState.clicksCount = 0;
  });

  container.innerHTML = '';
  container.append(lngToggler, counter, reset);
};

export default async (container, initialState = {}) => {
  const i18nInstance = i18n.createInstance();
  const { lng, clicksCount } = initialState;
  const resultLng = lng === undefined ? 'en' : lng;
  const resultClicksCount = clicksCount === undefined ? 0 : clicksCount;
  const state = {
    lng: resultLng,
    clicksCount: resultClicksCount,
  };
  await i18nInstance.init({
    lng: state.lng,
    resources,
  });

  const watchedState = onChange(state, (path, value) => {
    switch (path) {
      case 'lng': i18nInstance.changeLanguage(value).then(() => render(container, watchedState, i18nInstance));
        break;

      case 'clicksCount': render(container, watchedState, i18nInstance);
        break;

      default:
        break;
    }
  });

  render(container, watchedState, i18nInstance);
};

/* index.js */

import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import app from './application.js';

const preState = {
  lng: 'ru',
  clicksCount: 50,
};
app(document.querySelector('.container-1'), preState);
app(document.querySelector('.container-2'));

/* __tests__ */

import fs from 'fs';
import path from 'path';
import testingLibrary from '@testing-library/dom';
import '@testing-library/jest-dom';

import run from '../src/application.js';

const { screen, within } = testingLibrary;

const getFixture = (filename) => fs.readFileSync(path.join('__fixtures__', filename)).toString();

const initialData = [
  {
    containerName: 'container-1',
    state: { lng: 'ru', clicksCount: 99 },
    expectedState: { lng: 'ru', clicksCount: 99 },
    language: 'Русский',
    textButton: 'кликов',
  },
  {
    containerName: 'container-2',
    state: { lng: 'en' },
    expectedState: { lng: 'en', clicksCount: 0 },
    language: 'English',
    textButton: 'clicks',
  },
];

beforeAll(() => {
  const initHtml = getFixture('index.html');
  document.body.innerHTML = initHtml;
  initialData.forEach(async ({ containerName, state }) => {
    await run(screen.getByTestId(containerName), state);
  });
});

test.each(initialData)('language test', async (data) => {
  const {
    containerName,
    language,
    expectedState,
    textButton,
  } = data;
  const container = screen.getByTestId(containerName);
  expect(within(container).getByRole('button', { name: `${expectedState.clicksCount} ${textButton}` })).toBeInTheDocument();
  expect(within(container).getByRole('button', { name: language })).toHaveClass('btn-primary');
  const regexp = new RegExp(`^((?!${language}).)*$`);
  within(container).getAllByRole('button', { name: regexp }).forEach((button) => expect(button).not.toHaveClass('btn-primary'));
});
