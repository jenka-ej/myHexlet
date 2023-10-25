// Создайте абстрактный класс Clock, который будет содержать общую логику для классов часов с разными форматами вывода времени: 12-часовой и 24-часовой.

// В общей логике должно быть хранение данных: часы hours, минуты minutes и секунды seconds.
// Так же в общую логику входит метод tick(), который при каждом вызове увеличивает секунду на единицу.
// Если секунда увеличивается до значения 60, то увеличивается минута на 1, а секунда сбрасывается до 0.
// То же самое с минутами и часами: если значение минут увеличивается до 60, то увеличивается значение текущего часа, а минуты сбрасываются до 0.
// Если значение часа увеличивается до 24, то происходит сброс этого значения до 0.

// Начальное значение времени задается при создании объекта. Первым параметром в конструктор передается текущий час, вторым минуты, третьим секунды.
// Абстрактный класс Clock должен требовать от своих наследников реализацию метода render().

 
// 24-часовой формат
// class Clock24 extends Clock {
//   render(): string {
//     return `${this.hours.toString().padStart(2, '0')} : ${this.minutes.toString().padStart(2, '0')}`;
//   }
// }
 
// const clock24 = new Clock24(23, 59, 59);
// console.log(clock24.render()); // => '23 : 59'
// clock24.tick();
// console.log(clock24.render()); // => '00 : 00'
 
// 12-часовой формат
// class Clock12 extends Clock {
//   render(): string {
//     const timeType = this.hours * 1000 + this.minutes + this.seconds < 12000 ? 'AM' : 'PM';
//     const currentHour = this.hours % 12;
//     return `${currentHour.toString().padStart(2, '0')} : ${this.minutes.toString().padStart(2, '0')} ${timeType}`;
//   }
// }
 
// const clock12 = new Clock12(23, 59, 59);
// console.log(clock12.render()); // => '11 : 59 PM'
// clock12.tick();
// console.log(clock12.render()); // => '00 : 00 AM'

abstract class Clock {
  constructor(protected hours: number, protected minutes: number, protected seconds: number) {}

  tick(): void {
    const nextDay = this.hours === 23 && this.minutes === 59 && this.seconds === 59;
    const nextHour = this.minutes === 59 && this.seconds === 59;
    const nextMinute = this.seconds === 59;
    switch (true) {
      case nextDay:
        this.hours = 0;
        this.minutes = 0;
        this.seconds = 0;
        break;
      case nextHour:
        this.hours += 1;
        this.minutes = 0;
        this.seconds = 0;
        break;
      case nextMinute:
        this.minutes += 1;
        this.seconds = 0;
        break;
      default:
        this.seconds += 1;
    }
  }

  abstract render(): string;
}

export default Clock;

/* __tests__ */

import Clock from '../solution';

test('GameObject', () => {
  class Clock12 extends Clock {
    render(): string {
      const timeType = this.hours * 1000 + this.minutes + this.seconds < 12000 ? 'AM' : 'PM';
      const currentHour = this.hours % 12;
      return `${currentHour.toString().padStart(2, '0')} : ${this.minutes.toString().padStart(2, '0')} ${timeType}`;
    }
  }

  class Clock24 extends Clock {
    render(): string {
      return `${this.hours.toString().padStart(2, '0')} : ${this.minutes.toString().padStart(2, '0')}`;
    }
  }

  const clock12 = new Clock12(23, 59, 58);
  expect(clock12.render()).toBe('11 : 59 PM');

  clock12.tick();
  clock12.tick();

  const clock24 = new Clock24(23, 59, 58);
  expect(clock24.render()).toBe('23 : 59');

  clock24.tick();
  clock24.tick();

  expect(clock12.render()).toBe('00 : 00 AM');
  expect(clock24.render()).toBe('00 : 00');
});
