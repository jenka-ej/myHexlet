// Ознакомьтесь со списком тем. Каждая тема включает в себя класс стилей, который должен присваиваться контенту при переключении темы. 
// Доработайте провайдер темы так, чтобы он хранил выбранную тему в состоянии и 
// передавал всем компонентом данные для работы (список тем, текущую тему, метод для изменения темы).
// В компонентах src/Home.jsx, src/Profile.jsx и src/ThemeSwitcher.jsx добавьте получение необходимых данных из контекста.

import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';

import Home from './Home.jsx';
import Profile from './Profile.jsx';
import ThemeSwitcher from './ThemeSwitcher.jsx';
import ThemeContext from './contexts';

const themes = [
  {
    id: 1,
    name: 'White',
    className: 'light',
  },
  {
    id: 2,
    name: 'Black',
    className: 'dark',
  },
  {
    id: 3,
    name: 'Blue',
    className: 'dark-blue',
  },
];

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes[0]);

  return (
    <ThemeContext.Provider value={{ themes, theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

const App = () => (
  <ThemeProvider>
    <Tabs className="mb-3">
      <Tab eventKey="home" title="Home">
        <Home />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <Profile />
      </Tab>
    </Tabs>
    <ThemeSwitcher />
  </ThemeProvider>
);

export default App;

/* Home.jsx */

import React, { useContext } from 'react';

import ThemeContext from './contexts';

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { className } = theme;

  return (
    <article className={className}>
      Текст для вкладки Home
    </article>
  );
};

export default Home;

/* Profile.jsx */

import React, { useContext } from 'react';

import ThemeContext from './contexts';

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const { className } = theme;

  return (
    <article className={className}>
      Текст для вкладки Profile
    </article>
  );
};

export default Profile;

/* ThemeSwitcher.jsx */

import React, { useContext } from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import ThemeContext from './contexts';

const ThemeSwitcher = () => {
  const { themes, theme, setTheme } = useContext(ThemeContext);

  return (
    <ButtonGroup className="mt-2">
      {themes.map((curTheme) => (
        <ToggleButton
          key={curTheme.id}
          id={`radio-${curTheme.id}`}
          type="radio"
          name="radio"
          value={curTheme.name}
          checked={curTheme.name === theme.name}
          onChange={() => setTheme(curTheme)}
        >
          {curTheme.name}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
};

export default ThemeSwitcher;

/* contexts/index.js */

import { createContext } from 'react';

export default createContext({
  themes: [],
  theme: {},
  setTheme: () => {},
});

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<App />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import App from '../src/App.jsx';

test('App 1', async () => {
  render(<App />);

  expect(screen.getByText(/Текст для вкладки Home/i)).toHaveClass('light');
  expect(screen.getByText(/Текст для вкладки Profile/i)).toHaveClass('light');

  await userEvent.click(screen.getByText(/Black/i));

  expect(screen.getByText(/Текст для вкладки Home/i)).toHaveClass('dark');
  expect(screen.getByText(/Текст для вкладки Profile/i)).toHaveClass('dark');
});
