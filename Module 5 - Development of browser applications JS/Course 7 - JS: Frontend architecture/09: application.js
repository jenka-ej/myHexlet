// В этой задаче вам предстоит реализовать форму регистрации. Форма состоит из 4 полей (имя, email, пароль и его подтверждение). 
// Начальный HTML доступен в public/index.html.
// Форма должна быть контролируемой. Во время набора данных выполняется валидация сразу всех полей (для простоты). 
// Валидацию нужно построить на базе библиотеки yup. В коде уже описана вся нужная валидация. 
// Осталось только вызвать проверку и записать тексты ошибок в объект состояния.
// Кнопка отправки формы по умолчанию заблокирована. Она разблокируется когда валидна вся форма целиком и блокируется сразу, как только появляется невалидное значение.

// HTML когда введены неправильные email и password (один из возможных вариантов):

// <div data-container="sign-up">
//   <form data-form="sign-up" method="post">
//     <div class="form-group">
//       <label for="sign-up-name">Name</label>
//       <input id="sign-up-name" type="text" class="form-control" name="name">
//     </div>
//     <div class="form-group">
//       <label for="sign-up-email">Email<sup>*</sup></label>
//       <!-- Если поле невалидно, то добавляется класс is-invalid -->
//       <input id="sign-up-email" required="" type="email" class="form-control is-invalid" name="email"><div class="invalid-feedback">Value is not a valid email</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password">Password<sup>*</sup></label>
//       <input id="sign-up-password" required="" type="password" class="form-control is-invalid" name="password"><div class="invalid-feedback">Must be at least 6 letters</div>
//     </div>
//     <div class="form-group">
//       <label for="sign-up-password-confirmation">Password Confirmation<sup>*</sup></label>
//       <input id="sign-up-password-confirmation" required="" type="password" class="form-control" name="passwordConfirmation">
//     </div>
//     <input type="submit" class="btn btn-primary" value="Submit" disabled>
//   </form>
// </div>

// После того как все поля введены правильно, данные формы отправляются постом на урл /users. 
// Во время отправки кнопка отправки блокируется (во избежание двойной отправки).
// Когда форма отправлена, HTML меняется на следующий:

// <div data-container="sign-up">User Created!</div>

// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.

import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

// urls нельзя хардкодить: https://ru.hexlet.io/blog/posts/izbavlyaytes-ot-strok

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.

const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

