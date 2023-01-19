// Реализуйте и экспортируйте функцию по умолчанию, которая находит текст (дочерние текстовые узлы) внутри элемента <div> и оборачивает текст в параграф. 
// Переводы строк и отступы изменяться не должны.

export default function prettify(document) {
  const divs = Array.from(document.querySelectorAll('div'));
  return divs.map((node) => {
    const nodeListArray = Array.from(node.childNodes);
    return nodeListArray.map((nodeListEl) => {
      if (nodeListEl instanceof Text) {
        if (nodeListEl.nodeValue.trim() === '') {
          return null;
        }
        const el = document.createElement('p');
        el.textContent = nodeListEl.nodeValue;
        nodeListEl.replaceWith(el);
        return null;
      }
      return null;
    });
  });
}

/* __tests__ */

import prettify from '../src/prettify.js';

test('prettify paragraph', () => {
  const expected = '<p>Text</p>';
  document.documentElement.innerHTML = expected;
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('prettify text in div', () => {
  const expected = '<div><p>Text</p></div>';
  document.documentElement.innerHTML = '<div>Text</div>';
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('prettify multiple text nodes in multiple divs', () => {
  const expected = 'Text<div><div><p>Text</p></div><p>Op</p></div><div><p>My</p></div>';
  document.documentElement.innerHTML = 'Text<div><div>Text</div><p>Op</p></div><div>My</div>';
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('prettify with different levels', () => {
  const expected = `Text
  <div>
    <div><p>Text</p></div>
    <p>Op</p>
  </div>
  <div><p>My</p></div>`;
  document.documentElement.innerHTML = `Text
  <div>
    <div>Text</div>
    <p>Op</p>
  </div>
  <div>My</div>`;
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('prettify complex tree', () => {
  const expected = `Text
  <div>
    <div><p>complex</p><div><p>test</p></div></div>
    <div><p>Text</p></div>
    <p>Op</p>
  </div>
  <div><p>My</p></div>`;
  document.documentElement.innerHTML = `Text
  <div>
    <div>complex<div>test</div></div>
    <div>Text</div>
    <p>Op</p>
  </div>
  <div>My</div>`;
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});

test('prettify text and paragraph in same div', () => {
  const expected = '<div><p>text1</p><p>something</p><p>text2</p></div>';
  document.documentElement.innerHTML = '<div>text1<p>something</p>text2</div>';
  prettify(document);
  expect(document.body.innerHTML).toEqual(expected);
});
