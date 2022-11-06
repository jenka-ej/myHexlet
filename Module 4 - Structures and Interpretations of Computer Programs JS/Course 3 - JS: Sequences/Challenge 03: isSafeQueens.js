// Задача о восьми ферзях — широко известная задача по расстановке фигур на шахматной доске. 
// Исходная формулировка: "Расставить на стандартной 64-клеточной шахматной доске 8 ферзей так, чтобы ни один из них не находился под боем другого". 
// Подразумевается, что ферзь бьёт все клетки, расположенные по вертикалям, горизонталям и обеим диагоналям.
// Задачу можно обобщить следующим образом: "На шахматной доске со стороной N, расставить N ферзей так, чтобы ни один из них не находился под боем другого".

// Реализуйте и экспортируйте по умолчанию функцию, которая принимает комбинацию ферзей в виде списка и проверяет, является ли данная расстановка решением задачи.
// Комбинации формируются следующим образом:
// (2, 4, 1, 3)
// где каждое число — это позиция ферзя по вертикали, а порядок числа в списке — позиция ферзя по горизонтали.

import { cons, car, cdr, toString as pairToString } from '@hexlet/pairs'; // eslint-disable-line
import { l, isEmpty, reverse, toString as listToString, isList, head, tail, cons as consList, reduce } from '@hexlet/pairs-data'; // eslint-disable-line

const isSafeQueens = (list) => {
  const cb = (el, acc) => {
    const pos = el;
    const cb2 = (el2, acc2) => {
      if (pos === el2 || pos + car(acc2) === el2 || pos - car(acc2) === el2) {
        const newAcc2 = cons(car(acc2) + 1, false);
        return newAcc2;
      }
      const newAcc2 = cons(car(acc2) + 1, cdr(acc2));
      return newAcc2;
    };
    if (cdr(reduce(cb2, cons(1, true), tail(car(acc)))) === false) {
      const newAcc = cons(tail(car(acc)), cdr(reduce(cb2, cons(1, true), tail(car(acc)))));
      return newAcc;
    }
    const newAcc = cons(tail(car(acc)), cdr(acc));
    return newAcc;
  };
  return cdr(reduce(cb, cons(list, true), list));
};
export default isSafeQueens;

/* __tests__ */

import { l } from '@hexlet/pairs-data';
import isSafeQueens from '../isSafeQueens.js';

describe('Is Safe Queens', () => {
  it('safe', () => {
    const queens1 = l(2, 4, 1, 3);
    expect(isSafeQueens(queens1)).toBe(true);

    const queens2 = l(3, 6, 2, 5, 1, 4);
    expect(isSafeQueens(queens2)).toBe(true);

    const queens3 = l(1, 5, 8, 6, 3, 7, 2, 4);
    expect(isSafeQueens(queens3)).toBe(true);

    const queens4 = l(2, 4, 6, 1, 3, 5);
    expect(isSafeQueens(queens4)).toBe(true);
  });

  it('not safe', () => {
    const queens1 = l(2, 1, 3);
    expect(isSafeQueens(queens1)).toBe(false);

    const queens2 = l(1, 2, 3, 4, 5, 6);
    expect(isSafeQueens(queens2)).toBe(false);

    const queens3 = l(1, 5, 8, 6, 3, 7, 2, 8);
    expect(isSafeQueens(queens3)).toBe(false);

    const queens4 = l(1, 6, 2, 3, 4, 5);
    expect(isSafeQueens(queens4)).toBe(false);

    const queens5 = l(1, 7, 3, 6, 4, 2, 5, 8);
    expect(isSafeQueens(queens5)).toBe(false);

    const queens6 = l(1, 3, 5, 3, 6, 2);
    expect(isSafeQueens(queens6)).toBe(false);
  });
});
