// Реализуйте метод toArray(), возвращающий массив обработанных элементов коллекции. Мемоизируйте этот массив во внутреннем свойстве memo.
// Реализуйте свойство length, которое возвращает количество элементов в коллекции. 
// Так как для вычисления её длины, нужно получить результирующий массив (применив все отложенные операции), логично реализовать это свойство как getter, 
// который вызывает внутри себя toArray().

class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  select(fn) {
    return this.build((coll) => coll.map(fn));
  }

  orderBy(fn, direction = 'asc') {
    const comparator = (a, b) => {
      const a1 = fn(a);
      const b1 = fn(b);

      const compareResult = direction === 'desc' ? -1 : 1;

      if (a1 > b1) {
        return compareResult;
      }

      if (a1 < b1) {
        return -compareResult;
      }

      return 0;
    };
    return this.build((coll) => coll.sort(comparator));
  }

  where(fn) {
    return this.build((coll) => coll.filter(fn));
  }

  memoToArray() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, operation) => operation(acc), this.collection);
    }
    return this.memo;
  }

  toArray() {
    return this.memoToArray().slice();
  }

  get length() {
    return this.toArray().length;
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

  it('should be immutable', () => {
    coll.orderBy((car) => car.year, 'asc').toArray();
    const result = coll.where((car) => car.brand === 'kia')
      .where((car) => car.year > 2011);

    expect(result.toArray()).toEqual(result.memo);
  });

  it('should be immutable 2', () => {
    const newColl = coll.where((car) => car.brand === 'kia').select((car) => car.model);

    const result = newColl.toArray();
    result.pop();

    expect(newColl.memo).not.toEqual(result);
    expect(newColl.memo).toEqual(['sorento', 'rio', 'sportage']);
  });

  it('should be immutable 3', () => {
    const result = coll
      .where((car) => car.brand === 'kia')
      .where((car) => car.year > 2011);

    const result2 = coll
      .orderBy((car) => car.year, 'asc')
      .where((car) => car.model === 'sorento');
    expect(result2).toHaveLength(1);
    expect(result2).toHaveLength(1);

    expect(result).toHaveLength(2);
    expect(result.toArray()).toEqual(result.memo);
    expect(result.toArray()).toEqual([cars[2], cars[4]]);
  });

  it('#where', () => {
    const result = coll
      .where((car) => car.brand === 'kia')
      .where((car) => car.year > 2011);

    expect(result).toHaveLength(2);
    expect(result.toArray()).toEqual([cars[2], cars[4]]);
  });

  it('#select', () => {
    const result = coll.where((car) => car.brand === 'bmw').select((car) => car.model);

    expect(result).toHaveLength(2);
    expect(result.toArray()).toEqual(result.memo);
  });

  it('#orderBy', () => {
    const result = coll.orderBy((car) => car.year)
      .where((car) => car.brand === 'kia')
      .select((car) => car.model);

    expect(result).toHaveLength(3);
    expect(result.toArray()).toEqual(['rio', 'sportage', 'sorento']);

    const result2 = coll.orderBy((car) => car.year, 'desc')
      .where((car) => car.brand === 'kia')
      .select((car) => car.model);

    expect(result2).toHaveLength(3);
    expect(result2.toArray()).toEqual(result2.memo);
  });
});
