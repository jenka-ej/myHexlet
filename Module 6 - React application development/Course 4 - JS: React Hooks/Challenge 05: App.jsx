// В этом испытании вам предстоит запрограммировать мультиязычный счётчик нажатий, состоящий из переключателя языка, кнопки с числом кликов и 
// кнопки сброса счётчика.
// Это испытание сделано по мотивам упражнения в курсе Архитектура фронтенда, только теперь поставленную задачу нужно будет решить с помощью Реакта.

// Начальное состояние:
// <div class="btn-group" role="group">
//     <button type="button" class="btn mb-3 btn-primary" data-testid='en'>English</button>
//     <button type="button" class="btn mb-3 btn-outline-primary" data-testid='ru'>Русский</button>
// </div>
// <button type="button" class="btn btn-info mb-3 align-self-center" data-testid='counter'>0 clicks</button>
// <button type="button" class="btn btn-warning" data-testid='reset'>Reset</button>

// После двух нажатий по кнопке с классом btn-info и нажатия на кнопку переключения на русский язык:
// <div class="btn-group" role="group">
//     <button type="button" class="btn mb-3 btn-outline-primary" data-testid='en'>English</button>
//     <button type="button" class="btn mb-3 btn-primary" data-testid='ru'>Русский</button>
// </div>
// <button type="button" class="btn btn-info mb-3 align-self-center" data-testid='counter'>2 клика</button>
// <button type="button" class="btn btn-warning" data-testid='reset'>Сбросить</button>

// Создайте экземпляр i18next и сконфигурируйте его. Если переводы на языке пользователя отсутствуют, то языком по умолчанию установите en.
// Реализуйте компонент, который содержит всю необходимую логику: работу кнопок счётчика, переключение языка. 
// Подстановка текстов и переключение должно происходить с помощью библиотеки react-i18next.
// Реализуйте тексты для англоязычной версии приложения.
// Реализуйте тексты для русскоязычной версии приложения.

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation();
  const handleLangSwitch = (e) => {
    const lang = e.target.dataset.testid;
    i18n.changeLanguage(lang);
  };
  const btnClass = (buttonValue) => {
    return i18n.language === buttonValue ? "btn mb-3 btn-primary" : "btn mb-3 btn-outline-primary";
  };

  const [click, setClick] = useState({ count: 0 });
  const clickPlus = () => setClick(({ count }) => ({ count: count + 1 }));
  const clickReset = () => setClick(() => ({ count: 0 }));

  return (
    <div className="container-fluid">
      <div className="card p-3 m-3 w-25">
        <div className="btn-group" role="group">
          <button type="button" className={btnClass('ru')} data-testid='ru' onClick={handleLangSwitch}>{t('languages.ru')}</button>
          <button type="button" className={btnClass('en')} data-testid='en' onClick={handleLangSwitch}>{t('languages.en')}</button>
        </div>
        <button type="button" className="btn btn-info mb-3 align-self-center" data-testid='counter' onClick={clickPlus}>{t('buttons.keyWithCount', click)}</button>
        <button type="button" className="btn btn-warning" data-testid='reset' onClick={clickReset}>{t('buttons.reset')}</button>
      </div>
    </div>
  )
};

export default App;

/* init.jsx */

import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from './locales/index';
import App from './App';

const init = () => {
  i18next
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
  return <App />;
};

export default init;

/* locales/index.js */

import ru from './ru.js';
import en from './en.js';

const locales = { en, ru };

export default locales;

/* locales/en.js */

const en = {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    buttons: {
      keyWithCount_one: '{{count}} click',
      keyWithCount_other: '{{count}} clicks',
      reset: 'Reset',
    },
  },
};

export default en;

/* locales/ru.js */

const ru = {
  translation: {
    languages: {
      en: 'English',
      ru: 'Русский',
    },
    buttons: {
      keyWithCount_zero: '{{count}} кликов',
      keyWithCount_one: '{{count}} клик',
      keyWithCount_few: '{{count}} клика',
      keyWithCount_many: '{{count}} кликов',
      reset: 'Сбросить',
    },
  },
};

export default ru;

/* index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';

import init from './init';

const app = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const vdom = init();
  root.render(
    <React.StrictMode>
      {vdom}
    </React.StrictMode>,
  );
};

app();

/* __tests__ */

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test('i18n', async ({ page }) => {
  await expect(page.getByRole('button', { name: /0 clicks/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /reset/i })).toBeVisible();
  await page.getByTestId('ru').click();
  await expect(page.getByTestId('counter')).toContainText('0 кликов');
  await expect(page.getByTestId('reset')).toContainText('Сбросить');
  await page.getByTestId('en').click();
  await expect(page.getByTestId('counter')).toContainText('0 clicks');
  await expect(page.getByTestId('reset')).toContainText('Reset');
});

test('plurals', async ({ page }) => {
  await page.getByTestId('counter').click();
  await expect(page.getByTestId('counter')).toContainText('1 click');
  await page.getByTestId('counter').click();
  await expect(page.getByTestId('counter')).toContainText('2 clicks');
  await page.getByTestId('ru').click();
  await expect(page.getByRole('button', { name: /2 клика/i })).toBeVisible();
  await page.getByRole('button', { name: /2 клика/i }).click();
  await page.getByRole('button', { name: /3 клика/i }).click();
  await page.getByRole('button', { name: /4 клика/i }).click();
  await page.getByRole('button', { name: /5 кликов/i }).click();
  await page.getByTestId('reset').click();
  await page.getByRole('button', { name: /0 кликов/i }).click();
  await expect(page.getByRole('button', { name: /1 клик/i })).toBeVisible();
  await page.getByTestId('en').click();
  await expect(page.getByRole('button', { name: /1 click/i })).toBeVisible();
});
