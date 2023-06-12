// Реализуйте класс TcpConnection в соответствии с примером выше. Все варианты поведения можно увидеть в тестах. 
// Для изменения состояния вам понадобится дополнительная внутренняя логика. Реализуйте её по своему усмотрению.

// first version

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

// second version

/* Connected.js */

export default class Connected {
  constructor(tcp) {
    this.tcp = tcp;
  }

  connect() {
    if (this.tcp.getCurrentState() === 'connected') {
      throw new Error('TCP is already connected');
    }
  }

  disconnect() {
  }

  getCurrentState() {
    return 'connected';
  }

  write() {
  }
}

/* Disconnected.js */

export default class Disconnected {
  constructor(tcp) {
    this.tcp = tcp;
  }

  connect() {

  }

  disconnect() {
    if (this.tcp.getCurrentState() === 'disconnected') {
      throw new Error('TCP is already disconnected');
    }
  }

  getCurrentState() {
    return 'disconnected';
  }

  write() {
    throw new Error('TCP is already disconnected');
  }
}

/* TcpConnection.js */

import DisconnectedState from './states/Disconnected.js';
import ConnectedState from './states/Connected.js';

export default class TcpConnection {
  constructor() {
    this.states = {
      Disconnected: DisconnectedState,
      Connected: ConnectedState,
    };

    this.state = new this.states.Disconnected(this);
  }

  connect() {
    this.state.connect();
    this.state = new this.states.Connected(this);
  }

  disconnect() {
    this.state.disconnect();
    this.state = new this.states.Disconnected(this);
  }

  getCurrentState() {
    return this.state.getCurrentState();
  }

  write() {
    return this.state.write();
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
