// Реализуйте и экспортируйте по умолчанию компонент DefinitionsList, который принимает свойство data следующей структуры:

// const definitions = [
//   { dt: 'one', dd: 'two', id: 1 },
//   { dt: 'another term', dd: 'another description', id: 2 },
// ];
 
// <DefinitionsList data={definitions} />;

// Результатом должен быть следующий вывод:

// <dl>
//   <dt>one</dt>
//   <dd>two</dd>
//   <dt>another term</dt>
//   <dd>another description</dd>
// </dl>

import React from 'react';

export default class DefinitionsList extends React.Component {
  render() {
    const { data } = this.props;

    if (data.length === 0) {
      return null;
    }
    return (
      <dl>
        {data.map((item) => (
          <React.Fragment key={item.id}>
            <dt>{item.dt}</dt>
            <dd>{item.dd}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';
import uniqueId from 'lodash/uniqueId';

import DefinitionsList from './DefinitionsList.jsx';

const definitions = [
  { dt: 'one', dd: 'two', id: uniqueId() },
  { dt: 'another term', dd: 'another description', id: uniqueId() },
];

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<DefinitionsList data={definitions} />);

/* __tests__ */

import React from 'react';
import renderer from 'react-test-renderer';
import DefinitionsList from '../src/DefinitionsList.jsx';

test('Definitions 1', () => {
  const definitions = [
    { dt: 'one', dd: 'two', id: 1 },
    { dt: 'another term', dd: 'another description', id: 2 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 2', () => {
  const definitions = [
    { dt: 'one', dd: 'two', id: 1 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 3', () => {
  const definitions = [
    { dt: 'another term', dd: 'another description', id: 1 },
    { dt: 'one', dd: 'two', id: 2 },
  ];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Definitions 4', () => {
  const definitions = [];
  const component = renderer.create(<DefinitionsList data={definitions} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
