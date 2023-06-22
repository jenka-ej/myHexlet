// Реализуйте компонент BtnGroup, который отрисовывает две кнопки. Нажатие на любую из кнопок делает ее активной, а другую неактивной. 
// При первой загрузке ни одна из кнопок не нажата.

// Пример использования:
// <BtnGroup />

// Результат:
// <div class="btn-group" role="group">
//   <button type="button" class="btn btn-secondary left">Left</button>
//   <button type="button" class="btn btn-secondary right">Right</button>
// </div>

// После нажатия на левую кнопку, добавляется класс active. В результате список классов выглядит так: btn btn-secondary left active. 
// У правой кнопки поведение соответствующее.

import cn from 'classnames';
import React from 'react';

export default class BtnGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { button: null };
  }

  onChangeClassLeft = () => this.setState(() => ({ button: 'left' }));

  onChangeClassRight = () => this.setState(() => ({ button: 'right' }));

  render() {
    const { button } = this.state;
    const leftValue = cn('btn btn-secondary left', { active: button === 'left' });
    const rightValue = cn('btn btn-secondary right', { active: button === 'right' });
    return (
      <div className="btn-group" role="group">
        <button type="button" className={leftValue} onClick={this.onChangeClassLeft}>Left</button>
        <button type="button" className={rightValue} onClick={this.onChangeClassRight}>Right</button>
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import BtnGroup from './BtnGroup.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<BtnGroup />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import BtnGroup from '../src/BtnGroup.jsx';

test('BtnGroup 1', async () => {
  render(<BtnGroup />);
  const leftBtn = screen.getByRole('button', { name: /left/i });
  const rightBtn = screen.getByRole('button', { name: /right/i });

  expect(leftBtn).not.toHaveClass('active');
  expect(rightBtn).not.toHaveClass('active');

  await userEvent.click(leftBtn);
  expect(leftBtn).toHaveClass('active');

  await userEvent.click(rightBtn);
  expect(rightBtn).toHaveClass('active');
  expect(leftBtn).not.toHaveClass('active');

  await userEvent.click(leftBtn);
  expect(leftBtn).toHaveClass('active');
  expect(rightBtn).not.toHaveClass('active');

  await userEvent.click(leftBtn);
  expect(leftBtn).toHaveClass('active');
  expect(rightBtn).not.toHaveClass('active');
});
