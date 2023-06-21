// Реализуйте компонент ListGroup, который отрисовывает переданных детей, оборачивая их в список.

// Пример использования:
// <ListGroup>
//   <p>one</p>
//   <p>two</p>
// </ListGroup>;

// Результат:
// <ul class="list-group">
//   <li class="list-group-item"><p>one</p></li>
//   <li class="list-group-item"><p>two</p></li>
// </ul>

import React from 'react';

export default class ListGroup extends React.Component {
  render() {
    const { children } = this.props;
    return (
      <ul className="list-group">
        {React.Children.map(children, (child) => <li className="list-group-item">{child}</li>)}
      </ul>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import ListGroup from './ListGroup.jsx';

const dom = (
  <ListGroup>
    <p>one</p>
    <p>two</p>
  </ListGroup>
);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(dom);

/* __tests__ */

import React from 'react';

import { test, expect } from '@jest/globals';

import renderer from 'react-test-renderer';
import ListGroup from '../src/ListGroup.jsx';

test('ListGroup 1', () => {
  const dom = (
    <ListGroup>
      <p>one</p>
      <p>two</p>
    </ListGroup>
  );

  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('ListGroup 2', () => {
  const dom = (
    <ListGroup>
      <a href="google">google</a>
      <a href="yandex">yandex</a>
      <a href="mail">mail</a>
    </ListGroup>
  );

  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
