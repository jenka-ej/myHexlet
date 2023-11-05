// Реализуйте описание обощенного типа MyArray, который представляет из себя аналог массива из JavaScript. Пример использования объекта этого типа:

// const coll: MyArray<number> = ...;
// coll.push(1); // 1
// coll.push(10); // 2
// coll.push(99); // 3
 
// const newColl = coll.filter((value) => value % 2 == 0);

// console.log(newColl.items); // [10]

// Тип включает в себя два метода: push() и filter() совпадающие по сигнатуре с методами Array. Данные внутри должны храниться в свойстве items.

type MyArray<T> = {
  items: Array<T>;
  push(item: T): number;
  filter(callback: (item: T, index: number) => boolean): MyArray<T>;
};

export default MyArray;

/* __tests__ */

import * as ta from 'type-assertions';

import MyArray from '../solution';

test('MyArray', () => {
  const coll: MyArray<number> = {
    items: [],
    push(value) {
      return this.items.push(value);
    },
    filter(callback) {
      const newItems = this.items.filter(callback);
      return { ...this, items: newItems };
    },
  };

  expect(coll.push(1)).toBe(1);
  expect(coll.push(2)).toBe(2);
  expect(coll.push(5)).toBe(3);

  ta.assert<ta.Equal<Parameters<MyArray<string>['push']>, [string]>>();
  ta.assert<ta.Equal<ReturnType<MyArray<string>['push']>, number>>();
});
