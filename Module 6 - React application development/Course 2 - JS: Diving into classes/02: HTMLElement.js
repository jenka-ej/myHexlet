// Реализуйте метод stringifyAttributes(), который формирует строчку для аттрибутов. Используйте этот метод в наследнике для формирования тега.

export default class HTMLElement {
  constructor(attributes = {}) {
    this.attributes = attributes;
  }

  stringifyAttributes() {
    return Object.keys(this.attributes).reduce((acc, key) => {
      const newAcc = `${acc} ${key}="${this.attributes[key]}"`;
      return newAcc;
    }, '');
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
