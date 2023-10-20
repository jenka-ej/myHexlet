// Реализуйте функцию getField(), которая генерирует игровое поле для крестиков ноликов.
// Функция принимает на вход размерность поля и возвращает массив массивов нужного размера, заполненный значениями null.

// const field1 = getField(1);
// console.log(field1);
// [[null]]
 
// const field2 = getField(2);
// console.log(field2);
// [[null, null], [null, null]]

function getField(size: number): null[][] {
  const cell: null[] = [];
  const result: null[][] = [];
  for (let i = 0; i < size; i += 1) {
    cell.push(null);
  }
  for (let i = 0; i < size; i += 1) {
    result.push(cell);
  }
  return result;
}

export default getField;

/* __tests__ */

import getField from '../solution';

test('function', () => {
  expect(getField(1)).toEqual([[null]]);
  expect(getField(2)).toEqual([[null, null], [null, null]]);
  expect(getField(3)).toEqual(
    [[null, null, null], [null, null, null], [null, null, null]],
  );
});
