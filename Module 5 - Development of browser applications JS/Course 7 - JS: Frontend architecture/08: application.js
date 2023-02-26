// Бутстрап позволяет использовать списки для отображения контента при клике по элементу. 
// В этом задании такие группы списков уже подготовлены, вам предстоит только добавить функционал переключения.
// Реализуйте логику переключения табов для компонента list-group бутстрапа, используя архитектуру MVC.

// Активный элемент списка получает класс active, а контент, соответствующий ему, получает классы active show

// <div class="row">
//   <div class="col-4">
//     <div class="list-group" id="list-tab" role="tablist">
//       <a class="list-group-item list-group-item-action active" id="list-home-list" data-bs-toggle="list" href="#list-home" role="tab" aria-controls="list-home">Home</a>
//       <a class="list-group-item list-group-item-action" id="list-profile-list" data-bs-toggle="list" href="#list-profile" role="tab" aria-controls="list-profile">Profile</a>
//     </div>
//   </div>
//   <div class="col-8">
//     <div class="tab-content" id="nav-tabContent">
//       <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">Home Content</div>
//       <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">Profile Content</div>
//     </div>
//   </div>
// </div>

// Код должен работать даже в том случае, если на странице есть несколько компонентов list-group.

import onChange from 'on-change';

export default () => {
  const mainState = {
    ui: {
      active: 'javascript',
    },
  };

  const secondaryState = {
    ui: {
      active: 'javascript',
    },
  };

  const mainRender = (path, value, previousValue) => {
    const previousMainTab = document.querySelector(`#list-${previousValue}-list`);
    const previousMainContent = document.querySelector(`#list-${previousValue}`);
    const actualMainTab = document.querySelector(`#list-${value}-list`);
    const actualMainContent = document.querySelector(`#list-${value}`);
    previousMainTab.classList.remove('active');
    previousMainContent.classList.remove('active');
    previousMainContent.classList.remove('show');
    actualMainTab.classList.add('active');
    actualMainContent.classList.add('active');
    actualMainContent.classList.add('show');
  };

  const secondaryRender = (path, value, previousValue) => {
    const previousSecondaryTab = document.querySelector(`#secondary-${previousValue}-list`);
    const previousSecondaryContent = document.querySelector(`#secondary-${previousValue}`);
    const actualSecondaryTab = document.querySelector(`#secondary-${value}-list`);
    const actualSecondaryContent = document.querySelector(`#secondary-${value}`);
    previousSecondaryTab.classList.remove('active');
    previousSecondaryContent.classList.remove('active');
    previousSecondaryContent.classList.remove('show');
    actualSecondaryTab.classList.add('active');
    actualSecondaryContent.classList.add('active');
    actualSecondaryContent.classList.add('show');
  };

  const watchedMainState = onChange(mainState, mainRender);
  const watchedSecondaryState = onChange(secondaryState, secondaryRender);

  const buttons = document.querySelectorAll('.list-group-item');
  buttons.forEach((button) => button.addEventListener('click', (e) => {
    const name = e.target.textContent.trim().toLowerCase();
    if (e.target.classList.contains('list-group-item-action')) {
      watchedSecondaryState.ui.active = name;
    } else {
      watchedMainState.ui.active = name;
    }
  }));
};

/* __tests__ */

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import userEvent from '@testing-library/user-event';
import testingLibrary from '@testing-library/dom';
import run from '../src/application.js';

const { screen } = testingLibrary;

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const getFormattedHTML = () => prettier.format(document.body.innerHTML, options);

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('#application1', async () => {
  expect(getFormattedHTML()).toMatchSnapshot();

  const javascriptTab = await screen.getByTestId('javascript-main-tab');
  const pythonTab = await screen.getByTestId('python-main-tab');

  await userEvent.click(pythonTab);
  expect(getFormattedHTML()).toMatchSnapshot();

  await userEvent.click(javascriptTab);
  expect(getFormattedHTML()).toMatchSnapshot();

  await userEvent.click(pythonTab);
  expect(getFormattedHTML()).toMatchSnapshot();
});

test('#application2', async () => {
  expect(getFormattedHTML()).toMatchSnapshot();

  const javascriptTab = await screen.getByTestId('javascript-secondary-tab');
  const pythonTab = await screen.getByTestId('python-secondary-tab');

  await userEvent.click(pythonTab);
  expect(getFormattedHTML()).toMatchSnapshot();

  await userEvent.click(javascriptTab);
  expect(getFormattedHTML()).toMatchSnapshot();

  await userEvent.click(pythonTab);
  expect(getFormattedHTML()).toMatchSnapshot();
});

test('#application3', () => {
  expect(getFormattedHTML()).toMatchSnapshot();
});
