// Реализуйте класс PasswordGeneratorAdapter, который представляет собой адаптер к пакету generate-password.

import generator from 'generate-password';

export default class PasswordGeneratorAdapter {
  constructor() {
    this.options = {
      uppercase: false,
      numbers: false,
      symbols: false,
    };
  }

  generatePassword(length, options) {
    this.options.length = length;
    if (options.length !== 0) {
      options.forEach((option) => {
        this.options[option] = true;
      });
    }
    return generator.generate(this.options);
  }
}

/* PasswordBuilder.js */

import crypto from 'crypto';

export default class PasswordBuilder {
  constructor(passwordGenerator) {
    this.passwordGenerator = passwordGenerator;
  }

  buildPassword(length = 8, options = ['numbers', 'symbols']) {
    const password = this.passwordGenerator.generatePassword(length, options);
    const digest = crypto.createHash('sha1').update(password).digest('hex');

    return { password, digest };
  }
}

/* __tests__ */

import PasswordBuilder from '../PasswordBuilder.js';
import PasswordGeneratorAdapter from '../PasswordGeneratorAdapter.js';

describe('PasswordBuilder', () => {
  it('build use default options', () => {
    const builder = new PasswordBuilder(new PasswordGeneratorAdapter());
    const passwordInfo = builder.buildPassword();

    expect(passwordInfo.password.length).toBe(8);
  });

  it('build use options: lowercase', () => {
    const builder = new PasswordBuilder(new PasswordGeneratorAdapter());
    const passwordInfo = builder.buildPassword(10, []);

    expect(passwordInfo.password.length).toBe(10);
    expect(passwordInfo.password).toMatch(/^[a-z]+$/);
  });

  it('build use options: numbers, uppercase', () => {
    const builder = new PasswordBuilder(new PasswordGeneratorAdapter());
    const passwordInfo = builder.buildPassword(25, ['numbers', 'uppercase']);

    expect(passwordInfo.password.length).toBe(25);
    expect(passwordInfo.password).toMatch(/^[^\W_]+$/);
    expect(passwordInfo.password).toMatch(/(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*/);
  });
});
