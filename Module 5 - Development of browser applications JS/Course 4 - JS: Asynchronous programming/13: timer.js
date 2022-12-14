// Реализуйте таймер в виде промиса. Функция должна принимать на вход количество миллисекунд и возвращать промис.

export default function wait(timeMs) {
  return new Promise((resolve) => setTimeout(resolve, timeMs));
}

/* __tests__ */

import wait from '../timer.js';

test('wait', () => {
  const before = new Date();
  const startTime = before.getTime();
  const duration = 150;
  return wait(duration).then(() => {
    const after = new Date();
    const endTime = after.getTime();
    const difference = endTime - startTime;
    expect(difference).toBeGreaterThanOrEqual(duration);
    expect(difference).toBeLessThan(duration + 30);
  });
});
