// Добавьте компонент Factorial, который принимает функцию подсчета факториала getFactorial и значение, которое нужно вычислить с помощью этой функции value.
// Компонент должен вызывать функцию, передавая в нее значение value и отображать результат в виде строки. Например:
// Factorial of 5 is 120
// Создайте в компоненте App мемоизированную версию функции getFactorial и передайте ее в компонент Factorial.
// Мемоизируйте компонент Factorial, чтобы он не рендерился, когда это не нужно, например, при изменении языка.

import React, { useState, useCallback, memo } from 'react';
import { useTranslation } from 'react-i18next';

const Factorial = memo(function ({ number, getFactorial }) {
  const result = getFactorial(number);
  return (
    <div>{`Factorial of ${number} is ${result}`}</div>
  );
});

const App = () => {
  const { t, i18n } = useTranslation();
  const [value, setValue] = useState(0);
  const handleLangSwitch = (e) => {
    const lang = e.target.dataset.testid;
    i18n.changeLanguage(lang);
  };

  const factorialFunc = (number) => number <= 0 ? 1 : number * factorialFunc(number - 1);

  const getFactorial = useCallback(factorialFunc, []);

  const getClassName = (currLang) => {
    const className = i18n.language === currLang ? 'btn btn-primary' : 'btn btn-outline-primary';
    return className;
  };

  return (
    <div className="App">
      <div className="btn-group mb-3" role="group">
        <button
          type="button"
          data-testid="en"
          className={getClassName('en')}
          onClick={handleLangSwitch}
        >
          {t('languages.en')}
        </button>
        <button
          type="button"
          data-testid="ru"
          className={getClassName('ru')}
          onClick={handleLangSwitch}
        >
          {t('languages.ru')}
        </button>
      </div>
      <br />
      <div className="btn-group mb-3" role="group">
        <button className="btn btn-outline-primary" onClick={() => setValue(1)}>{`${t('factorial')} 1`}</button>
        <button className="btn btn-outline-primary" onClick={() => setValue(5)}>{`${t('factorial')} 5`}</button>
        <button className="btn btn-outline-primary" onClick={() => setValue(10)}>{`${t('factorial')} 10`}</button>
        <button className="btn btn-outline-primary" onClick={() => setValue(20)}>{`${t('factorial')} 20`}</button>
      </div>
      <Factorial number={value} getFactorial={getFactorial} />
    </div>
  );
};

export default App;

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import App from './App.jsx';
import resources from './locales/index';

const i18n = i18next.createInstance();
const options = {
  resources,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
};

i18n
  .use(initReactI18next)
  .init(options);

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);

/* __tests__ */

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:8080');
});

test('i18n', async ({ page }) => {
  await page.locator('button', { hasText: /^Factorial 1$/ }).click();
  await expect(await page.locator('text=Factorial of 1 is 1')).toHaveCount(1);

  await page.locator('button', { hasText: /^Factorial 5$/ }).click();
  await expect(await page.locator('text=Factorial of 5 is 120')).toHaveCount(1);

  await page.locator('button', { hasText: /^Factorial 10$/ }).click();
  await expect(await page.locator('text=Factorial of 10 is 3628800')).toHaveCount(1);

  await page.locator('button', { hasText: /^Factorial 20$/ }).click();
  await expect(await page.locator('text=Factorial of 20 is 2432902008176640000')).toHaveCount(1);

  await page.locator('button', { hasText: /^Русский$/ }).click();
  await page.locator('button', { hasText: /^Факториал 10$/ }).click();
  await expect(await page.locator('text=Factorial of 10 is 3628800')).toHaveCount(1);
});
