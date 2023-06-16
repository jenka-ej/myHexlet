// Реализуйте класс HTMLPairElement (наследуется от HTMLElement), который отвечает за генерацию представления парных элементов и работу с телом. 
// Класс должен содержать следующие методы:
// 1) toString()
// 2) getTextContent()
// 3) setTextContent(body)

import HTMLElement from './HTMLElement.js';

class HTMLPairElement extends HTMLElement {
  toString() {
    const tagName = this.getTagName();
    const attributes = this.stringifyAttributes();
    const body = this.getTextContent();
    return `<${tagName}${attributes}>${body}</${tagName}>`;
  }

  getTextContent() {
    if (this.body === undefined) {
      this.body = '';
    }
    return this.body;
  }

  setTextContent(body) {
    this.body = body;
  }
}
export default HTMLPairElement;

/* HTMLDivElement.js */
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
