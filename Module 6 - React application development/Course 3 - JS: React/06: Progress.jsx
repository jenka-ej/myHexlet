// Реализуйте и экспортируйте по умолчанию компонент Progress, который принимает свойство percentage и рисует статический прогресс бар.
// Использование:

// <Progress percentage={40} />;
// Результат:

// <div class="progress">
//   <div class="progress-bar" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" aria-label="progressbar" style="width: 40%;">
//   </div>
// </div>

// Стиль width – вычисляется динамически исходя из переданного значения percentage. Аттрибут aria-valuenow – вычисляется динамически и равен percentage.

import React from 'react';

export default class Progress extends React.Component {
  render() {
    const { percentage } = this.props;
    const styleValue = {
      width: `${percentage}%`,
    };
    return (
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label="progressbar"
          style={styleValue}
        />
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Progress from './Progress.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Progress percentage={40} />);

/* __tests__ */

import React from 'react';
import renderer from 'react-test-renderer';
import Progress from '../src/Progress.jsx';

test('Progress 1', () => {
  const component = renderer.create(<Progress percentage={25} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('Progress 2', () => {
  const component = renderer.create(<Progress percentage={100} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
