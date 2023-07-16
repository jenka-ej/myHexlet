// Ознакомьтесь со списком тем. Каждая тема включает в себя класс стилей, который должен присваиваться контенту при переключении темы. 
// Сделайте сохранение выбранной темы в состоянии компонента, по умолчанию выбрана первая тема. Добавьте провайдер для передачи данных контекста. 
// Данные должны содержать всё необходимое для работы: список тем, текущую выбранную тему, метод для изменения темы.
// Реализуйте переключатель вкладок. Можно использовать готовый компонент Tabs из react-bootstrap.
// Пример использования:
// render() {
//   return (
//     <Tabs>
//       <Tab eventKey="login" title="Login">
//         <Home />
//       </Tab>
//       <Tab eventKey="registration" title="Registration">
//         <Profile />
//       </Tab>
//     </Tabs>
//   );
// }

// В компонентах src/Home.jsx и src/Profile.jsx добавьте получение необходимых данных из контекста. Выведите текст из константы content. 
// Элемент контента должен содержать класс выбранной темы.
// Пример контента внутри вкладки:
// <article class="light">Текст для вкладки Home</article>

// Добавьте получение необходимых данных из контекста и реализуйте переключение темы. Переключение тем должно срабатывать для всех вкладок. 
// Можно использовать готовые компоненты ToggleButton и ButtonGroup из react-bootstrap().
// Пример использования:
// render() {
//   return (
//     <ButtonGroup className="mb-2">
//       <ToggleButton
//         id="toggle-check"
//         type="checkbox"
//         variant="secondary"
//         checked={checked}
//         value="1"
//         onChange={(e) => setChecked(e.currentTarget.checked)}
//       >
//         Checked
//       </ToggleButton>
//     </ButtonGroup>
//   );
// }

import React from 'react';
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: '1' };
  }

  setTheme = (e) => {
    this.setState(() => ({ id: e.target.value }));
  };

  render() {
    const { id } = this.state;
    const currentTheme = themes.filter((theme) => theme.id.toString() === id)[0];
    return (
      <ThemeContext.Provider value={{ themes, theme: currentTheme, setTheme: this.setTheme }}>
        <Tabs>
          <Tab eventKey="Home" title="Home">
            <Home />
          </Tab>
          <Tab eventKey="Profile" title="Profile">
            <Profile />
          </Tab>
        </Tabs>
        <ThemeSwitcher />
      </ThemeContext.Provider>
    );
  }
}

export default App;

/* Home.jsx */

import React from 'react';

import ThemeContext from './contexts';

const content = 'Текст для вкладки Home';

class Home extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { context } = this;
    const { theme } = context;
    const { className } = theme;
    return (
      <article className={className}>{content}</article>
    );
  }
}

export default Home;

/* Profile.jsx */

import React from 'react';

import ThemeContext from './contexts';

const content = 'Текст для вкладки Profile';

class Profile extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { context } = this;
    const { theme } = context;
    const { className } = theme;
    return (
      <article className={className}>{content}</article>
    );
  }
}

export default Profile;

/* ThemeSwitcher.jsx */

import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

import ThemeContext from './contexts';

class ThemeSwitcher extends React.Component {
  static contextType = ThemeContext;

  render() {
    const { context } = this;
    const { setTheme, theme } = context;
    const radios = [
      { name: 'White', value: '1' },
      { name: 'Black', value: '2' },
      { name: 'Blue', value: '3' },
    ];
    return (
      <ButtonGroup className="mb-2">
        {radios.map(({ name, value }) => (
          <ToggleButton
            id={`tbg-btn-${value}`}
            type="radio"
            variant="primary"
            checked={theme.name === name}
            value={value}
            key={value}
            onChange={(e) => setTheme(e)}
          >
            {name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    );
  }
}

export default ThemeSwitcher;

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<App />);

/* contexts/index.js */

import { createContext } from 'react';

export default createContext({
  themes: [],
  theme: {},
  setTheme: () => {},
});

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
