// Реализуйте функцию normalizeUrl(), которая выполняет так называемую нормализацию данных. Она принимает адрес сайта и возвращает его с https:// в начале.
// Функция принимает адреса в виде АДРЕС или https://АДРЕС, но всегда возвращает адрес в виде https://АДРЕС
// Можно использовать метод startsWith(), чтобы проверить, начинается ли строка с префикса https://. А потом на основе этого добавлять или не добавлять https://.

const normalizeUrl = (site) => {
  let normalizedUrl;

  if (site.startsWith('https://')) {
    normalizedUrl = site;
  } else {
    normalizedUrl = `https://${site}`;
  }

  return normalizedUrl;
};

export default normalizeUrl;

/* __tests__ */

import { test, expect } from '@jest/globals';
import normalizeUrl from '../normalizeUrl';

test('normalizeUrl', () => {
  expect(normalizeUrl('yandex.ru')).toBe('https://yandex.ru');
  expect(normalizeUrl('https://yandex.ru')).toBe('https://yandex.ru');
});
