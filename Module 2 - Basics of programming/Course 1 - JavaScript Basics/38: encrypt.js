// Сэмвелл обнаружил, что его сообщения перехватываются в замке «Близнецы» и там читаются. 
// Из-за этого их атаки перестали быть внезапными. Немного подумав, он разработал программу, которая бы шифровала сообщения по следующему алгоритму. 
// Она бы брала текст и переставляла в нем каждые два подряд идущих символа.
// Реализуйте функцию encrypt(), которая принимает на вход исходное сообщение и возвращает зашифрованное.

const encrypt = (str) => {
  let result = '';
  for (let i = 0; i < str.length; i += 2) {
    const nextSymbol = str[i + 1] || '';
    result = `${result}${nextSymbol}${str[i]}`;
  }

  return result;
};

export default encrypt;

/* __tests__ */

import encrypt from '../encrypt.js';

test('encrypt', () => {
  expect(encrypt('attack')).toEqual('taatkc');
  expect(encrypt('go!')).toEqual('og!');
  expect(encrypt('back!')).toEqual('abkc!');
  expect(encrypt('car!')).toEqual('ac!r');
});
