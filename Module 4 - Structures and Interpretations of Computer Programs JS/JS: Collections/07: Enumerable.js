// Реализуйте ленивую версию Enumerable. Интерфейс включает в себя следующие методы: select(), where(), orderBy(), toArray().

class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  select(fn) {
    const newOps = this.operations.slice();
    newOps.push((coll) => coll.map(fn));
    return new Enumerable(this.collection.slice(), newOps);
  }

  where(fn) {
    const newOps = this.operations.slice();
    newOps.push((coll) => coll.filter(fn));
    return new Enumerable(this.collection.slice(), newOps);
  }

  orderBy(fn, direction = 'abs') {
    const compare = (a, b) => {
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
    const newOps = this.operations.slice();
    newOps.push((coll) => coll.sort(compare));
    return new Enumerable(this.collection.slice(), newOps);
  }

  toArray() {
    return this.operations.reduce((acc, operation) => operation(acc), this.collection);
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
    expect(result.toArray()).toEqual(['m5', 'm4', 'sorento', 'rio', 'sportage']);
  });

  it('orderBy', () => {
    const result = coll.orderBy((car) => car.year).select((car) => car.year);
    expect(result.toArray()).toEqual([2010, 2012, 2013, 2014, 2014]);
  });

  it('orderByDesc', () => {
    const result = coll.orderBy((car) => car.year, 'desc').select((car) => car.year);
    expect(result.toArray()).toEqual([2014, 2014, 2013, 2012, 2010]);
  });

  it('where', () => {
    const result = coll.where((car) => car.year === 2014).select((car) => car.brand);
    expect(result.toArray()).toEqual(['bmw', 'kia']);
  });

  it('#1 should be immutable', () => {
    coll.orderBy((car) => car.year, 'asc').toArray();
    const result = coll.where((car) => car.brand === 'kia')
      .where((car) => car.year > 2011).select((car) => car.model);

    expect(result.toArray()).toEqual(['sorento', 'sportage']);
  });

  it('#2 should be immutable', () => {
    const result1 = coll.select((car) => car.model);
    const result2 = coll.where((car) => car.year === 2014).select((car) => car.brand);

    expect(result1.toArray()).toEqual(['m5', 'm4', 'sorento', 'rio', 'sportage']);
    expect(result2.toArray()).toEqual(['bmw', 'kia']);
  });
});
