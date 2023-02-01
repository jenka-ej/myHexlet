// Игра в 15 или пятнашки — популярная головоломка, придуманная в 1878 году Ноем Чепмэном. 
// Представляет собой набор одинаковых квадратных костяшек с нанесёнными числами, заключённых в квадратную коробку. 
// Длина стороны коробки в четыре раза больше длины стороны костяшек для набора из 15 элементов, соответственно в коробке остаётся незаполненным одно квадратное поле. 
// Цель игры — перемещая костяшки по коробке, добиться упорядочивания их по номерам, желательно сделав как можно меньше перемещений.

// Реализуйте игру в соответствии со следующими требованиями:
// Размер поля должен быть 4x4
// В начальной позиции пустым всегда является правый нижний квадрат
// Элементы формируются случайным образом по следующему алгоритму: сначала они перемешиваются используя randomize(values), а затем они наполняют таблицу.
// Таблица должна заполняться значениями сверху вниз, то есть таким образом:

// | 1  | 5  | 9  | 13 |
// |----|----|----|----|
// | 2  | 6  | 10 | 14 |
// |----|----|----|----|
// | 3  | 7  | 11 | 15 |
// |----|----|----|----|
// | 4  | 8  | 12 |    |

// Перемещение костяшек происходит с помощью стрелок: при нажатии →, левая костяшка, сдвинется вправо, в пустую область.

// Так как тесты завязаны на верстку (Bootstrap), то к ней предъявляются особые требования. Вот как выглядит начальная позиция:
// <div class="gem-puzzle">
//     <table class="table-bordered">
//         <tbody>
//             <tr>
//                 <td class="p-3">10</td>
//                 <td class="p-3">11</td>
//                 <td class="p-3">6</td>
//                 <td class="p-3">4</td>
//             </tr>
//             <tr>
//                 <td class="p-3">14</td>
//                 <td class="p-3">2</td>
//                 <td class="p-3">12</td>
//                 <td class="p-3">1</td>
//             </tr>
//             <tr>
//                 <td class="p-3">3</td>
//                 <td class="p-3">13</td>
//                 <td class="p-3">9</td>
//                 <td class="p-3">8</td>
//             </tr>
//             <tr>
//                 <td class="p-3">5</td>
//                 <td class="p-3">7</td>
//                 <td class="p-3">15</td>
//                 <td class="p-3 table-active"></td>
//             </tr>
//         </tbody>
//     </table>
// </div>

// * Класс таблицы постоянен
// * У каждой ячейки проставлен класс p-3
// * Пустая ячейка не содержит текста.
// * У пустой ячейки добавляется класс table-active

import _ from 'lodash';

const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default (randomize = _.shuffle) => {
  const createTable = () => {
    const table = document.createElement('table');
    table.classList.add('table-bordered');
    document.querySelector('.gem-puzzle').append(table);
    const tbody = document.createElement('tbody');
    document.querySelector('.table-bordered').append(tbody);
    randomize(values).map((num, index) => {
      if (index === 0 || index === 1 || index === 2 || index === 3) {
        const tr = document.createElement('tr');
        document.querySelector('tbody').append(tr);
      }
      const td = document.createElement('td');
      td.classList.add('p-3');
      td.textContent = num;
      const trs = document.querySelectorAll('tr');
      let reqTr;
      if ((index + 1) % 4 === 0) {
        reqTr = trs[trs.length - 1];
      } else {
        reqTr = trs[((index + 1) % 4) - 1];
      }
      return reqTr.append(td);
    });
    const tdEmpty = document.createElement('td');
    tdEmpty.classList.add('p-3');
    tdEmpty.classList.add('table-active');
    const trElements = document.querySelectorAll('tr');
    const lastTr = trElements[trElements.length - 1];
    lastTr.append(tdEmpty);
  };
  createTable();
  document.addEventListener('keyup', (e) => {
    const active = document.querySelector('.table-active');
    if (e.key === 'ArrowRight') {
      if (!active.previousElementSibling) {
        return;
      }
      const left = active.previousElementSibling;
      const temp1 = left.cloneNode(true);
      const temp2 = active.cloneNode(true);
      left.replaceWith(temp2);
      active.replaceWith(temp1);
    }
    if (e.key === 'ArrowLeft') {
      if (!active.nextElementSibling) {
        return;
      }
      const right = active.nextElementSibling;
      const temp1 = right.cloneNode(true);
      const temp2 = active.cloneNode(true);
      right.replaceWith(temp2);
      active.replaceWith(temp1);
    }
    if (e.key === 'ArrowDown') {
      const parent = active.parentNode;
      const arrayList = Array.from(parent.querySelectorAll('td'));
      let indexActive;
      arrayList.map((el, index) => {
        if (el === active) {
          indexActive = index;
        }
        return null;
      });
      if (!parent.previousElementSibling) {
        return;
      }
      const parentSibling = parent.previousElementSibling;
      const siblingArrayList = Array.from(parentSibling.querySelectorAll('td'));
      const up = siblingArrayList[indexActive];
      const temp1 = up.cloneNode(true);
      const temp2 = active.cloneNode(true);
      up.replaceWith(temp2);
      active.replaceWith(temp1);
    }
    if (e.key === 'ArrowUp') {
      const parent = active.parentNode;
      const arrayList = Array.from(parent.querySelectorAll('td'));
      let indexActive;
      arrayList.map((el, index) => {
        if (el === active) {
          indexActive = index;
        }
        return null;
      });
      if (!parent.nextElementSibling) {
        return;
      }
      const parentSibling = parent.nextElementSibling;
      const siblingArrayList = Array.from(parentSibling.querySelectorAll('td'));
      const down = siblingArrayList[indexActive];
      const temp1 = down.cloneNode(true);
      const temp2 = active.cloneNode(true);
      down.replaceWith(temp2);
      active.replaceWith(temp1);
    }
  });
};

