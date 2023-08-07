// Представьте себе будильник. Пусть у него имеются три кнопки:
// 1) H - кнопка для увеличения часа на единицу
// 2) M - для увеличения минуты на единицу
// 3) кнопка Mode, которая переключает часы в режим настройки будильника. В этом режиме на экране отображается время срабатывания будильника, 
// а кнопки H и M устанавливают не текущее время, а время срабатывания будильника. 
// Повторное нажатие кнопки Mode возвращает часы в обычный режим. 
// Кроме того, затяжное нажатие на кнопку Mode приводит к тому, что будильник активируется. 
// Такое же нажатие ещё раз отключает будильник.

// После этого, если текущее время совпадает со временем будильника, включается звонок, который отключается либо нажатием кнопки Mode, 
// либо самопроизвольно через минуту. Кнопки H и M в режиме звонка (когда сработал будильник) не активны.

// Часы работают в 24-часовом формате.

// Поведение часов с будильником уже является сложным, поскольку одни и те же входные воздействия (нажатие одних и тех же кнопок)
// в зависимости от режима инициируют различные действия.

// В программных и программно-аппаратных вычислительных системах сущности со сложным поведением встречаются очень часто. 
// Таким свойством обладают устройства управления, сетевые протоколы, диалоговые окна, персонажи компьютерных игр и многие другие объекты и системы.

// Подведём итог. У нас есть следующие действия:
// 1) Установка времени
// 2) Установка времени срабатывания будильника
// 3) Включение/Выключение будильника
// 4) Отключение звонка будильника

// При использовании кнопок H и M часы и минуты изменяются независимо, и никак друг на друга не влияют (как и в большинстве реальных будильников).
// То есть если происходит увеличение минут с 59 до 60 (сброс на 00), то цифра с часами остается неизменной.

// Интерфейсными методами часов являются:
// 1) clickMode() - нажатие на кнопку Mode
// 2) longClickMode() - долгое нажатие на кнопку Mode
// 3) clickH() - нажатие на кнопку H
// 4) clickM() - нажатие на кнопку M
// 5) tick() - при вызове увеличивает время на одну минуту и, если нужно, активирует звонок будильника
// 6) isAlarmOn() - показывает активирован ли будильник
// 7) isAlarmTime() - возвращает true, если время на часах совпадает со временем на будильнике
// 8) minutes() - возвращает минуты, установленные на часах
// 9) hours() - возвращает часы, установленные на часах
// 10) alarmMinutes() - возвращает минуты, установленные на будильнике
// 11) alarmHours() - возвращает часы, установленные на будильнике
// 12) getCurrentMode() - возвращает текущий режим (alarm | clock | bell)

// Реализуйте интерфейсные методы и логику работы часов.
// Реализуйте логику состояний.

import ClockState from './states/ClockState.js';
import AlarmState from './states/AlarmState.js';
import BellState from './states/BellState.js';

export default class AlarmClock {
  constructor() {
    this.clockState = { ...ClockState };
    this.alarmState = { ...AlarmState };
    this.bellState = { ...BellState };
    this.mode = { currentMode: 'clock' };
  }

  clickMode() {
    const currentMode = this.getCurrentMode();
    switch (currentMode) {
      case 'clock':
        this.mode.currentMode = 'alarm';
        return null;
      case 'alarm':
        this.mode.currentMode = 'clock';
        return null;
      case 'bell':
        this.mode.currentMode = 'clock';
        return null;
      default:
        return null;
    }
  }

  longClickMode() {
    const { alarmOn } = this.alarmState;
    this.alarmState.alarmOn = !alarmOn;
    return null;
  }

  clickH() {
    const currentMode = this.getCurrentMode();
    switch (currentMode) {
      case 'clock':
        this.hourPlus()[currentMode]();
        this.checkBell();
        return null;
      case 'alarm':
        this.hourPlus()[currentMode]();
        this.checkBell();
        return null;
      case 'bell':
        this.hourPlus()[currentMode]();
        this.changeBellToClockState();
        return null;
      default:
        return null;
    }
  }

