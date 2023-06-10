// Реализуйте класс TcpConnection в соответствии с примером выше. Все варианты поведения можно увидеть в тестах. 
// Для изменения состояния вам понадобится дополнительная внутренняя логика. Реализуйте её по своему усмотрению.

export default class TcpConnection {
  constructor() {
    this.state = 'disconnected';
  }

  connect() {
    if (this.state === 'connected') {
      throw new Error('TCP is already connected');
    }
    this.state = 'connected';
  }

  disconnect() {
    if (this.state === 'disconnected') {
      throw new Error('TCP is already disconnected');
    }
    this.state = 'disconnected';
  }

  getCurrentState() {
    return this.state;
  }

  write() {
    if (this.state === 'connected') {
      return;
    }
    throw new Error('TCP is already disconnected');
  }
}

/* __tests__ */

import TcpConnection from '../TcpConnection.js';

test('connect1', () => {
  const connection = new TcpConnection('33.22.11.22', 20);
  connection.connect();
  expect(connection.getCurrentState()).toBe('connected');
  connection.write('one');
  connection.write('two');
  connection.disconnect();
  expect(connection.getCurrentState()).toBe('disconnected');
});

test('connect2', () => {
  const connection = new TcpConnection('33.22.11.22', 20);
  connection.connect();
  expect(() => connection.connect()).toThrow();
});

test('connect3', () => {
  const connection = new TcpConnection('33.22.11.22', 20);
  connection.connect();
  connection.disconnect();
  expect(() => connection.disconnect()).toThrow();
});

test('connect4', () => {
  const connection = new TcpConnection('34.22.11.22', 20);
  connection.connect();
  connection.disconnect();
  expect(() => connection.write('one')).toThrow();
});
