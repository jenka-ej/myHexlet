// Реализуйте и экспортируйте по умолчанию функцию, которая при вызове делает переход на страницу и возвращает строку с кодовым именем браузера, 
// его версией и текущей открытой страницей.
// Адрес страницы передаётся через параметр, а результат должен быть в виде строки и разделяться пробелами.

export default function solution(url) {
  window.location.href = url;
  return `${navigator.appCodeName}/${navigator.appVersion} ${url}`;
}

/* __tests__ */

import '@testing-library/jest-dom';
import jest from 'jest-mock';
import solution from '../public/solution.js';

const assignMock = jest.fn();

delete window.location;
window.location = { assign: assignMock };

afterEach(() => {
  assignMock.mockClear();
});

test('application', () => {
  expect(solution('https://hexlet.io')).toMatch(/Mozilla\/\d\.\d https:\/\/hexlet\.io/);
});
