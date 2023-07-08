// Реализуйте компонент <Card> так, чтобы можно составлять такую структуру:

// <Card>
//   <Card.Body>
//     <Card.Title>Title</Card.Title>
//     <Card.Text>Text</Card.Text>
//   </Card.Body>
// </Card>

// Получившийся HTML:

// <div class="card">
//   <div class="card-body">
//     <h4 class="card-title">Title</h4>
//     <p class="card-text">Text</p>
//   </div>
// </div>

import React from 'react';

const Body = (props) => {
  const { children } = props;
  return (
    <div className="card-body">{children}</div>
  );
};

const Title = (props) => {
  const { children } = props;
  return (
    <h4 className="card-title">{children}</h4>
  );
};

const Text = (props) => {
  const { children } = props;
  return (
    <p className="card-text">{children}</p>
  );
};

export default class Card extends React.Component {
  static Body = Body;

  static Title = Title;

  static Text = Text;

  render() {
    const { children } = this.props;
    return (
      <div className="card">{children}</div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Card from './Card.jsx';

const dom = (
  <Card>
    <Card.Body>
      <Card.Title>Title</Card.Title>
      <Card.Text>Text</Card.Text>
    </Card.Body>
  </Card>
);

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(dom);

/* __tests__ */

import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../src/Card.jsx';

test('Card', () => {
  const dom = <Card />;
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 2', () => {
  const dom = (
    <Card>
      <Card.Title>Title</Card.Title>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 3', () => {
  const dom = (
    <Card>
      <Card.Body>
        <Card.Title>Title</Card.Title>
        <Card.Text>Text</Card.Text>
      </Card.Body>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Card 4', () => {
  const dom = (
    <Card>
      <Card.Body>
        <Card.Title>Title 3</Card.Title>
        <Card.Text>Text 3</Card.Text>
      </Card.Body>
    </Card>
  );
  const component = renderer.create(dom);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
