// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход тег и возвращает его текстовое представление.
// В структуре тега есть три специальных ключа:
// 1) name — имя тега
// 2) tagType — тип тега, определяет его парность (pair) или одиночность (single)
// 3) body — тело тега, используется для парных тегов. Если у парного тега нет содержимого, то body равно пустой строке ''
// Всё остальное становится атрибутами тега и не зависит от того, парный он или нет.

export default (mainTag) => {
  const mainTagKeys = Object.keys(mainTag);
  const buildAttr = (keys) => {
    const attribute = keys.reduce((acc, key) => {
      if (key === 'name' || key === 'tagType' || key === 'body') {
        return acc;
      }
      if (acc === '') {
        return `${acc}${key}="${mainTag[key]}"`;
      }
      return `${acc} ${key}="${mainTag[key]}"`;
    }, '');
    if (attribute === '') {
      return attribute;
    }
    return ` ${attribute}`;
  };
  const tagSettings = {
    single: (tag) => `<${tag.name}${buildAttr(mainTagKeys)}>`,
    pair: (tag) => `<${tag.name}${buildAttr(mainTagKeys)}>${tag.body ? tag.body : ''}</${tag.name}>`,
  };

  return tagSettings[mainTag.tagType](mainTag);
};

/* __tests__ */

import randomWords from 'random-words';
import stringify from '../html.js';

describe('stringify', () => {
  it('test 1', () => {
    const tag = {
      name: 'hr',
      class: 'px-3',
      id: 'myid',
      tagType: 'single',
    };
    const html = stringify(tag);

    const expected = '<hr class="px-3" id="myid">';
    expect(html).toBe(expected);
  });

  it('test 2', () => {
    const tag = {
      name: 'p',
      tagType: 'pair',
      body: 'text',
    };
    const html = stringify(tag);

    const expected = '<p>text</p>';
    expect(html).toBe(expected);
  });

  it('test 3', () => {
    const tag = {
      name: 'div',
      tagType: 'pair',
      body: 'text2',
      id: 'wow',
    };
    const html = stringify(tag);

    const expected = '<div id="wow">text2</div>';
    expect(html).toBe(expected);
  });

  it('test random attribute', () => {
    const randomAttr = randomWords();
    const tag = {
      name: 'div',
      tagType: 'pair',
      body: 'text2',
      id: 'wow',
      [randomAttr]: 'value',
    };
    const html = stringify(tag);

    const expected = `<div id="wow" ${randomAttr}="value">text2</div>`;
    expect(html).toBe(expected);
  });
});
