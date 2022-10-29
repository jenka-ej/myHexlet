// ОЧЕНЬ СЛОЖНАЯ ЗАДАЧКА*
// solution.js
// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает список нод в соответствии с запросом. 
// Запрос это список из имен тегов, в котором каждый следующий тег это тег, вложенный в предыдущий. Порядок, в котором ноды возвращаются - не важен.
// У нас есть такой HTML:

// <h1>scheme</h1>
// <p>is a lisp</p>
// <p>
//   <ul>
//     <li>item 2</li>
//     <li>item 1</li>
//   </ul>
// </p>
// <ol>
//   <li>item 2</li>
//   <li>item 1</li>
// </ol>
// <p>is a functional language</p>
// <ul>
//   <li>item</li>
// </ul>
// <div>
//   <p>another text</p>
// </div>
// <div>
//   <div>
//     <p>
//       <span>text</span>
//     </p>
//   </div>
// </div>
// <div>
//   <a>
//     <div>
//       <p>
//         <span>text</span>
//       </p>
//     </div>
//   </a>
// </div>
// <h1>prolog</h1>
// <p>is about logic</p>
// Строим HTML следующим образом:

// const dom1 = make();
// const dom2 = append(dom1, node('h1', 'scheme'));
// const dom3 = append(dom2, node('p', 'is a lisp'));
// const children1 = l(node('li', 'item 1'), node('li', 'item 2'));
// const dom4 = append(dom3, node('p', l(node('ul', children1))));
// const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
// const dom5 = append(dom4, node('ol', children2));
// const dom6 = append(dom5, node('p', 'is a functional language'));
// const children3 = l(node('li', 'item'));
// const dom7 = append(dom6, node('ul', children3));
// const dom8 = append(dom7, node('div', l(node('p', 'another text'))));
// const dom9 = append(dom8, node('div', l(node('div', l(node('p', l(node('span', 'text'))))))));
// const dom10 = append(dom9, node('div', l(node('a', l(node('div', l(node('p', l(node('span', 'text'))))))))));
// const dom11 = append(dom10, node('h1', 'prolog'));
// dom = append(dom11, node('p', 'is about logic'));
// Пример работы функции, где для наглядности показано какой она будет возвращать результат если выводить его на экран (htmlToString()):

// select(l('p', 'ul', 'li'), dom);
// <li>item 1</li><li>item 2</li>
 
// select(l('div', 'div', 'p'), dom);
// <p><span>text</span></p>
 
// select(l('div', 'p'), dom);
// <p>another text</p><p><span>text</span></p><p><span>text</span></p>
 
// select(l('div'), dom));
// <div><a><div><p><span>text</span></p></div></a></div><div><p><span>text</span></p></div><div><div><p><span>text</span></p></div></div><div><p><span>text</span></p></div><div><p>another text</p></div>

import { l, isEmpty, head, tail, concat, toString as listToString } from '@hexlet/pairs-data'; // eslint-disable-line
import { is, toString as htmlToString, hasChildren, children, reduce, filter, map } from '@hexlet/html-tags'; // eslint-disable-line

const select = (query1, html) => {
  // Формирую первый редьюс, вытаскивающий узлы с любой глубины дерева по первому тегу head(query1)
  const cb1 = (node1, acc1) => {
    if (hasChildren(node1)) {
      if (is(head(query1), node1)) {
        return reduce(cb1, concat(l(node1), acc1), children(node1));
      }
      return reduce(cb1, acc1, children(node1));
    }
    if (is(head(query1), node1)) {
      return concat(l(node1), acc1);
    }
    return acc1;
  };
  // Если список (query1) пустой, то возвращаю редьюс
  if (isEmpty(tail(query1))) {
    return reduce(cb1, l(), html);
  }
  // Формирую второй select, для того чтоб последовательно фильтровать теги по условию query1
  const select2 = (query2, html2) => {
    const cb2 = (node2, acc2) => {
      // Формирую редьюс для детей текущих элементов
      if (hasChildren(node2)) {
        return concat(children(node2), acc2);
      }
      return acc2;
    };
    // Если список закончился, то возвращаю отфильтрованное значение предыдущего редьюса
    if (isEmpty(tail(query2))) {
      return filter((el) => is(head(query2), el), reduce(cb2, l(), html2));
    }
    // Если список не закончился, то рекурсивно вызываю функцию select2 со следующим тегом из списка
    return select2(tail(query2), filter((el) => is(head(query2), el), reduce(cb2, l(), html2)));
  };
  // Возвращаю результат
  return select2(tail(query1), reduce(cb1, l(), html));
};
export default select;

/* __tests__ */

import { l, length } from '@hexlet/pairs-data';
import { make, append, node } from '@hexlet/html-tags';
import select from '../solution.js';

describe('dom', () => {
  let dom;

  beforeEach(() => {
    const dom1 = make();
    const dom2 = append(dom1, node('h1', 'scheme'));
    const dom3 = append(dom2, node('p', 'is a lisp'));
    const children1 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom4 = append(dom3, node('p', l(node('ul', children1))));
    const children2 = l(node('li', 'item 1'), node('li', 'item 2'));
    const dom5 = append(dom4, node('ol', children2));
    const dom6 = append(dom5, node('p', 'is a functional language'));
    const children3 = l(node('li', 'item'), node('li', 'item'));
    const dom7 = append(dom6, node('ul', children3));
    const dom8 = append(dom7, node('div', l(node('p', 'another text'))));
    const dom9 = append(dom8, node('div', l(node('div', l(node('p', l(node('span', 'text'))))))));
    const dom10 = append(dom9, node('div', l(node('a', l(node('div', l(node('p', l(node('span', 'text'))))))))));
    const dom11 = append(dom10, node('h1', 'prolog'));
    const dom12 = append(dom11, node('p', 'is about logic'));
    dom = append(dom12, node('span', l(node('ul', l(node('div', l(node('div', l(node('p'))))))))));
  });

  it('#select', () => {
    expect(length(select(l('ul'), dom))).toBe(3);
    expect(length(select(l('p', 'ul', 'li'), dom))).toBe(2);
    expect(length(select(l('div', 'div', 'p'), dom))).toBe(2);
    expect(length(select(l('div', 'p'), dom))).toBe(4);
    expect(length(select(l('div', 'a'), dom))).toBe(1);
    expect(length(select(l('div'), dom))).toBe(7);
  });
});
