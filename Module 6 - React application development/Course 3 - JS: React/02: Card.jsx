// Реализуйте компонент Card, возвращающий следующий jsx:
// <div className="card">
//   <div className="card-body">
//     <h4 className="card-title">Card title</h4>
//     <p className="card-text">Some quick example text to build on the card</p>
//     <button type="button" className="btn btn-primary">Go somewhere</button>
//   </div>
// </div>

import React from 'react';

export default class Card extends React.Component {
  render() {
    const tree = (
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">Some quick example text to build on the card</p>
          <button type="button" className="btn btn-primary">Go somewhere</button>
        </div>
      </div>
    );
    return tree;
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Card from './Card.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Card />);

/* __tests__ */

import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../src/Card.jsx';

test('Card', () => {
  const component = renderer.create(<Card />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
