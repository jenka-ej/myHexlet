// В данном упражнении необходимо реализовать стековую машину, то есть алгоритм, проводящий вычисления по обратной польской записи.
// Обратная польская нотация или постфиксная нотация — форма записи математических и логических выражений,
// в которой операнды расположены перед знаками операций. Выражение читается слева направо.
// Когда в выражении встречается знак операции, выполняется соответствующая операция над двумя ближайшими операндами, находящимися слева от знака операции.
// Результат операции заменяет в выражении последовательность её операндов и знак, после чего выражение вычисляется дальше по тому же правилу.
// Таким образом, результатом вычисления всего выражения становится результат последней вычисленной операции.
// Например, выражение (1 + 2) * 4 + 3 в постфиксной нотации будет выглядеть так: 1 2 + 4 * 3 +, а результат вычисления: 15.
// Другой пример - выражение: 7 - 2 * 3, в постфиксной нотации: 7 2 3 * -, результат: 1.

// Экспортируйте по умолчанию функцию, которая принимает массив, каждый элемент которого содержит число или знак операции (+, -, *, /).
// Функция должна вернуть результат вычисления по обратной польской записи. Если в какой-то момент происходит деление на ноль,
// функция должна вернуть значение null.
// calcInPolishNotation([1, 2, '+', 4, '*', 3, '+']); // 15
// calcInPolishNotation([7, 2, 3, '*', '-']); // 1

const calc = (array) => {
  const toResult = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => {
      if (b === 0) {
        return null;
      }
      return a / b;
    },
  };
  if (array.includes(null)) {
    return null;
  }
  if (array.length === 1) {
    return array[0];
  }
  if (typeof array[2] === 'number') {
    const firstPart = array.slice(0, 1);
    const secondPart = [toResult[array[3]](array[1], array[2])];
    const lastPart = array.slice(4, array.length);
    return calc([...firstPart, ...secondPart, ...lastPart]);
  }
  const firstPart = [toResult[array[2]](array[0], array[1])];
  const lastPart = array.slice(3, array.length);
  return calc([...firstPart, ...lastPart]);
};

export default calc;

/* __tests__ */

import calcInPolishNotation from '../solution.js';

test('polish notation', () => {
  expect(calcInPolishNotation([1, 2, '+', 4, '*', 3, '+'])).toBe(15);
  expect(calcInPolishNotation([1, 2, '+', 4, '*', 3, '/'])).toBe(4);
  expect(calcInPolishNotation([7, 2, 3, '*', '-'])).toBe(1);
  expect(calcInPolishNotation([1, 2, '+', 2, '*'])).toBe(6);
  expect(calcInPolishNotation([1, 2, '+', 4, '*', 0, '/'])).toBe(null);
  expect(calcInPolishNotation([3, 0, '/', 2, '+'])).toBe(null);
  expect(calcInPolishNotation([7, 12, 2, '/', '-'])).toBe(1);
  expect(calcInPolishNotation([8, 6, 2, '-', '/'])).toBe(2);
  expect(calcInPolishNotation([5, 2, '-', 0, '+'])).toBe(3);
});
