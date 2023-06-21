// Реализуйте компонент Alert, который отрисовывает алерт бутстрапа. Компонент принимает на вход два свойства:
// 1) text - отображаемый текст
// 2) type - тип алерта, может принимать одно из следующих значений: primary, secondary, success, danger, warning, info, light, dark

// Пример использования:
// <Alert type="warning" text="what is love?" />;

// Вывод:
// <div class="alert alert-warning" role="alert">what is love?</div>

import cn from 'classnames';
import React from 'react';

export default class Alert extends React.Component {
  render() {
    const { type, text } = this.props;
    const classValue = cn('alert', `alert-${type}`);
    return (
      <div className={classValue} role="alert">{text}</div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Alert from './Alert.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Alert type="warning" text="what is love?" />);

/* __tests__ */

import React from 'react';
import { render } from '@testing-library/react';
import Alert from '../src/Alert.jsx';

test('Alert 1', () => {
  const params = {
    type: 'danger',
    text: 'text 1',
  };
  const { asFragment } = render(<Alert {...params} />);
  expect(asFragment()).toMatchSnapshot();
});

test('Alert 2', () => {
  const params = {
    type: 'dark',
    text: 'text 2',
  };
  const { asFragment } = render(<Alert {...params} />);
  expect(asFragment()).toMatchSnapshot();
});
