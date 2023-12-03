// Реализуйте и экспортируйте по умолчанию функцию, которая применяется в том случае, когда асинхронная операция возвращает коллекцию,
// а на выходе нужно получить массив, состоящий из всех элементов коллекций, которые вернула каждая асинхронная операция.

// Примеры:
// concat(['dir1', 'dir2', 'dir3'], fs.readdir, (err, files) => {
//   // files is now a list of filenames that exist in the 3 directories
// });

const noop = () => {};

const once = (fn) => {
  let called = false;

  return (...args) => {
    if (called) return;
    called = true;
    fn(...args);
  };
};

export default function concat(coll, iteratee, callback = noop) {
  if (coll.length === 0) {
    callback(null);
  }

  const oncedCallback = once(callback);
  let count = 0;
  const result = [];

  const cb = (err, data) => {
    count += 1;
    if (err) {
      oncedCallback(err);
      return;
    }
    if (coll.length === count) {
      oncedCallback(null, [...result, ...data]);
      return;
    }
    result.push(...data);
  };

  coll.forEach((item) => iteratee(item, cb));
}

/* __tests__ */

import concat from '../solution';

describe('#concat', () => {
  it('set 1', () => {
    const coll = [[1, 1, 1], [2, 2, 2], [3, 3, 3]];
    return new Promise((done) => {
      concat(coll, (item, callback) => {
        callback(null, item);
      }, (err, result) => {
        expect(result).toEqual(coll.reduce((acc, item) => acc.concat(item)));
        done();
      });
    });
  });

  it('set 2', () => {
    const callOrder = [];
    const iteratee = (x, cb) => {
      setTimeout(() => {
        callOrder.push(x);
        let y = x;
        const r = [];
        while (y > 0) {
          r.push(y);
          y -= 1;
        }
        cb(null, r);
      }, x * 25);
    };
    return new Promise((done) => {
      concat([1, 3, 2], iteratee, (err, results) => {
        expect(results).toEqual([1, 2, 1, 3, 2, 1]);
        expect(callOrder).toEqual([1, 2, 3]);
        expect(err === null).toBeTruthy();
        done();
      });
    });
  });

  it('set 3 error', () => {
    const iteratee = (x, cb) => {
      cb(new Error('test error'));
    };
    return new Promise((done) => {
      concat([1, 2, 3], iteratee, (err) => {
        expect(err).toBeInstanceOf(Error);
        done();
      });
    });
  });

  it('should work 2', () => {
    const coll = [];
    return new Promise((done) => {
      concat(coll, () => {
      }, () => {
        expect(true).toBe(true);
        done();
      });
    });
  });
});
