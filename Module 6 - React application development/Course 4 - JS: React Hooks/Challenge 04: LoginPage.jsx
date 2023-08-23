// В этом испытании вам предстоит реализовать авторизацию в настоящем SPA (single-page application). 
// Идея состоит в том, что при получении валидной пары логин-пароль сервер возвращает токен, 
// который сохраняется в local storage и отправляется на сервер с каждым клиентским запросом. 
// Приложение состоит из главной, публичной и приватной страниц, а также страницы с формой входа.
// Часть кода уже написана, внимательно изучите файлы приложения. Выполнение испытания потребует изучения новых хуков и библиотек. 
// Рекомендуем проходить это испытание после выполнения предыдущего.

// Реализуйте компонент с формой авторизации пользователя. Форма содержит поля username и password. 
// В случае ошибки аутентификации в форме показывается сообщение the username or password is incorrect. 
// При успешной проверке полученный с сервера токен необходимо сохранить и сделать редирект на ту страницу, с которой пользователь попал в форму логина. 
// Если пользователь зашёл по прямой ссылке, его следует перенаправить на главную страницу.

// Пример формы:
// <form>
//   <div class="form-group">
//     <label class="form-label" for="username">Username</label>
//     <input placeholder="username" name="username" autocomplete="username" required id="username" class="form-control">
//   </div>
//   <div class="form-group">
//     <label class="form-label" for="password">Password</label>
//     <input placeholder="password" name="password" autocomplete="current-password" required id="password" class="form-control" type="password">
//     <div class="invalid-feedback">the username or password is incorrect</div>
//   </div>
//   <button type="submit" class="btn btn-outline-primary">Submit</button>
// </form>

// Реализуйте компонент, который запрашивает данные с сервера и выводит их. Для получения данных необходимо к запросу добавить заголовок Authorization, 
// содержащий токен. После проверки сервер вернёт строку, которую нужно вывести на странице.
// Роутинг настроен так, что на страницу /private можно попасть только после успешной авторизации.

import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useFormik } from 'formik';
import { Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import routes from '../routes.js';

const LoginPage = () => {
  const locate = useLocation();
  const navigate = useNavigate();
  const { logIn } = useAuth();

  const { from } = locate.state;
  const [feedback, changeFeedback] = useState({ state: false });
  const handleChange = () => changeFeedback(() => ({ state: true }));

  const inputEl = useRef(null);
  useEffect(() => inputEl.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async ({ username, password }) => {
      try {
        const request = await axios.post(routes.loginPath(), { username, password });
        const { data } = request;
        window.localStorage.setItem('userId', JSON.stringify(data));
        logIn();
        navigate(from);
      } catch (err) {
        handleChange();
        if (err.isAxiosError && err.response.status === 401) {
          inputEl.current.select();
          return;
        }
        throw err;
      }
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <div className="form-group">
        <Form.Label htmlFor="username">Username</Form.Label>
        <input placeholder="username" ref={inputEl} name="username" autoComplete="username" required id="username" className="form-control" onChange={formik.handleChange} />
      </div>
      <div className="form-group">
        <Form.Label htmlFor="password">Password</Form.Label>
        <input placeholder="password" name="password" autoComplete="current-password" required id="password" className="form-control" type="password" onChange={formik.handleChange} />
        <div className={`${feedback.state ? '' : 'invalid-'}feedback text-danger`}>the username or password is incorrect</div>
      </div>
      <Button type="submit" variant="outline-primary">Submit</Button>
    </Form>
  );
};

export default LoginPage;

/* PrivatePage.jsx */

import axios from 'axios';
import React, { useEffect, useState } from 'react';

import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const PrivatePage = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    const getToken = async () => {
      const request = await axios.get(routes.usersPath(), { headers: getAuthHeader() });
      const { data } = request;
      setToken(data);
    };
    getToken();
  }, []);

  return (
    <div>{token}</div>
  );
};

export default PrivatePage;

/* PublicPage.jsx */

import React from 'react';

const PublicPage = () => <p>Everyone can see this</p>;

export default PublicPage;

/* App.jsx */

import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

import PublicPage from './PublicPage.jsx';
import LoginPage from './LoginPage.jsx';
import PrivatePage from './PrivatePage.jsx';
import AuthContext from '../contexts/index.jsx';
import useAuth from '../hooks/index.jsx';

const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ loggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();
  const location = useLocation();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Log out</Button>
      : <Button as={Link} to="/login" state={{ from: location }}>Log in</Button>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">Secret Place</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/public">Public page</Nav.Link>
          <Nav.Link as={Link} to="/private">Private page</Nav.Link>
        </Nav>
        <AuthButton />
      </Navbar>

      <div className="container p-3">
        <h1 className="text-center mt-5 mb-4">Welcome to the secret place!</h1>
        <Routes>
          <Route path="/" element={null} />
          <Route path="/public" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/private"
            element={(
              <PrivateRoute>
                <PrivatePage />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>

    </Router>
  </AuthProvider>
);

export default App;

/* contexts/index.jsx */

import { createContext } from 'react';

const AuthContext = createContext({});

export default AuthContext;

/* hooks/index.jsx */

import { createRoot } from 'react-dom/client';
import React from 'react';

import Component from './components/App.jsx';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<Component />);

/* hooks/routes.js */

const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  usersPath: () => [apiPath, 'data'].join('/'),
};

/* __tests__ */

import nock from 'nock';
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import 'jest-localstorage-mock';

import App from '../src/components/App.jsx';

beforeAll(() => {
  nock.disableNetConnect();
});

it('app', async () => {
  render(<App />);

  nock(window.location.href)
    .post('/api/v1/login')
    .reply(401)
    .post('/api/v1/login')
    .reply(200, { token: 'JWT' })
    .get('/api/v1/data')
    .reply(200, 'test data');

  await userEvent.click(screen.getByRole('link', { name: /private page/i }));
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/username/i), 'wrongLogin');
  await userEvent.type(screen.getByLabelText(/password/i), 'wrongPass');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));

  expect(await screen.findByText(/the username or password is incorrect/i)).toBeInTheDocument();

  await userEvent.type(screen.getByLabelText(/username/i), 'login');
  await userEvent.type(screen.getByLabelText(/password/i), 'pass');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(await screen.findByText(/test data/i)).toBeInTheDocument();
});
