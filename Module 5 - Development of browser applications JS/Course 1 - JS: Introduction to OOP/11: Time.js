// Добавьте в класс Time статический метод fromString(), который позволяет создавать объекты Time на основе времени переданного строкой формата часы:минуты.

export default class Time {
  static fromString(time) {
    const [newHours, newMinutes] = time.split(':');
    return new Time(newHours, newMinutes);
  }

  constructor(hours, minutes) {
    this.minutes = minutes;
    this.hours = hours;
  }

  toString() {
    return `${this.hours}:${this.minutes}`;
  }
}

/* __tests__ */

import Time from '../Time.js';

test('#1', () => {
  const time = Time.fromString('10:23');
  expect(time).toBeInstanceOf(Time);
  expect(`The time is ${time}`).toEqual('The time is 10:23');
});

test('#2', () => {
  const time = Time.fromString('3:8');
  expect(time).toBeInstanceOf(Time);
  expect(`The time is ${time}`).toEqual('The time is 3:8');
});
