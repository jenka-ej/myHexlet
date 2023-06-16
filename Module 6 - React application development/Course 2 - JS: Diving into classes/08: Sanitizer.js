// Создайте класс Sanitizer, содержащий метод sanitize(text). Он должен отрезать концевые пробелы и возвращать результат наружу.

class Sanitizer {
  sanitize(text) {
    return text.trim();
  }
}

export default Sanitizer;

/* src/SanitizerStripTagsDecorator.js */
// Создайте класс (декоратор) SanitizerStripTagsDecorator. Он принимает в конструктор исходный санитайзер и дополнительно к его логике, 
// выполняет очистку текста от тегов. Очистка текста от тегов должна идти раньше чем отрезание концевых пробелов.
// Для очистки тегов допишите реализацию функции stripTags(tagString), которая принимает строку HTML, парсит её и возвращает текстовое содержимое.

import cheerio from 'cheerio';

const stripTags = (tagString) => {
  const $ = cheerio.load(tagString);
  return $.text();
};

class SanitizerStripTagsDecorator {
  constructor(baseClass) {
    this.baseClass = baseClass;
  }

  sanitize(tagString) {
    return this.baseClass.sanitize(stripTags(tagString));
  }
}

export default SanitizerStripTagsDecorator;

/* Application.js */

export default class Application {
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }

  run(text) {
    return this.sanitizer.sanitize(text);
  }
}

/* __tests__ */

import Application from '../src/Application.js';
import Sanitizer from '../src/Sanitizer.js';
import SanitizerStripTagsDecorator from '../src/SanitizerStripTagsDecorator.js';

test('Sanitizer', () => {
  const sanitizer = new Sanitizer();
  const decorated = new SanitizerStripTagsDecorator(sanitizer);
  const app = new Application(decorated);
  expect(app.run('<p>text<p>')).toEqual('text');
  expect(app.run('  <hr>   another text ')).toEqual('another text');
});