/* __tests__ */

/* application.common.test */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import testingLibraryDom from '@testing-library/dom';

import run from '../src/application.js';

const { screen, within } = testingLibraryDom;

let shuffleIsEnabled = false;
const activeCellClassName = 'table-active';
const shuffle = (array) => _.shuffle(array);
const identity = (array) => _.identity(array);
const getElement = {
  table: () => screen.getByRole('table'),
  cells: () => screen.getAllByRole('cell'),
  cell: (rowNumber, columnNumber) => {
    const row = screen.getAllByRole('row')[rowNumber - 1];
    const cells = within(row).getAllByRole('cell');
    return cells[columnNumber - 1];
  },
};
const expectedUnshuffleValues = [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 0];

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run(shuffleIsEnabled ? shuffle : identity);
});

test('Table rendering without shuffle', () => {
  const table = getElement.table();
  expect(table).toBeInTheDocument();

  const rightDownCell = getElement.cell(4, 4);
  expect(rightDownCell).toHaveClass(activeCellClassName);
  expect(rightDownCell).not.toHaveTextContent();

  const cells = getElement.cells();
  const values = cells.map(({ textContent }) => Number(textContent));
  expect(values).toEqual(expectedUnshuffleValues);

  shuffleIsEnabled = true;
});

test('Table rendering with shuffle', () => {
  const table = getElement.table();
  expect(table).toBeInTheDocument();

  const rightDownCell = getElement.cell(4, 4);
  expect(rightDownCell).toHaveClass(activeCellClassName);
  expect(rightDownCell).not.toHaveTextContent();

  const cells = getElement.cells();
  const values = cells.map(({ textContent }) => Number(textContent));
  expect(values).not.toEqual(expectedUnshuffleValues);

  shuffleIsEnabled = false;
});

/* application.snapshot.test */

import fs from 'fs';
import path from 'path';
import prettier from 'prettier';

import run from '../src/application.js';

const pressKey = (key) => {
  const e = new KeyboardEvent('keyup', { key });
  document.dispatchEvent(e);
};

const options = {
  parser: 'html',
  htmlWhitespaceSensitivity: 'ignore',
  tabWidth: 4,
};

const getTree = () => prettier.format(document.body.innerHTML, options);

beforeAll(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.documentElement.innerHTML = initHtml;
  run((ar) => ar);
});

test('application', () => {
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowRight');
  pressKey('ArrowLeft');
  pressKey('ArrowLeft');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowRight');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowDown');
  pressKey('ArrowDown');
  expect(getTree()).toMatchSnapshot();

  pressKey('ArrowUp');
  pressKey('ArrowUp');
  expect(getTree()).toMatchSnapshot();
});
