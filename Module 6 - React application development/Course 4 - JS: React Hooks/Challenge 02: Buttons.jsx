// Реализуйте и экспортируйте по умолчанию компонент <Buttons />, который отрисовывает кнопки со значением счетчика.
// В компоненте необходимо реализовать следующее поведение:
// 1) Текущее значение счетчика каждой кнопки — это строка внутри тега button
// 2) Клик по кнопке должен увеличивать значение счетчика на единицу, не затрагивая при этом другие счетчики
// 3) Компонент должен принимать пропс count, который определяет количество кнопок. Значение по умолчанию: 3
// 4) Для оформления внешнего вида кнопок используйте библиотеку bootstrap (подключена к испытанию)
// 5) Последняя нажатая кнопка меняет цвет (с помощью класса). Классы в примерах ниже

// Кнопки с нулевым значением счетчика:
// <button class="btn btn-primary m-1" type="button">0</button>
// <button class="btn btn-primary m-1" type="button">0</button>
// <button class="btn btn-primary m-1" type="button">0</button>

// Кнопки на которые нажимали. Последняя была вторая (btn-primary => btn-success):
// <button class="btn btn-primary m-1" type="button">3</button>
// <button class="btn btn-success m-1" type="button">1</button>
// <button class="btn btn-primary m-1" type="button">2</button>

import React from 'react';
import { useImmer } from 'use-immer';
import cn from 'classnames';

const Buttons = (props) => {
  const { count } = props;
  const buttonsMass = [];
  const buttonsState = { active: null };
  for (let i = 1; i <= count; i += 1) {
    const key = `button ${i}`;
    buttonsState[key] = 0;
    buttonsMass.push(key);
  }

  const [state, updateButton] = useImmer(buttonsState);
  function clickButton(id) {
    updateButton((draft) => {
      draft[id] += 1;
      draft.active = id;
    });
  }

  return (
    <div>
      {buttonsMass.map((buttonId) => {
        const classValue = cn({
          btn: true,
          'btn-primary': buttonId !== state.active,
          'btn-success': buttonId === state.active,
          'm-1': true,
        });
        return (
          <button className={classValue} type="button" onClick={() => clickButton(buttonId)} key={buttonId}>
            {state[buttonId]}
          </button>
        );
      })}
    </div>
  );
};

Buttons.defaultProps = { count: 3 };

export default Buttons;

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Buttons from './Buttons.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Buttons count={5} />);

/* __tests__ */

import React from 'react';
import _ from 'lodash';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Buttons from '../src/Buttons.jsx';

const defaultButtonsCount = 3;

describe('Test app buttons', () => {
  it('default props', () => {
    render(<Buttons />);
    expect(screen.getAllByRole('button')).toHaveLength(defaultButtonsCount);
  });

  it('buttons clicks', async () => {
    const buttonsCount = 4;

    render(<Buttons count={buttonsCount} />);
    const buttons = screen.getAllByRole('button');
    expect(screen.getAllByRole('button')).toHaveLength(buttonsCount);
    buttons.forEach((btn) => {
      expect(btn).toHaveClass('btn-primary');
      expect(btn).not.toHaveClass('btn-success');
    });

    const firstButtonClicksCount = 2;
    const secondButtonClicksCount = 3;
    const thirdButtonClicksCount = 6;

    const promises1 = _.times(firstButtonClicksCount, async () => {
      const res = await userEvent.click(screen.getAllByRole('button')[0]);
      return res;
    });
    const promises2 = _.times(secondButtonClicksCount, async () => {
      const res = await userEvent.click(screen.getAllByRole('button')[1]);
      return res;
    });
    const promises3 = _.times(thirdButtonClicksCount, async () => {
      const res = await userEvent.click(screen.getAllByRole('button')[2]);
      return res;
    });
    await Promise.all([...promises1, ...promises2, ...promises3]);

    expect(screen.getAllByRole('button')[0]).toHaveTextContent(String(firstButtonClicksCount));
    expect(screen.getAllByRole('button')[0]).toHaveClass('btn-primary');
    expect(screen.getAllByRole('button')[0]).not.toHaveClass('btn-success');

    expect(screen.getAllByRole('button')[1]).toHaveTextContent(String(secondButtonClicksCount));
    expect(screen.getAllByRole('button')[1]).toHaveClass('btn-primary');
    expect(screen.getAllByRole('button')[1]).not.toHaveClass('btn-success');

    expect(screen.getAllByRole('button')[2]).toHaveTextContent(String(thirdButtonClicksCount));
    expect(screen.getAllByRole('button')[2]).not.toHaveClass('btn-primary');
    expect(screen.getAllByRole('button')[2]).toHaveClass('btn-success');

    expect(screen.getAllByRole('button')[3]).toHaveTextContent(String(0));
    expect(screen.getAllByRole('button')[3]).toHaveClass('btn-primary');
    expect(screen.getAllByRole('button')[3]).not.toHaveClass('btn-success');
  });
});
