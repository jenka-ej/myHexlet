// Реализуйте функции select(), orderBy() используя подход без мутации состояния.

class Enumerable {
  constructor(collection) {
    this.collection = collection;
  }

  select(fn) {
    const selected = this.collection.map(fn);
    return new Enumerable(selected);
  }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const fn1 = fn(a);
      const fn2 = fn(b);

      const result = (direction === 'desc' ? 1 : -1);

      if (fn1 > fn2) {
        return -result;
      }
      if (fn1 < fn2) {
        return result;
      }
      return 0;
    };
    const orderedBy = this.collection.slice().sort(comparator);
    return new Enumerable(orderedBy);
  }

  where(fn) {
    const filtered = this.collection.filter(fn);
    return new Enumerable(filtered);
  }

  toArray() {
    return this.collection;
  }
}

export default Enumerable;

/* __tests__ */

import Enumerable from '../Enumerable';

describe('HexletLinq', () => {
  let coll;
  let cars;

  beforeEach(() => {
    cars = [
      { brand: 'bmw', model: 'm5', year: 2014 },
      { brand: 'bmw', model: 'm4', year: 2013 },
      { brand: 'kia', model: 'sorento', year: 2014 },
      { brand: 'kia', model: 'rio', year: 2010 },
      { brand: 'kia', model: 'sportage', year: 2012 },
    ];
    coll = new Enumerable(cars);
  });

  it('select', () => {
    const result = coll.select((car) => car.model);

    const expected = ['m5', 'm4', 'sorento', 'rio', 'sportage'];

    expect(result.toArray()).not.toEqual(coll.toArray());
    expect(result.toArray()).toEqual(expected);
  });

  it('orderBy', () => {
    const result = coll
      .orderBy((car) => car.year)
      .where((car) => car.brand === 'kia');

    const expected = [cars[3], cars[4], cars[2]];

    expect(result.toArray()).not.toEqual(coll.toArray());
    expect(result.toArray()).toEqual(expected);
  });

  it('orderByDesc', () => {
    const result = coll
      .orderBy((car) => car.year, 'desc')
      .where((car) => car.brand === 'bmw');

    const expected = [cars[0], cars[1]];

    expect(result.toArray()).not.toEqual(coll.toArray());
    expect(result.toArray()).toEqual(expected);
  });
});
