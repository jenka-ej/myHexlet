// Однажды вы сидели дома, когда курьер Василий принес вам коробку. С коробкой шла записка следующего содержания:
// Коробка состоит из двух отсеков, в одном из которых письмо, а в другом лежит еще одна коробка, в которой также два отсека и точно также один отсек с письмом, 
// а в другом - коробка. Коробки могут быть вложены друг в друга сколько угодно раз. 
// Вам нужно добраться до коробки, внутри которой нет вложенной коробки ни в одном из двух отсеков, и отдать ее курьеру.
// Подчеркну, что во всех коробках, кроме той последней, в одном отсеке письмо (любые данные, которые не являются парой), а в другом - всегда коробка, 
// но никогда не две коробки одновременно. Сами отсеки при этом могут меняться, то есть в одной коробке отсеком с письмом может быть первый, а в другой - последний.
// Реализуйте рекурсивную функцию findPrimitiveBox(), которая принимает на вход "коробку" (пару), находит внутри нее пару без вложенных пар (как описано выше) и 
// возвращает наружу.

import { car, cdr, isPair, toString } from '@hexlet/pairs'; 

const findPrimitiveBox = (pair) => {
  const pairCar = car(pair);
  const pairCdr = cdr(pair);
  if (isPair(pairCar)) {
    return findPrimitiveBox(pairCar);
  }
  if (isPair(pairCdr)) {
    return findPrimitiveBox(pairCdr);
  }
  return pair;
};
export default findPrimitiveBox;

/* __tests__ */

import { cons, toString } from '@hexlet/pairs';
import findPrimitiveBox from '../findPrimitiveBox.js';

test('findPrimitiveBox', () => {
  const pair1 = cons(
    cons(1, cons(cons(true, 5), null)),
    8,
  );
  expect(toString(findPrimitiveBox(pair1))).toBe(toString(cons(true, 5)));

  const pair2 = cons(
    null,
    cons(cons('hello', cons(0, cons(null, 'ehu'))), null),
  );
  expect(toString(findPrimitiveBox(pair2))).toBe(toString(cons(null, 'ehu')));

  const pair3 = cons(
    false,
    cons('one', true),
  );
  expect(toString(findPrimitiveBox(pair3))).toBe(toString(cons('one', true)));
});
