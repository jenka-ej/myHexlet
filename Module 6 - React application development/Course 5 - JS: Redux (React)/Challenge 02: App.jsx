// Реализуйте компонент, который показывает форму и хранит ее состояние в Redux. Форма состоит из двух элементов: текстового поля и кнопки "сброс".
// В процессе ввода текста он отображается под полем ввода. Если нажать на сброс, текст очищается.

// Интерфейс компонента:
// <App
//   dispatch={store.dispatch}
//   text="text from store"
//   updateText={actions.updateText}
//   resetText={actions.resetText}
// />

// Начальное состояние:
// <div>
//   <form>
//     <input type="text" value="">
//     <button type="button">Reset</button>
//   </form>
// </div>

// После ввода текста:
// <div>
//   <form>
//     <input type="text" value="hello">
//     <button type="button">Reset</button>
//   </form>
//   <div>hello</div>
// </div>

import React from 'react';
const divInput = (text) => {
  if (!text) {
    return null;
  }
  return <div>{text}</div>;
};

const App = ({
  dispatch,
  text,
  updateText,
  resetText,
}) => {
  const handleUpdateText = (e) => {
    e.preventDefault();
    dispatch(updateText(e.target.value));
  };
  const handleResetText = () => dispatch(resetText());

  return (
    <div>
      <form>
        <input type="text" value={text ?? ''} onChange={handleUpdateText} />
        <button type="button" onClick={handleResetText}>Reset</button>
      </form>
      {divInput(text)}
    </div>
  );
};

export default App;

/* ../actions.js */

export const updateText = (text) => ({
  type: 'TEXT_UPDATE',
  payload: {
    text,
  },
});

export const resetText = () => ({
  type: 'TEXT_RESET',
  payload: {},
});

/* ../reducers.js */

import { combineReducers } from 'redux';

const text = (state = '', action) => {
  switch (action.type) {
    case 'TEXT_UPDATE': {
      return action.payload.text;
    }
    case 'TEXT_RESET': {
      return '';
    }
    default:
      return state;
  }
};

export default combineReducers({
  text,
});

/* ../index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';
import { createStore } from 'redux';

import App from './components/App.jsx';
import reducers from './reducers.js';
import { updateText, resetText } from './actions.js';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

const vdom = (
  <App
    dispatch={store.dispatch}
    updateText={updateText}
    resetText={resetText}
  />
);

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(vdom);

store.subscribe(() => {
  const { text } = store.getState();
  root.render(<App
    dispatch={store.dispatch}
    updateText={updateText}
    resetText={resetText}
    text={text}
  />);
});

/* __tests__ */

import React from 'react';
import { createStore } from 'redux';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import reducers from '../src/reducers.js';
import App from '../src/components/App.jsx';
import { updateText, resetText } from '../src/actions.js';

test('Store', async () => {
  const store = createStore(reducers);

  const vdom = (
    <App
      dispatch={store.dispatch}
      updateText={updateText}
      resetText={resetText}
    />
  );

  const { rerender } = render(vdom);

  store.subscribe(() => {
    const { text } = store.getState();
    rerender(<App
      dispatch={store.dispatch}
      text={text}
      updateText={updateText}
      resetText={resetText}
    />);
  });

  expect(screen.getByRole('textbox')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');

  await userEvent.type(screen.getByRole('textbox'), 'use the source, Luke');
  expect(screen.getByRole('textbox')).toHaveDisplayValue('use the source, Luke');
  expect(screen.getByText('use the source, Luke')).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /reset/i }));
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  expect(screen.queryByText('use the source, Luke')).not.toBeInTheDocument();
});
