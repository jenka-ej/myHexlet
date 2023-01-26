// Реализуйте и экспортируйте по умолчанию функцию игры крестики-нолики на поле из 9 ячеек (представлены таблицей). 
// В упражнении дается готовая функция генерации поля. 
// Воспользуйтесь ей для инициализации игры. Поле нужно добавить в тег с классом .root.
// Затем, по клику, игра ставит поочередно x и o на поле. Подразумевается, что оба игрока играют за одним компьютером и просто кликают по очереди.
// Выигрыш в игре никак не отмечается.

const generateField = () => {
  const tableEl = document.createElement('table');

  tableEl.className = 'table-bordered';
  for (let i = 0; i < 3; i += 1) {
    const row = tableEl.insertRow();
    for (let j = 0; j < 3; j += 1) {
      const cell = row.insertCell();
      cell.className = 'py-2 px-3';
      cell.innerHTML = '<span class="invisible">s</span>';
    }
  }
  return tableEl;
};

export default () => {
  let flag = true;

  const handler = (event) => {
    const cell = event.target;
    if (cell.textContent !== 's') {
      flag = !flag;
    } else {
      if (flag) {
        cell.textContent = 'x';
      }
      if (!flag) {
        cell.textContent = 'o';
      }
      flag = !flag;
    }
  };

  const root = document.querySelector('.root');
  root.append(generateField());
  const table = document.querySelector('.table-bordered');
  table.addEventListener('click', handler);
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

const getCell = (rowIndex, cellIndex) => {
  const table = document.querySelector('table');
  return table.rows.item(rowIndex).cells.item(cellIndex);
};

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application', () => {
  const root = screen.getByTestId('root');
  const table = screen.getByRole('table');
  expect(root).toContainElement(table);
  expect(getCell(0, 0)).toHaveTextContent('s');
  expect(getCell(1, 1)).toHaveTextContent('s');
  expect(getCell(2, 2)).toHaveTextContent('s');
});

const cells = [
  [2, 2, 'x'],
  [1, 1, 'o'],
  [1, 2, 'x'],
  [2, 1, 'o'],
  [2, 1, 'o'],
  [0, 0, 'o'],
  [1, 0, 'x'],
  [2, 0, 'o'],
  [0, 2, 'x'],
];

test.each(cells)('Row %s, column %s, set "%s"', async (row, column, symbol) => {
  const cellBeforeClick = getCell(row, column);
  await userEvent.click(cellBeforeClick);
  const cellAfterClick = getCell(row, column);
  expect(cellAfterClick).toHaveTextContent(symbol);
});
