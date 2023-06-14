// Реализуйте класс HTMLDivElement, который описывает собой парный тег <div>.

import HTMLPairElement from './HTMLPairElement.js';

class HTMLDivElement extends HTMLPairElement {
  getTagName() {
    return 'div';
  }
}

export default HTMLDivElement;

/* HTMLElement.js */

export default class HTMLElement {
  constructor(attributes = {}) {
    this.attributes = Object.entries(attributes);
  }

  stringifyAttributes() {
    if (this.attributes.length === 0) {
      return '';
    }

    const line = this.attributes
      .map(([attr, value]) => `${attr}="${value}"`)
      .join(' ');

    return ` ${line}`;
  }
}

/* __tests_ */

import HTMLDivElement from '../HTMLDivElement.js';

test('without params', () => {
  const expected = '<div></div>';
  const div = new HTMLDivElement();
  expect(`${div}`).toEqual(expected);
});

test('with params', () => {
  const expected = '<div class="w-75" id="wop"></div>';
  const div = new HTMLDivElement({ class: 'w-75', id: 'wop' });
  expect(`${div}`).toEqual(expected);
});

test('with params and context', () => {
  const expected = '<div name="div" data-toggle="true">Body</div>';
  const div = new HTMLDivElement({ name: 'div', 'data-toggle': true });
  div.setTextContent('Body');
  expect(`${div}`).toEqual(expected);
});
