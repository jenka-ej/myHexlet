// Реализуйте метод where(), основываясь на следующем интерфейсе:
// Функция может принимать любое количество параметров, каждый из которых может быть либо функцией, либо объектом. 
// Для функций должна осуществляться простая фильтрация, для объектов нужно проверять соответствие элемента коллекции значениям по тем же ключам, 
// что и в переданном объекте.

class Enumerable {
  constructor(collection, operations) {
    this.collection = collection;
    this.operations = operations || [];
  }

  build(fn) {
    return new Enumerable(this.collection.slice(), this.operations.concat(fn));
  }

  where(...fn) {
    const newOps = this.operations.slice();
    fn.map((func) => {
      if (typeof func === 'function') {
        return newOps.push((coll) => coll.filter(func));
      }
      const keys = Object.keys(func);
      return keys.map((key) => newOps.push((coll) => coll.filter((el) => el[key] === func[key])));
    });
    return this.build(newOps);
  }

  getProcessedCollection() {
    if (!this.memo) {
      this.memo = this.operations.reduce((acc, func) => func(acc), this.collection);
    }

    return this.memo;
  }

  get length() {
    return this.getProcessedCollection().length;
  }

  toArray() {
    return this.getProcessedCollection().slice();
  }
}

export default Enumerable;

/* __tests__ */

import Enumerable from '../Enumerable.js';

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
      { brand: 'bmw', model: 'mini', year: 2011 },
    ];
    coll = new Enumerable(cars);
  });

  it('#where without args', () => {
    const result = coll.where();
    expect(result.toArray()).toEqual(cars);
  });

  it('#where', () => {
    const result1 = coll
      .where((car) => car.brand === 'kia')
      .where((car) => car.year > 2011);

    expect(result1.toArray()).toEqual([cars[2], cars[4]]);

    const result2 = coll.where({ brand: 'bmw' });
    expect(result2.toArray()).toEqual([cars[0], cars[1], cars[5]]);

    const result3 = coll.where({ brand: 'kia', model: 'sorento' });
    expect(result3.toArray()).toEqual([cars[2]]);

    const result4 = coll.where({ brand: 'kia' }, (car) => car.year < 2013);
    expect(result4.toArray()).toEqual([cars[3], cars[4]]);

    const result5 = coll.where({ year: 2009 });
    expect(result5.toArray()).toEqual([]);

    const result6 = coll.where({ brand: 'kia' }, { model: 'sorento' });
    expect(result6.toArray()).toEqual([cars[2]]);
  });

  it('#where 2', () => {
    const result = coll.where((car) => car.year < 2014)
      .where((car) => car.brand === 'kia', (car) => car.year > 2011);

    expect(result.toArray()).toEqual([cars[4]]);
  });
});
