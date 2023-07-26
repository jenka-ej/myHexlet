// Реализуйте компонент BtnGroup, который отрисовывает две кнопки. 
// Нажатие на любую из кнопок делает её активной, а другую неактивной. 
// При первой загрузке ни одна из кнопок не нажата.

// Пример использования:
// <BtnGroup />

// Результат:
// <div class="btn-group" role="group">
//   <button type="button" class="btn btn-secondary left">Left</button>
//   <button type="button" class="btn btn-secondary right">Right</button>
// </div>

// После нажатия на левую кнопку, добавляется класс active. 
// В результате список классов выглядит так: btn btn-secondary left active. 
// У правой кнопки поведение соответствующее.

import cn from 'classnames';
import React, { useState } from 'react';

const BtnGroup = () => {
  const [button, setButton] = useState({ active: '' });
  const leftButtonClass = cn('btn btn-secondary left', { active: (button.active === 'left') });
  const rightButtonClass = cn('btn btn-secondary right', { active: (button.active === 'right') });

  return (
    <div className="btn-group" role="group">
      <button type="button" className={leftButtonClass} onClick={() => setButton({ active: 'left' })}>Left</button>
      <button type="button" className={rightButtonClass} onClick={() => setButton({ active: 'right' })}>Right</button>
    </div>
  );
};

export default BtnGroup;

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import BtnGroup from './BtnGroup.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
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
