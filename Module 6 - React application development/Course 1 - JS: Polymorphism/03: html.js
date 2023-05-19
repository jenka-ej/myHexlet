// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход список тегов, находит среди них теги a, link и img, 
// а затем извлекает ссылки и возвращает список ссылок. Теги подаются на вход в виде массива, где каждый элемент это тег. Тег имеет следующую структуру:
// 1) name — имя тега
// 2) href или src — атрибуты. Атрибуты зависят от тега: тег img имеет атрибут src, тег a — href, link — href

export default (tags) => {
  const settings = {
    img: 'src',
    a: 'href',
    link: 'href',
  };
  return tags.reduce((acc, tag) => {
    const attribute = settings[tag.name];
    if (attribute) {
      acc.push(tag[attribute]);
      return acc;
    }
    return acc;
  }, []);
};

/* __tests__ */

import getLinks from '../html.js';

describe('getLinks', () => {
  it('test 1', () => {
    const tags = [];
    const links = getLinks(tags);

    const expected = [];
    expect(links).toEqual(expected);
  });

  it('test 2', () => {
    const tags = [
      { name: 'p' },
      { name: 'a', href: 'hexlet.io' },
      { name: 'img', src: 'hexlet.io/assets/logo.png' },
    ];
    const links = getLinks(tags);

    const expected = [
      'hexlet.io',
      'hexlet.io/assets/logo.png',
    ];
    expect(links).toEqual(expected);
  });

  it('test 3', () => {
    const tags = [
      { name: 'img', src: 'hexlet.io/assets/logo.png' },
      { name: 'div' },
      { name: 'link', href: 'hexlet.io/assets/style.css' },
      { name: 'h1' },
    ];
    const links = getLinks(tags);

    const expected = [
      'hexlet.io/assets/logo.png',
      'hexlet.io/assets/style.css',
    ];
    expect(links).toEqual(expected);
  });

  it('test 4', () => {
    const tags = [
      { name: 'invalidTag', src: 'hexlet.io/assets/invalid.png' },
      { name: 'img', src: 'hexlet.io/assets/logo.png' },
      { name: 'div' },
      { name: 'link', href: 'hexlet.io/assets/style.css' },
      { name: 'h1' },
    ];
    const links = getLinks(tags);

    const expected = [
      'hexlet.io/assets/logo.png',
      'hexlet.io/assets/style.css',
    ];
    expect(links).toEqual(expected);
  });
});
