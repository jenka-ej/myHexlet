// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход объект со свойствами title и text, и возвращает jsx с подставленными значениями. Пример:

// import getCard from './Card.jsx';
 
// getCard({ title: 'hi', text: 'how are you?' });
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">hi</h4>
//     <p className="card-text">how are you?</p>
//   </div>
// </div>

// Если title отсутствует, то соответствующий ему кусок dom не отрисовывается, то же самое справедливо и для text. 
// Если отсутствуют оба свойства, то из функции необходимо вернуть null.

import React from 'react';

export default (states) => {
  const { title, text } = states;
  if (!title && !text) {
    return null;
  }
  const titleText = title && <h4 className="card-title">{title}</h4>;
  const textText = text && <p className="card-text">{text}</p>;
  const vdom = (
    <div className="card">
      <div className="card-body">
        {titleText}
        {textText}
      </div>
    </div>
  );
  return vdom;
};

/* __tests__ */

import renderer from 'react-test-renderer';
import getCard from '../src/Card.jsx';

test('Card 1', () => {
  const params = {
    title: 'title 1',
    text: 'text 1',
  };
  const vdom = getCard(params);
  const component = renderer.create(vdom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 2', () => {
  const params = {
    title: 'title 2',
    text: 'text 2',
  };
  const vdom = getCard(params);
  const component = renderer.create(vdom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 3', () => {
  const params = {
  };
  const vdom = getCard(params);
  expect(vdom).toBeNull();
});

test('Card 4', () => {
  const params = {
    title: 'title 1',
  };
  const vdom = getCard(params);
  const component = renderer.create(vdom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 5', () => {
  const params = {
    text: 'text 1',
  };
  const vdom = getCard(params);
  const component = renderer.create(vdom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
