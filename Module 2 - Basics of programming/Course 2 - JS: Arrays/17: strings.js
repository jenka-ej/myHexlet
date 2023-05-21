// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход строку, состоящую только из открывающих и закрывающих скобок разных типов, 
// и проверяет, является ли эта строка сбалансированной. Открывающие и закрывающие скобки должны быть одного вида. 
// Пустая строка (отсутствие скобок) считается сбалансированной.
// Строка считается корректной (сбалансированной), если содержащаяся в ней скобочная структура соответствует требованиям:
// 1) Скобки — это парные структуры. У каждой открывающей скобки должна быть соответствующая ей закрывающая скобка
// 2) Скобки должны закрываться в правильном порядке
// Функция должна поддерживать, минимум, четыре вида скобок: круглые — (), квадратные — [], фигурные — {} и угловые — <>.

const isOpeningSymbol = (symbol) => openingSymbols.includes(symbol);
const getClosingSymbolFor = (symbol) => {
  for (let i = 0; i < closingSymbols.length; i += 1) {
    if (openingSymbols[i] === symbol) {
      return closingSymbols[i];
    }
  }
  return null;
};

export default (str) => {
  const stack = [];
  for (const symbol of str) {
    if (isOpeningSymbol(symbol)) {
      const closingSymbol = getClosingSymbolFor(symbol);
      stack.push(closingSymbol);
    } else {
      const lastSavedSymbol = stack.pop();
      if (symbol !== lastSavedSymbol) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

/* __tests__ */

import isBracketStructureBalanced from '../strings.js';

test('should be balanced', () => {
  const str = '()';
  expect(isBracketStructureBalanced(str)).toBe(true);

  const str2 = '[()]';
  expect(isBracketStructureBalanced(str2)).toBe(true);

  const str3 = '({}[])';
  expect(isBracketStructureBalanced(str3)).toBe(true);

  const str4 = '(<><<{[()]}>>)';
  expect(isBracketStructureBalanced(str4)).toBe(true);

  const str5 = '';
  expect(isBracketStructureBalanced(str5)).toBe(true);
});

test('should not be balanced', () => {
  const str1 = '((';
  expect(isBracketStructureBalanced(str1)).toBe(false);

  const str2 = '[[()]';
  expect(isBracketStructureBalanced(str2)).toBe(false);

  const str3 = '({}}[]';
  expect(isBracketStructureBalanced(str3)).toBe(false);

  const str4 = '(<><<{[()]}>>>)';
  expect(isBracketStructureBalanced(str4)).toBe(false);

  const str5 = '}';
  expect(isBracketStructureBalanced(str5)).toBe(false);

  const str6 = '([)]';
  expect(isBracketStructureBalanced(str6)).toBe(false);

  const str7 = '([))';
  expect(isBracketStructureBalanced(str7)).toBe(false);
});