  clickM() {
    const currentMode = this.getCurrentMode();
    switch (currentMode) {
      case 'clock':
        this.minutePlus()[currentMode]();
        this.checkBell();
        return null;
      case 'alarm':
        this.minutePlus()[currentMode]();
        this.checkBell();
        return null;
      case 'bell':
        this.minutePlus()[currentMode]();
        this.changeBellToClockState();
        return null;
      default:
        return null;
    }
  }

  tick() {
    const currentMode = this.getCurrentMode();
    switch (currentMode) {
      case 'clock':
        this.minutePlus().clock('unit');
        this.checkBell();
        return null;
      case 'alarm':
        this.minutePlus().clock('unit');
        this.checkBell();
        return null;
      case 'bell':
        this.minutePlus()[currentMode]('unit');
        this.changeBellToClockState();
        return null;
      default:
        return null;
    }
  }

  checkBell() {
    if (this.isAlarmOn() && this.isAlarmTime()) {
      this.mode.currentMode = 'bell';
      this.bellState.ring = true;
    }
    return null;
  }

  changeBellToClockState() {
    this.mode.currentMode = 'clock';
    this.bellState.ring = false;
  }

  minutePlus() {
    return {
      clock: (option = 'separate') => {
        this.plusOneClockMinute()[option]();
      },
      alarm: (option = 'separate') => {
        this.plusOneAlarmMinute()[option]();
      },
      bell: (option = 'separate') => {
        this.plusOneClockMinute()[option]();
      },
    };
  }

  plusOneClockMinute() {
    const { minutes } = this.clockState;
    return {
      separate: () => {
        if (minutes === 59) {
          this.clockState.minutes = 0;
        } else {
          this.clockState.minutes = minutes + 1;
        }
        return null;
      },
      unit: () => {
        if (minutes === 59) {
          this.clockState.minutes = 0;
          this.plusOneClockHour();
          return null;
        }
        this.clockState.minutes = minutes + 1;
        return null;
      },
    };
  }

  plusOneAlarmMinute() {
    const { alarmMinutes } = this.alarmState;
    return {
      separate: () => {
        if (alarmMinutes === 59) {
          this.alarmState.alarmMinutes = 0;
        } else {
          this.alarmState.alarmMinutes = alarmMinutes + 1;
        }
        return null;
      },
      unit: () => {
        if (alarmMinutes === 59) {
          this.alarmState.alarmMinutes = 0;
          this.plusOneAlarmHour();
          return null;
        }
        this.alarmState.alarmMinutes = alarmMinutes + 1;
        return null;
      },
    };
  }

  hourPlus() {
    return {
      clock: () => {
        this.plusOneClockHour();
      },
      alarm: () => {
        this.plusOneAlarmHour();
      },
      bell: () => {
        this.plusOneClockHour();
      },
    };
  }

  plusOneClockHour() {
    const { hours } = this.clockState;
    if (hours === 23) {
      this.clockState.hours = 0;
    } else {
      this.clockState.hours = hours + 1;
    }
    return null;
  }

  plusOneAlarmHour() {
    const { alarmHours } = this.alarmState;
    if (alarmHours === 23) {
      this.alarmState.alarmHours = 0;
    } else {
      this.alarmState.alarmHours = alarmHours + 1;
    }
    return null;
  }

  isAlarmOn() {
    const { alarmOn } = this.alarmState;
    return alarmOn;
  }

  isAlarmTime() {
    const condition = this.hours() === this.alarmHours() && this.minutes() === this.alarmMinutes();
    return condition;
  }

  minutes() {
    const { minutes } = this.clockState;
    return minutes;
  }

  hours() {
    const { hours } = this.clockState;
    return hours;
  }

  alarmMinutes() {
    const { alarmMinutes } = this.alarmState;
    return alarmMinutes;
  }

  alarmHours() {
    const { alarmHours } = this.alarmState;
    return alarmHours;
  }

  getCurrentMode() {
    return this.mode.currentMode;
  }
}

/* AlarmState.js */

const AlarmState = {
  alarmHours: 6,
  alarmMinutes: 0,
  alarmOn: false,
};

export default AlarmState;

/* BellState.js */

const BellState = {
  ring: true,
};

export default BellState;

/* ClockState.js */

const ClockState = {
  hours: 12,
  minutes: 0,
};

export default ClockState;

/* __tests__ */

import AlarmClock from '../AlarmClock.js';

