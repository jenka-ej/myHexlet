// Некоторые интерфейсы допускают редактирование "по месту" (in-place). 
// Это значит, что для обновления значений каких-то данных не нужно переходить на отдельную страницу редактирования, 
// достаточно кликнуть на сам элемент (или кнопку рядом с ним) как появится форма для изменения конкретно этого значения.

// В данной практике нужно построить именно такой интерфейс. Он работает по следующему принципу. 
// Контейнер внутри которого находятся данные для редактирования, помечается специальным аттрибутом: data-editable-target. 
// Значением этого атрибута является имя поля. В нашем примере это name и email (исходник доступен в public/index.html). Начальный HTML выглядит так:

// <div data-editable-target="name"><i>name</i></div>
// <div data-editable-target="email"><i>email</i></div>

// Когда происходит клик на этом элементе, то он заменяется на форму

// Пример формы для сохранения name:

// <div data-editable-target="name">
//   <form>
//     <!-- Лейбл привязывается к инпуту через аргумент for -->
//     <!-- Всегда полезно указывать лейблы для контроллеров. Благодаря им, различные системы находят элементы управления -->
//     <label class="sr-only" for="name">name</label>
//     <!-- С точки зрения хорошего UX нужно фокусироваться (это позволяет использовать клавиатуру сразу) на этом инпуте и выделять текст внутри него -->
//     <!-- Исключение составляет ситуация, когда поле пустое (но отражается текст выделенный курсивом как в примере выше) -->
//     <input type="text" id="name" name="name" value="">
//     <!-- Кнопка сабмита имеет текст "Save name" для сохранения имени. Для сохранения емейла должен быть текст "Save email" -->
//     <input type="submit" value="Save name">
//   </form>
// </div>

// Пример формы для сохранения email:

// <div data-editable-target="email">
//   <form>
//     <label class="sr-only" for="email">email</label>
//     <input type="text" id="email" name="email" value="">
//     <input type="submit" value="Save email">
//   </form>
// </div>

// Затем пользователь может изменить значение и сохранить его. Повторный клик снова открывает форму для редактирования, в которой окажется то значение, 
// которое вбил пользователь.

// Предположим что мы набрали значение "Cat". Тогда после отправки формы этот див станет таким:

// <div data-editable-target="name">
//   Cat
// </div>
// Если значение стирается, то тогда текст меняется на первоначальный (и добавляется курсив), такой какой он был до любых изменений:

// <div data-editable-target="name"><i>name</i></div>
// <div data-editable-target="email"><i>email</i></div>

// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику. По необходимости создайте дополнительные функции на уровне модуля.

export default () => {
  const condition = {
    name: {
      stat: 'default',
      lastName: '',
    },
    email: {
      stat: 'default',
      lastEmail: '',
    },
  };

  const nameForm = document.querySelector('[data-editable-target="name"]');
  const emailForm = document.querySelector('[data-editable-target="email"]');

  const renderName = (state) => {
    if (state.name.stat === 'filling') {
      state.name.lastName = '';
      const form = document.createElement('form');
      form.classList.add('nameForm');
      nameForm.append(form);
      const label = document.createElement('label');
      label.classList.add('sr-only');
      label.setAttribute('for', 'name');
      label.textContent = 'name';
      form.append(label);
      const input1 = document.createElement('input');
      input1.setAttribute('type', 'text');
      input1.setAttribute('id', 'name');
      input1.setAttribute('name', 'name');
      input1.setAttribute('value', state.name.lastName);
      form.append(input1);
      const input2 = document.createElement('input');
      input2.setAttribute('type', 'submit');
      input2.setAttribute('value', 'Save name');
      form.append(input2);
      input1.focus();
      input1.addEventListener('keyup', (e) => {
        state.name.lastName = e.target.value;
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.name.stat = 'default';
        renderName(state);
      });
    } else {
      if (document.querySelector('.nameForm')) {
        document.querySelector('.nameForm').remove();
      }
      if (state.name.lastName === '') {
        nameForm.innerHTML = '<i>name</i>';
      } else {
        nameForm.textContent = state.name.lastName;
      }
    }
  };

  const renderEmail = (state) => {
    if (state.email.stat === 'filling') {
      state.email.lastEmail = '';
      const form = document.createElement('form');
      form.classList.add('emailForm');
      emailForm.append(form);
      const label = document.createElement('label');
      label.classList.add('sr-only');
      label.setAttribute('for', 'email');
      label.textContent = 'email';
      form.append(label);
      const input1 = document.createElement('input');
      input1.setAttribute('type', 'text');
      input1.setAttribute('id', 'email');
      input1.setAttribute('name', 'email');
      input1.setAttribute('value', state.email.lastEmail);
      form.append(input1);
      const input2 = document.createElement('input');
      input2.setAttribute('type', 'submit');
      input2.setAttribute('value', 'Save email');
      form.append(input2);
      input1.focus();
      input1.addEventListener('keyup', (e) => {
        state.email.lastEmail = e.target.value;
      });
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        state.email.stat = 'default';
        renderEmail(state);
      });
    } else {
      if (document.querySelector('.emailForm')) {
        document.querySelector('.emailForm').remove();
      }
      if (state.email.lastEmail === '') {
        emailForm.innerHTML = '<i>email</i>';
      } else {
        emailForm.textContent = state.email.lastEmail;
      }
    }
  };

  nameForm.addEventListener('click', (e) => {
    if (condition.name.stat === 'default') {
      e.preventDefault();
      condition.name.stat = 'filling';
      renderName(condition);
    }
  }, true);

  emailForm.addEventListener('click', (e) => {
    if (condition.email.stat === 'default') {
      e.preventDefault();
      condition.email.stat = 'filling';
      renderEmail(condition);
    }
  }, true);
};

