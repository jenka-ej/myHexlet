// Реализуйте компонент, который представляет собой две кнопки и лог событий:
// 1) Лог — это список значений, каждое из которых получается после нажатия на одну из двух кнопок. Снизу находятся более старые события, сверху новые
// 2) Левая кнопка + добавляет в лог строчку с новым значением равным: значение "самой новой существующей записи лога" + 1
// 3) Правая кнопка - добавляет в лог строчку с новым значением равным: значение "самой новой существующей записи лога" - 1
// 4) При клике на запись в логе она удаляется

// Каждое нажатие кнопки добавляет в лог новую строчку сверху. При удалении всех строчек в логе компонент возвращается к изначальному HTML.

import React from 'react';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { logs: [] };
  }

  addChange = () => this.setState(({ logs }) => {
    let newLogs;
    if (logs.length === 0) {
      newLogs = [{ item: 1, id: 1 }];
    } else {
      const { item, id } = logs[0];
      newLogs = [{ item: item + 1, id: id + 1 }, ...logs];
    }
    return { logs: newLogs };
  });

  delChange = () => this.setState(({ logs }) => {
    let newLogs;
    if (logs.length === 0) {
      newLogs = [{ item: -1, id: 1 }];
    } else {
      const { item, id } = logs[0];
      newLogs = [{ item: item - 1, id: id + 1 }, ...logs];
    }
    return { logs: newLogs };
  });

  removeLog = (idToRemove) => (e) => {
    e.preventDefault();
    this.setState(({ logs }) => {
      const newLogs = logs.filter(({ id }) => id !== idToRemove);
      return { logs: newLogs };
    });
  };

  renderLogs = (logs) => {
    if (logs.length === 0) {
      return null;
    }
    return (
      <div className="list-group">
        {logs.map(({ item, id }) => <button type="button" className="list-group-item list-group-item-action" key={id} onClick={this.removeLog(id)}>{item}</button>)}
      </div>
    );
  };

  render() {
    const { logs } = this.state;
    return (
      <div>
        <div className="btn-group font-monospace" role="group">
          <button type="button" className="btn btn-outline-success" onClick={this.addChange}>+</button>
          <button type="button" className="btn btn-outline-danger" onClick={this.delChange}>-</button>
        </div>
        {this.renderLogs(logs)}
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Component from './Component.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Component />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Component from '../src/Component.jsx';

test('Component', async () => {
  const { asFragment } = render(<Component />);

  const inc = screen.getByRole('button', { name: '+' });
  const dec = screen.getByRole('button', { name: '-' });
  expect(inc).toBeInTheDocument();
  expect(dec).toBeInTheDocument();

  await userEvent.click(inc);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(inc);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(inc);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(dec);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(inc);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(dec);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(dec);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(screen.getAllByRole('button', { name: '2' })[1]);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(screen.getAllByRole('button', { name: '3' })[1]);
  await userEvent.click(screen.getAllByRole('button', { name: '2' })[1]);
  await userEvent.click(screen.getAllByRole('button', { name: '1' })[0]);
  await userEvent.click(screen.getAllByRole('button', { name: '1' })[0]);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(screen.getAllByRole('button', { name: '3' })[0]);
  await userEvent.click(screen.getAllByRole('button', { name: '2' })[0]);
  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(inc);
  await userEvent.click(dec);
  expect(asFragment()).toMatchSnapshot();

  await userEvent;
});
