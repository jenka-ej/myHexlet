// Напишите тесты для функции get(obj, key, defaultValue). Эта функция извлекает значение из объекта при условии, что ключ существует. 
// В ином случае возвращается defaultValue.
// Тесты должны быть построены по такому же принципу, как это описывалось в теории урока: проверка через if и исключение в случае провала теста.
// Для хорошего тестирования этой функции понадобится как минимум три теста:
// 1) Проверка, что функция возвращает нужное значение по существующему ключу (прямой тест на работоспособность)
// 2) Проверка на то, что возвращается значение по умолчанию, если ключа нет
// 3) Проверка на то, что возвращается значение по существующему ключу, даже если передано значение по умолчанию (пограничный случай)

import _ from 'lodash';

const functions = {
  right1: _.get,
  fail1: (obj = {}, key = null) => obj[key],
  fail2: (obj = {}, key = null, defaultValue = null) => defaultValue || obj[key],
  fail3: (obj = {}, key = null, defaultValue = null) => ((obj[key] && !defaultValue)
    ? null
    : _.get(obj, key, defaultValue)
  ),
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return functions[name];
};

/* __tests__ */

import getFunction from '../functions.js';

const get = getFunction();

if (get({ key: 'value' }, 'key') !== 'value') {
  throw new Error('boom!');
}
if (get({}, 'key', 'value') !== 'value') {
  throw new Error('boom!');
}
if (get({ key: 'value' }, 'key', 'default value') !== 'value') {
  throw new Error('boom!');
}
