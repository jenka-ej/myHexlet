// Реализуйте класс LabelTag, который умеет оборачивать другие теги.

export default class LabelTag {
  constructor(tag, value) {
    this.tag = tag;
    this.value = value;
  }

  render() {
    return `<label>${this.tag}${this.value}</label>`;
  }

  toString() {
    return this.render();
  }
}

/* InputTag.js */

export default class InputTag {
  constructor(type, value) {
    this.type = type;
    this.value = value;
  }

  render() {
    return `<input type="${this.type}" value="${this.value}">`;
  }

  toString() {
    return this.render();
  }
}

/* __tests__ */

import InputTag from '../tags/InputTag.js';
import LabelTag from '../tags/LabelTag.js';

it('test tags', () => {
  const inputTag = new InputTag('submit', 'Save');
  const labelTag = new LabelTag('Press Submit', inputTag);
  const expected = '<label>Press Submit<input type="submit" value="Save"></label>';
  expect(labelTag.render()).toBe(expected);
});
