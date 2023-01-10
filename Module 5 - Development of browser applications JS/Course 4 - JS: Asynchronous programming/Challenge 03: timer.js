// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает объект-таймер. Таймер "заводится" на определенное время и запускается. 
// Каждые 100 миллисекунд он вызывает колбек, передавая туда два параметра: state со значением working и elapsedTime содержащий прошедшее время со старта таймера (в мc). 
// Когда таймер завершился, то он вызывает тот же колбек с параметром state и значением finished.

export default (totalTime, cb) => ({
  start() {
    let elapsed = 0;
    const id = setInterval(() => {
      cb({ state: 'working', elapsedTime: elapsed += 100 });
    }, 100);
    setTimeout(() => cb({ state: 'finished' }), totalTime);
    setTimeout(() => clearInterval(id), totalTime + 1);
  },
});

/* __tests__ */

import _ from 'lodash';
import makeTimer from '../timer.js';

test('timer 1', (done) => {
  const timer = makeTimer(50, ({ state }) => {
    expect(state).toBe('finished');
    done();
  });
  timer.start();
});

test('timer 2', (done) => {
  const time = 1000;
  const laps = [];
  const timer = makeTimer(time, (data) => {
    laps.push(data);
  });

  setTimeout(() => {
    const firstLap = laps[0];
    expect(firstLap.elapsedTime).toBeGreaterThanOrEqual(100);
    expect(firstLap.elapsedTime).toBeLessThan(150);
    expect(firstLap.state).toBe('working');

    const lastLap = _.last(laps);
    expect(lastLap.state).toBe('finished');
    done();
  }, 1200);

  timer.start();
});