export default async () => {
  const state = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  };

  const nameForm = document.querySelector('#sign-up-name');
  const emailForm = document.querySelector('#sign-up-email');
  const passwordForm = document.querySelector('#sign-up-password');
  const passwordConfirmationForm = document.querySelector('#sign-up-password-confirmation');
  const submitButton = document.querySelector('[value="Submit"]');
  const signForm = document.querySelector('[data-container="sign-up"]');

  const render = () => {
    const validName = !has(validate(state), 'name');
    if (validName) {
      if (nameForm.classList.contains('is-invalid')) {
        nameForm.nextElementSibling.remove();
        nameForm.classList.remove('is-invalid');
      }
    }
    if (!validName) {
      const { name } = validate(state);
      const errorName = name.toString().split(':')[1].trim();
      if (!nameForm.classList.contains('is-invalid')) {
        nameForm.classList.add('is-invalid');
        if (!nameForm.nextElementSibling) {
          const divName = document.createElement('div');
          divName.classList.add('invalid-feedback');
          divName.textContent = errorName;
          nameForm.parentNode.append(divName);
        } else {
          nameForm.parentNode.lastChild.textContent = errorName;
        }
      }
    }
    const validEmail = !has(validate(state), 'email');
    if (validEmail) {
      if (emailForm.classList.contains('is-invalid')) {
        emailForm.nextElementSibling.remove();
        emailForm.classList.remove('is-invalid');
      }
    }
    if (!validEmail) {
      const { email } = validate(state);
      const errorEmail = email.toString().split(':')[1].trim();
      if (!emailForm.classList.contains('is-invalid')) {
        emailForm.classList.add('is-invalid');
        if (!emailForm.nextElementSibling) {
          const divEmail = document.createElement('div');
          divEmail.classList.add('invalid-feedback');
          divEmail.textContent = errorEmail;
          emailForm.parentNode.append(divEmail);
        } else {
          emailForm.parentNode.lastChild.textContent = errorEmail;
        }
      }
    }
    const validPassword = !has(validate(state), 'password');
    if (validPassword) {
      if (passwordForm.classList.contains('is-invalid')) {
        passwordForm.nextElementSibling.remove();
        passwordForm.classList.remove('is-invalid');
      }
    }
    if (!validPassword) {
      const { password } = validate(state);
      const errorPassword = password.toString().split(':')[1].trim();
      if (!passwordForm.classList.contains('is-invalid')) {
        passwordForm.classList.add('is-invalid');
        if (!passwordForm.nextElementSibling) {
          const divPassword = document.createElement('div');
          divPassword.classList.add('invalid-feedback');
          divPassword.textContent = errorPassword;
          passwordForm.parentNode.append(divPassword);
        } else {
          passwordForm.parentNode.lastChild.textContent = errorPassword;
        }
      }
    }
    const validPasswordConfirmation = !has(validate(state), 'passwordConfirmation');
    if (validPasswordConfirmation) {
      if (passwordConfirmationForm.classList.contains('is-invalid')) {
        passwordConfirmationForm.nextElementSibling.remove();
        passwordConfirmationForm.classList.remove('is-invalid');
      }
    }
    if (!validPasswordConfirmation) {
      const { passwordConfirmation } = validate(state);
      const errorPasswordConfirmation = passwordConfirmation.toString().split(':')[1].trim();
      if (!passwordConfirmationForm.classList.contains('is-invalid')) {
        passwordConfirmationForm.classList.add('is-invalid');
        if (!passwordConfirmationForm.nextElementSibling) {
          const divPasswordConfirmation = document.createElement('div');
          divPasswordConfirmation.classList.add('invalid-feedback');
          divPasswordConfirmation.textContent = errorPasswordConfirmation;
          passwordConfirmationForm.parentNode.append(divPasswordConfirmation);
        } else {
          passwordConfirmationForm.parentNode.lastChild.textContent = errorPasswordConfirmation;
        }
      }
    }
    const invalidList = document.querySelectorAll('.is-invalid');
    if (invalidList.length === 0) {
      if (submitButton.hasAttribute('disabled')) {
        submitButton.removeAttribute('disabled');
      }
    }
    if (invalidList.length !== 0) {
      if (!submitButton.hasAttribute('disabled')) {
        submitButton.setAttribute('disabled', '');
      }
    }
  };

  const watchedState = onChange(state, render);

  nameForm.addEventListener('keyup', (eventName) => {
    eventName.preventDefault();
    const content = eventName.target.value;
    watchedState.name = content;
  });

  emailForm.addEventListener('keyup', (eventEmail) => {
    eventEmail.preventDefault();
    const content = eventEmail.target.value;
    watchedState.email = content;
  });

  passwordForm.addEventListener('keyup', (eventPassword) => {
    eventPassword.preventDefault();
    const content = eventPassword.target.value;
    watchedState.password = content;
  });

  passwordConfirmationForm.addEventListener('keyup', (eventPasswordConfirmation) => {
    eventPasswordConfirmation.preventDefault();
    const content = eventPasswordConfirmation.target.value;
    watchedState.passwordConfirmation = content;
  });

  submitButton.addEventListener('click', async (eventSubmit) => {
    eventSubmit.preventDefault();
    try {
      await axios({
        method: 'post',
        url: routes.usersPath(),
        data: state,
      });
      submitButton.setAttribute('disabled', '');
      signForm.innerHTML = 'User Created!';
      return null;
    } catch (error) {
      return errorMessages;
    }
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import testingLibrary from '@testing-library/dom';
import fs from 'fs';
import path from 'path';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import run from '../src/application.js';

const { screen, waitFor } = testingLibrary;

nock.disableNetConnect();

let elements;

beforeEach(() => {
  const pathToFixture = path.join('__tests__', '__fixtures__', 'index.html');
  const initHtml = fs.readFileSync(pathToFixture).toString();
  document.body.innerHTML = initHtml;
  run();

  elements = {
    submit: screen.getByText(/Submit/),
    nameInput: screen.getByRole('textbox', { name: /Name/ }),
    emailInput: screen.getByRole('textbox', { name: /Email/ }),
    passwordInput: screen.getByLabelText(/Password/, { selector: '[name="password"]' }),
    passwordConfirmationInput: screen.getByLabelText(/Password Confirmation/),
  };
});

test('submit disabled', async () => {
  expect(screen.queryByText('email must be a valid email')).not.toBeInTheDocument();
  expect(screen.queryByText('Password confirmation does not match to password')).not.toBeInTheDocument();
  expect(elements.emailInput).not.toHaveClass('is-invalid');
  expect(elements.passwordInput).not.toHaveClass('is-invalid');

  await userEvent.type(elements.nameInput, 'Petya');
  await userEvent.type(elements.emailInput, 'wrong-email');
  await userEvent.type(elements.passwordInput, 'long password without confirmation');

  expect(screen.getByRole('button', { selector: '[type="submit"]' })).toBeDisabled();
  expect(elements.emailInput).toHaveClass('is-invalid');
  expect(screen.queryByText('email must be a valid email')).toBeInTheDocument();

  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, 'qwert');
  expect(elements.passwordInput).toHaveClass('is-invalid');
  expect(screen.queryByText('password must be at least 6 characters')).toBeInTheDocument();

  expect(screen.getByRole('button', { selector: '[type="submit"]' })).toBeDisabled();

  await userEvent.type(elements.emailInput, 'support@hexlet.io');
  await userEvent.clear(elements.passwordInput);
  await userEvent.type(elements.passwordInput, 'qwerty');
  await userEvent.clear(elements.passwordConfirmationInput);
  await userEvent.type(elements.passwordConfirmationInput, 'qwerty');

  const scope = nock('http://localhost')
    .post('/users')
    .reply(200);

  await userEvent.click(elements.submit);
  await waitFor(() => {
    expect(document.body).toHaveTextContent('User Created');
  });

  scope.done();
});

test('fresh application', async () => {
  expect(screen.getByRole('button')).toBeDisabled();
});
