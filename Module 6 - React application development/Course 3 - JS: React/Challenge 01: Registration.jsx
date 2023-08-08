// Это довольно простое задание, но оно хорошо демонстрирует удобство модульности компонентов.
// В веб-разработке есть такое понятие как всплывающие окна Pop-Up. Их использование может быть очень разным,
// это могут быть всплывающие подсказки или даже элементы меню. В этом задании вам нужно реализовать форму регистрации,
// при наведении курсора на поле, должно всплывать окно с описанием поля. Для всплывающих окон используйте библиотеку reactjs-popup.

// Файл fields.js содержит поля, импортируйте их в компонент и используйте для отрисовки. 
// Каждое поле в форме должно иметь label, текст всплывающей подсказки содержится в description.

// Пример формы:
// <div id="container" class="container m-3">
//   <div class="col-5">
//     <h1 class="my-4">Регистрация</h1>
//     <form class="">
//       <div class="mb-3">
//         <label class="form-label" for="firstName">Имя</label>
//         <input
//           aria-describedby="popup-1"
//           type="text"
//           id="firstName"
//           class="form-control"
//         />
//       </div>
//       <div class="mb-3">
//         <label class="form-label" for="lastName">Фамилия</label>
//         <input
//           aria-describedby="popup-2"
//           type="text"
//           id="lastName"
//           class="form-control"
//         />
//       </div>
//       <div class="mb-3">
//         <label class="form-label" for="email">Email</label>
//         <input
//           aria-describedby="popup-3"
//           type="email"
//           id="email"
//           class="form-control"
//         />
//       </div>
//       <div class="mb-3">
//         <label class="form-label" for="password">Пароль</label>
//         <input
//           aria-describedby="popup-4"
//           type="password"
//           id="password"
//           class="form-control"
//         />
//       </div>
//       <button type="submit" class="btn btn-primary">Submit</button>
//     </form>
//   </div>
// </div>

import React from 'react';
import Popup from 'reactjs-popup';

import fields from '../fields.js';

const Registration = () => (
  <div id="container" className="container m-3">
    <div className="col-5">
      <h1 className="my-4">Регистрация</h1>
      <form className="">
        {fields.map((field, index) => {
          const key = index;
          const {
            id,
            title,
            type,
            description,
          } = field;
          return (
            <div className="mb-3" key={`div-${key}`}>
              <label className="form-label" htmlFor={id}>{title}</label>
              <Popup
                trigger={<input aria-describedby={`popup-${key}`} type={type} id={id} className="form-control" />}
                key={key}
                position="right center"
                on="hover"
                closeOnDocumentClick
                mouseLeaveDelay={50}
                mouseEnterDelay={0}
              >
                <span>{description}</span>
              </Popup>
            </div>
          );
        })}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
);

export default Registration;

/* fields.js */

const fields = [
  {
    id: 'firstName',
    title: 'Имя',
    type: 'text',
    description: 'Ваше имя',
  },
  {
    id: 'lastName',
    title: 'Фамилия',
    type: 'text',
    description: 'Ваша фамилия',
  },
  {
    id: 'email',
    title: 'Email',
    type: 'email',
    description: 'Ваш email',
  },
  {
    id: 'password',
    title: 'Пароль',
    type: 'password',
    description: 'Придумайте надёжный пароль',
  },
];

export default fields;

/* App.jsx */

import React from 'react';
import Registration from './Registration.jsx';

const App = () => (
  <div className="col-5">
    <Registration />
  </div>
);

export default App;

/* index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';
import 'reactjs-popup/dist/index.css';

import App from './components/App.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<App />);

/* routes.js */

export default {
  registration: () => '/registration',
};

/* __tests__ */

import '@testing-library/jest-dom';

import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import fields from '../src/fields.js';
import App from '../src/components/App.jsx';

beforeEach(async () => {
  const vdom = (<App />);
  render(vdom);
});

test.each(fields)('Field %o', async (field) => {
  await userEvent.hover(screen.getByLabelText(field.title));
  expect(await screen.findByText(field.description)).toBeInTheDocument();
});
