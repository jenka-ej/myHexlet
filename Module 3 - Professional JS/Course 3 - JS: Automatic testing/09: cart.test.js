// Напишите тесты для корзины интернет-магазина. Интерфейс:
// 1) makeCart() – создаёт новую пустую корзину (объект)
// 2) addItem(good, count) – добавляет в корзину товары и их количество. Товар – это объект с двумя свойствами: name (имя) и price (стоимость)
// 3) getItems() – возвращает список товаров в формате [{ good, count }, { good, count }, ...]
// 4) getCost() – возвращает стоимость корзины. Стоимость корзины высчитывается как сумма всех добавленных товаров с учётом их количества
// 5) getCount() – возвращает количество товаров в корзине

/* right1.js */

import _ from 'lodash';

export default () => ({
  items: [],
  addItem(good, count) {
    this.items.push({ good, count });
  },
  getItems() {
    return this.items;
  },
  getCount() {
    return _.sumBy(this.items, (item) => item.count);
  },
  getCost() {
    return _.sumBy(this.items, (item) => item.good.price * item.count);
  },
});

/* wrong1.js */

import _ from 'lodash';

export default () => ({
  items: [],
  addItem(good, count) {
    this.items.push({ good, count });
  },
  getItems() {
    return this.items;
  },
  getCount() {
    return _.sumBy(this.items, (item) => item.count);
  },
  getCost() {
    return _.sumBy(this.items, (item) => item.good.price);
  },
});

/* wrong2.js */

import _ from 'lodash';

export default () => ({
  items: [],
  addItem(good, count) {
    this.items = [{ good, count }];
  },
  getItems() {
    return this.items;
  },
  getCount() {
    return _.sumBy(this.items, (item) => item.count);
  },
  getCost() {
    return _.sumBy(this.items, (item) => item.good.price * item.count);
  },
});

/* wrong3.js */

import _ from 'lodash';

export default () => ({
  items: [],
  addItem(good, count) {
    this.items.push({ good, count });
  },
  getItems() {
    return this.items;
  },
  getCount() {
    return this.items.length;
  },
  getCost() {
    return _.sumBy(this.items, (item) => item.good.price * item.count);
  },
});

/* index.js */

import right1 from './right1.js';
import wrong1 from './wrong1.js';
import wrong2 from './wrong2.js';
import wrong3 from './wrong3.js';

const implementations = {
  right1, wrong1, wrong2, wrong3,
};

export default () => {
  const name = process.env.FUNCTION_VERSION || 'right1';
  return implementations[name];
};

/* __tests__ */

import getImpelementation from '../implementations/index.js';

const makeCart = getImpelementation();

test('Cart', () => {
  const cart = makeCart();
  expect(cart.getItems()).toHaveLength(0);

  const car = { name: 'car', price: 3 };
  cart.addItem(car, 5);
  expect(cart.getItems()).toEqual(expect.arrayContaining([{ good: car, count: 5 }]));
  expect(cart.getCost()).toBe(15);
  expect(cart.getCount()).toBe(5);

  const house = { name: 'house', price: 10 };
  cart.addItem(house, 2);
  expect(cart.getItems()).toEqual(
    expect.arrayContaining(
      [{ good: car, count: 5 }, { good: house, count: 2 }],
    ),
  );
  expect(cart.getCost()).toBe(35);
  expect(cart.getCount()).toBe(7);
});
