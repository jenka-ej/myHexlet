// Реализуйте и экспортируйте по умолчанию класс FakeSubscription. В конструктор FakeSubscription принимает пользователя. 
// Если пользователь администратор user.isAdmin(), то все доступы разрешены, если нет – то запрещены. 
// Класс должен повторять интерфейс класса Subscription, то есть иметь те же методы, но со своей логикой.

export default class FakeSubscription {
  constructor(user) {
    this.user = user;
  }

  hasProfessionalAccess() {
    return this.user.isAdmin();
  }

  hasPremiumAccess() {
    return this.user.isAdmin();
  }
}

/* __tests__ */

import Subscription from '../Subscription.js';
import User from '../User.js';

describe('Subscription', () => {
  it('test 1', () => {
    const user = new User('vasya@email.com', new Subscription('premium'));
    const result1 = user.getCurrentSubscription().hasPremiumAccess(); // true
    expect(result1).toBeTruthy();
    const result2 = user.getCurrentSubscription().hasProfessionalAccess(); // false
    expect(result2).toBeFalsy();
  });

  it('test 2', () => {
    const user = new User('vasya@email.com', new Subscription('professional'));
    const result1 = user.getCurrentSubscription().hasPremiumAccess(); // false
    expect(result1).toBeFalsy();
    const result2 = user.getCurrentSubscription().hasProfessionalAccess(); // true
    expect(result2).toBeTruthy();
  });

  it('test 3', () => {
    const user = new User('vasya@email.com');
    const result1 = user.getCurrentSubscription().hasPremiumAccess(); // false
    expect(result1).toBeFalsy();
    const result2 = user.getCurrentSubscription().hasProfessionalAccess(); // false
    expect(result2).toBeFalsy();
  });

  it('test 4', () => {
    const user = new User('rakhim@hexlet.io'); // администратор, проверяется по емейлу
    const result1 = user.getCurrentSubscription().hasPremiumAccess(); // true
    expect(result1).toBeTruthy();
    const result2 = user.getCurrentSubscription().hasProfessionalAccess(); // true
    expect(result2).toBeTruthy();
  });
});
