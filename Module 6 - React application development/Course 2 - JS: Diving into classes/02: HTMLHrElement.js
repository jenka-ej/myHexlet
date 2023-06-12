// Реализуйте класс HTMLHrElement (наследуется от HTMLElement), который отвечает за представление тега <hr>.
// Внутри класса определите функцию toString(), которая возвращает текстовое представление тега.

import HTMLElement from './HTMLElement.js';

export default class HTMLHrElement extends HTMLElement {
  toString() {
    return `<hr${this.stringifyAttributes()}>`;
  }
}

/* __tests__ */

import HTMLHrElement from '../HTMLHrElement.js';

test('HTMLHrElement', () => {
  const hr = new HTMLHrElement();
  const expected = '<hr>';
  expect(hr.toString()).toEqual(expected);

  const hr2 = new HTMLHrElement({ class: 'w-75', id: 'wop' });
  const expected2 = '<hr class="w-75" id="wop">';
  expect(hr2.toString()).toEqual(expected2);
});
