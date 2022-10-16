// Дан массив чисел. Каждое число в массиве встречается четное количество раз, кроме одного. 
// Реализуйте и экспортируйте функцию по умолчанию, которая принимает массив чисел и возвращает число, которое встречается нечетное количество раз.

const findOdd = (array) => {
  let result;
  array.map((number1) => {
    let count = 0;
    array.map((number2) => {
      if (number1 === number2) {
        count += 1;
      }
      return null;
    });
    if (count % 2 !== 0) {
      result = number1;
      return null;
    }
    return null;
  });
  return result;
};
export default findOdd;

/* __tests__ */

import findOdd from '../findOdd.js';

describe('HexletLinq', () => {
  it('numbers 1', () => {
    const numbers = [1, 2, 5, 2, 3, 5, 1, 7, 3];
    expect(findOdd(numbers)).toBe(7);
  });

  it('numbers 2', () => {
    const numbers = [20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5];
    expect(findOdd(numbers)).toBe(5);
  });

  it('numbers 3', () => {
    const numbers = [1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5];
    expect(findOdd(numbers)).toBe(-1);
  });
});
