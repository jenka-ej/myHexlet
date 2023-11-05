// Реализуйте описание обощенного типа MyMap, который представляет из себя аналог массива из JavaScript. Пример использования объекта этого типа:

// const map: MyMap<string, number> = ...;
// map.set('one', 1);
// map.set('two', 2);
 
// map.get('one'); // 1
// map.get('two'); // 2

// Тип включает в себя два метода set() и get(). Первый метод принимает два дженерик-параметра: ключ и значение.
// Второй метод принимает ключ и возвращает значение. Значения хранятся внутри объекта в поле values в виде встроенного в JavaScript класса Map().

type MyMap<K, V> = {
  values: Map<K, V>;
  set(key: K, value: V): void;
  get(key: K): V | undefined;
};

export default MyMap;

/* __tests__ */

import * as ta from 'type-assertions';

import MyMap from '../solution';

test('MyMap', () => {
  const map: MyMap<string, number> = {
    values: new Map(),
    set(key, value) {
      this.values.set(key, value);
    },
    get(key) {
      return this.values.get(key);
    },
  };

  map.set('one', 1);
  map.set('two', 2);

  expect(map.get('one')).toBe(1);
  expect(map.get('two')).toBe(2);

  ta.assert<ta.Equal<Parameters<MyMap<string, string>['set']>, [string, string]>>();
});