/* __tests__ */

import fs from 'fs';
import path from 'path';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import testingLibrary from '@testing-library/dom';
import run from '../src/application.js';

const { screen } = testingLibrary;

beforeEach(() => {
  const pathToFixture = path.join('__fixtures__', 'index.html');
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application 1', async () => {
  const name = document.querySelector('[data-editable-target="name"]');
  await name.click();
  expect(screen.getAllByRole('textbox')).toHaveLength(1);

  const inputName = screen.getByRole('textbox', { name: 'name' });
  await userEvent.type(inputName, 'Hexlet');
  const submitName = screen.getByRole('button');
  await userEvent.click(submitName);
  expect(inputName).not.toBeInTheDocument();

  const email = document.querySelector('[data-editable-target="email"]');
  await email.click();
  const inputEmail = screen.getByRole('textbox', { name: 'email' });

  await userEvent.type(inputEmail, 'support@hexlet.io');
  const submitEmail = screen.getByRole('button');
  await userEvent.click(submitEmail);
  expect(inputEmail).not.toBeInTheDocument();

  expect(screen.getByText('Hexlet')).toBeInTheDocument();
  expect(screen.getByText('support@hexlet.io')).toBeInTheDocument();
});

test('application 2', async () => {
  const name = document.querySelector('[data-editable-target="name"]');
  await name.click();
  expect(screen.getAllByRole('textbox')).toHaveLength(1);

  const inputName = screen.getByRole('textbox', { name: 'name' });
  await userEvent.type(inputName, 'Hexlet');
  const submitName = screen.getByRole('button', { name: 'Save name' });

  const email = document.querySelector('[data-editable-target="email"]');
  await email.click();
  const inputEmail = screen.getByRole('textbox', { name: 'email' });

  await userEvent.type(inputEmail, 'support@hexlet.io');
  const submitEmail = screen.getByRole('button', { name: 'Save email' });

  await userEvent.click(submitName);
  await userEvent.click(submitEmail);
  expect(inputName).not.toBeInTheDocument();
  expect(inputEmail).not.toBeInTheDocument();

  expect(screen.getByText('Hexlet')).toBeInTheDocument();
  expect(screen.getByText('support@hexlet.io')).toBeInTheDocument();

  await document.querySelector('[data-editable-target="email"]').click();
  await userEvent.clear(screen.getByRole('textbox', { name: 'email' }));

  await userEvent.click(screen.getByRole('button', { name: 'Save email' }));

  await document.querySelector('[data-editable-target="name"]').click();
  await userEvent.clear(screen.getByRole('textbox', { name: 'name' }));

  await userEvent.click(screen.getByRole('button', { name: 'Save name' }));

  expect(screen.getByText('name')).toBeInTheDocument();
  expect(screen.getByText('email')).toBeInTheDocument();
});
