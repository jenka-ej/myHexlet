// Реализуйте и экспортируйте по умолчанию класс Cart, представляющий из себя покупательскую корзину. Интерфейс:
// addItem(item, count) – добавляет в корзину товары и их количество. Товар это объект у которого два свойства: name – имя и price – стоимость.
// getItems – возвращает товары в формате [{ item, count }, { item, count }, ...]
// getCost – возвращает стоимость корзины. Общая стоимость корзины высчитывается как стоимость всех добавленных товаров с учетом их количества.
// getCount – возвращает количество товаров в корзине

class Cart {
  constructor() {
    this.items = [];
  }

  addItem(item, count) {
    this.items.push({ item, count });
  }

  getItems() {
    return this.items;
  }

  getCost() {
    return this.items.reduce((acc, item) => acc + (item.item.price * item.count), 0);
  }

  getCount() {
    return this.items.reduce((acc, item) => acc + item.count, 0);
  }
}

export default Cart;

/* __tests__ */

import Cart from '../Cart.js';

test('Cart', () => {
  const cart = new Cart();
  expect(cart.getItems()).toHaveLength(0);

  cart.addItem({ name: 'car', price: 3 }, 5);
  const expectedItems = [{ item: { name: 'car', price: 3 }, count: 5 }];
  expect(cart.getItems()).toStrictEqual(expectedItems);
  expect(cart.getCost()).toBe(15);
  expect(cart.getCount()).toBe(5);

  cart.addItem({ name: 'house', price: 10 }, 2);
  const expectedItems2 = [
    { item: { name: 'car', price: 3 }, count: 5 },
    { item: { name: 'house', price: 10 }, count: 2 },
  ];
  expect(cart.getItems()).toStrictEqual(expectedItems2);
  expect(cart.getCost()).toBe(35);
  expect(cart.getCount()).toBe(7);
});
