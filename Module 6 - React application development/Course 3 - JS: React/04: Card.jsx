// Реализуйте и экспортируйте по умолчанию компонент Card, который принимает на вход свойства title и text. И возвращает jsx с подставленными значениями. 
// Если свойства не переданы, вместо них подставляются строки "title" и "text". Пример:

// const title = "title 1";
// const text = "text 1";
// ReactDOM.render(<Card title={title} text={text} />);
 
// вывод
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">title 1</h4>
//     <p className="card-text">text 1</p>
//   </div>
// </div>;
 
// без пропсов
// ReactDOM.render(<Card />);
 
// вывод
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">title</h4>
//     <p className="card-text">text</p>
//   </div>
// </div>;

import React from 'react';

export default class Card extends React.Component {
  render() {
    const { title, text } = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">{title}</h4>
          <p className="card-text">{text}</p>
        </div>
      </div>
    );
  }
}

Card.defaultProps = {
  title: 'title',
  text: 'text',
};

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Card from './Card.jsx';

const title = 'Title';
const text = 'Description';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Card title={title} text={text} />);

/* __tests__ */

import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../src/Card.jsx';

test('With props 1', () => {
  const title = 'title 1';
  const text = 'text 1';
  const component = renderer.create(<Card title={title} text={text} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('With props 2', () => {
  const title = 'title 2';
  const text = 'text 2';
  const component = renderer.create(<Card title={title} text={text} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Without props 1', () => {
  const text = 'text 2';
  const component = renderer.create(<Card text={text} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Without props 2', () => {
  const component = renderer.create(<Card />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