describe('AlarmClock', () => {
  it('should have default values', () => {
    const clock = new AlarmClock();
    expect(clock.minutes()).toBe(0);
    expect(clock.hours()).toBe(12);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);
  });

  it('should change state when click to mode', () => {
    const clock = new AlarmClock();
    expect(clock.isAlarmOn()).toBe(false);
    expect(clock.getCurrentMode()).toBe('clock');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBe(false);
    expect(clock.getCurrentMode()).toBe('alarm');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBe(false);
    expect(clock.getCurrentMode()).toBe('clock');

    clock.longClickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBe(true);
    expect(clock.getCurrentMode()).toBe('clock');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBe(true);
    expect(clock.getCurrentMode()).toBe('alarm');

    clock.clickMode();
    clock.tick();
    expect(clock.isAlarmOn()).toBe(true);
    expect(clock.getCurrentMode()).toBe('clock');

    clock.longClickMode();
    expect(clock.isAlarmOn()).toBe(false);
    expect(clock.getCurrentMode()).toBe('clock');
  });

  it('should change hours and minutes', () => {
    const clock = new AlarmClock();
    clock.clickH();
    expect(clock.minutes()).toBe(0);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);

    clock.clickM();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(6);
    expect(clock.alarmMinutes()).toBe(0);

    clock.clickMode();

    clock.clickH();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(7);
    expect(clock.alarmMinutes()).toBe(0);

    clock.clickM();
    expect(clock.minutes()).toBe(1);
    expect(clock.hours()).toBe(13);
    expect(clock.alarmHours()).toBe(7);
    expect(clock.alarmMinutes()).toBe(1);

    for (let i = 0; i < 60; i += 1) {
      clock.clickM();
    }
    expect(clock.alarmMinutes()).toBe(1);
    expect(clock.alarmHours()).toBe(7);

    for (let i = 0; i < 17; i += 1) {
      clock.clickH();
    }
    expect(clock.alarmHours()).toBe(0);
  });

  it('should not start bell if alarm off', () => {
    const clock = new AlarmClock();

    for (let i = 0; i < 18 * 60; i += 1) {
      clock.tick();
    }

    expect(clock.isAlarmTime()).toBe(true);
    expect(clock.getCurrentMode()).toBe('clock');
    clock.clickM();
    clock.clickH();

    clock.tick();
    expect(clock.getCurrentMode()).toBe('clock');
  });

  it('should start bell if alarm on 1', () => {
    const clock = new AlarmClock();
    clock.longClickMode();

    for (let i = 0; i < 18 * 60; i += 1) {
      clock.tick();
    }

    expect(clock.isAlarmTime()).toBe(true);
    expect(clock.getCurrentMode()).toBe('bell');
    clock.clickM();
    clock.clickH();

    clock.tick();
    expect(clock.getCurrentMode()).toBe('clock');
  });

  it('should start bell if alarm on 2', () => {
    const clock = new AlarmClock();
    clock.longClickMode();

    for (let i = 0; i < 18 * 60; i += 1) {
      clock.tick();
    }
    expect(clock.isAlarmTime()).toBe(true);
    expect(clock.getCurrentMode()).toBe('bell');

    clock.clickMode();
    expect(clock.getCurrentMode()).toBe('clock');
  });

  it('should start bell if state is Alarm', () => {
    const clock = new AlarmClock();
    clock.longClickMode();
    clock.clickMode();
    expect(clock.getCurrentMode()).toBe('alarm');

    for (let i = 0; i < 18 * 60; i += 1) {
      clock.tick();
    }
    expect(clock.isAlarmOn()).toBe(true);
    expect(clock.isAlarmTime()).toBe(true);
    expect(clock.getCurrentMode()).toBe('bell');

    clock.clickMode();
    expect(clock.getCurrentMode()).toBe('clock');
  });

  it('should increment minutes after Alarm', () => {
    const clock = new AlarmClock();
    clock.longClickMode();
    for (let i = 0; i < 18 * 60; i += 1) {
      clock.tick();
    }
    expect(clock.isAlarmTime()).toBe(true);
    expect(clock.getCurrentMode()).toBe('bell');
    clock.tick();
    expect(clock.getCurrentMode()).toBe('clock');
    expect(clock.minutes()).toBe(1);
  });
});
