// Реализуйте логику функций, подготовленных в файле. Каждая из них принимает обработчик ошибки и класс ошибки. Каждая функция отлавливает особый тип ошибок:
// 1) Функция anyErrorCatcher проверяет, что текущая ошибка наследуется от errorInstance
// 2) Функция appErrorCatcher проверяет, что текущая ошибка наследуется от errorInstance И от одной из ошибок приложения
// 3) Функция customErrorCatcher проверяет, что ошибка содержит свойство isCustomError со значением true и errorInstance при этом отсутствует
// Если условие выполнено — ошибка передаётся в errorHandler. Если нет, то выбрасывается в исходном виде.

import NetworkError from './errors/NetworkError.js';

export const anyErrorCatcher = (errorHandler, errorInstance) => (error) => {
  if (error instanceof errorInstance) {
    return errorHandler(error);
  }
  throw new Error(error);
};

export const appErrorCatcher = (errorHandler, errorInstance) => (error) => {
  const exception = error instanceof NetworkError;
  if (error instanceof errorInstance && error instanceof Error && !exception) {
    return errorHandler(error);
  }
  throw new Error(error);
};

export const customErrorCatcher = (errorHandler, errorInstance) => (error) => {
  if (error.isCustomError && errorInstance === null) {
    return errorHandler(error);
  }
  throw new Error(error);
};

/* runCode.js */
// Реализуйте и экспортируйте по умолчанию функцию, которая имеет следующие параметры:
// 1) action - функция, которую нужно выполнить. Обязательный
// 2) catcher - обработчик ошибки из catcher.js, в качестве параметра принимает ошибку. Необязательный
// Общий принцип работы таков: функция принимает в себя экшен, пытается его выполнить и возвращает либо результат выполнения, 
// либо передаёт ошибку в catcher и возвращает его результат (если catcher не задан, выбрасывает ошибку как есть).

export default (action, catcher = null) => {
  try {
    return action();
  } catch (err) {
    if (catcher === null) {
      throw new Error(err);
    }
    return catcher(err);
  }
};

/* errors/AppAPINetworkError.js */

import AppNetworkError from './AppNetworkError.js';

export default class AppAPINetworkError extends AppNetworkError {}

/* errors/AppError.js */

export default class AppError extends Error {}

/* errors/AppNetworkError.js */

import AppError from './AppError.js';

export default class AppNetworkError extends AppError {}

/* errors/AppParsingError.js */

import AppError from './AppError.js';

export default class AppParsingError extends AppError {}

/* errors/CustomError.js */

export default (errorMessage) => {
  const error = new Error(errorMessage);
  error.isCustomError = true; // Подобные решения периодически встречаются в библиотеках
  return error;
};

/* errors/NetworkError.js */

export default class NetworkError extends Error {}

/* __tests__ */

import NetworkError from '../errors/NetworkError.js';
import CustomError from '../errors/CustomError.js';
import AppError from '../errors/AppError.js';
import AppNetworkError from '../errors/AppNetworkError.js';
import AppParsingError from '../errors/AppParsingError.js';
import AppAPINetworkError from '../errors/AppAPINetworkError.js';

import { anyErrorCatcher, appErrorCatcher, customErrorCatcher } from '../catchers.js';
import runCode from '../runCode.js';

const defaultCatcher = (err) => `Catched ${err.name}: ${err.message}`;

describe('Base cases', () => {
  test('Without catcher', () => {
    const resolve = () => 'Hello, World';
    const reject = () => { throw new Error('Failed'); };

    const runResolve = () => runCode(resolve);
    const runReject = () => runCode(reject);

    expect(runResolve).not.toThrow();
    expect(runReject).toThrow('Failed');

    expect(runResolve()).toEqual('Hello, World');
  });

  test('With catcher, standard error instance', () => {
    const resolve = () => 'Hello, Kitty';
    const error = new Error('Failed');
    const expectedMessage = defaultCatcher(error);
    const catcher = anyErrorCatcher(defaultCatcher, Error);
    const reject = () => { throw error; };

    const runResolve = () => runCode(resolve, catcher);
    const runReject = () => runCode(reject, catcher);

    expect(runResolve).not.toThrow();
    expect(runReject).not.toThrow();

    expect(runResolve()).toEqual('Hello, Kitty');
    expect(runReject()).toEqual(expectedMessage);
  });

  test('Throw AppError, check AppError', () => {
    const error = new AppNetworkError('Failed');
    const catcher = anyErrorCatcher(defaultCatcher, AppNetworkError);
    const expectedMessage = defaultCatcher(error);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);

    expect(run).not.toThrow();
    expect(run()).toEqual(expectedMessage);
  });

  test('Throw Error, check AppError', () => {
    const error = new Error('Failed');
    const catcher = anyErrorCatcher(defaultCatcher, AppNetworkError);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);

    expect(run).toThrow('Failed');
  });

  test('Throw AppError, check Error', () => {
    const error = new AppAPINetworkError('Failed');
    const catcher = anyErrorCatcher(defaultCatcher, Error);
    const expectedMessage = defaultCatcher(error);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);

    expect(run).not.toThrow();
    expect(run()).toEqual(expectedMessage);
  });
});

describe('Custom error', () => {
  test('isCustomError=true', () => {
    const resolve = () => 'Hello, Toto';
    const error = CustomError('Is CustomError');
    const expectedMessage = defaultCatcher(error);
    const catcher = customErrorCatcher(defaultCatcher, null);
    const reject = () => { throw error; };

    const runResolve = () => runCode(resolve, catcher);
    const runReject = () => runCode(reject, catcher);

    expect(runResolve).not.toThrow();
    expect(runReject).not.toThrow();

    expect(runResolve()).toEqual('Hello, Toto');
    expect(runReject()).toEqual(expectedMessage);
  });

  test('isCustomError=false', () => {
    const resolve = () => 'Hello, Toto';
    const error = CustomError('Is CustomError, isCustomError=false');
    error.isCustomError = false;
    const catcher = customErrorCatcher(defaultCatcher, null);
    const reject = () => { throw error; };

    const runResolve = () => runCode(resolve, catcher);
    const runReject = () => runCode(reject, catcher);

    expect(runResolve).not.toThrow();
    expect(runReject).toThrow('Is CustomError, isCustomError=false');
  });

  test('Throw CustomError, check Error', () => {
    const error = CustomError('Rejected with CustomError');
    const catcher = customErrorCatcher(defaultCatcher, Error);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);
    expect(run).toThrow('Rejected with CustomError');
  });

  test('Throw CustomError, check AppError', () => {
    const catcher = customErrorCatcher(defaultCatcher, AppError);
    const reject = () => { throw CustomError('Rejected with AppError'); };

    const run = () => runCode(reject, catcher);
    expect(run).toThrow('Rejected with AppError');
  });
});

const appErrors = [AppError, AppNetworkError, AppParsingError, AppAPINetworkError];

describe.each(appErrors)('Throw AppError instance', (CurrentError) => {
  test(`${CurrentError.name}`, () => {
    const resolve = () => `Hello, ${CurrentError.name}!`;
    const error = new CurrentError(`Rejected with ${CurrentError.name}`);
    const expectedMessage = defaultCatcher(error);
    const catcher = appErrorCatcher(defaultCatcher, CurrentError);
    const reject = () => { throw error; };

    const runResolve = () => runCode(resolve, catcher);
    const runReject = () => runCode(reject, catcher);

    expect(runResolve).not.toThrow();
    expect(runReject).not.toThrow();

    expect(runResolve()).toEqual(`Hello, ${CurrentError.name}!`);
    expect(runReject()).toEqual(expectedMessage);
  });
});

describe('Inheritance cases', () => {
  test('Throw AppError, check correct inheritance instance', () => {
    const error = new AppAPINetworkError('Rejected with AppAPINetworkError');
    const expectedMessage = defaultCatcher(error);
    const catcher = appErrorCatcher(defaultCatcher, AppNetworkError);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);
    expect(run).not.toThrow();
    expect(run()).toEqual(expectedMessage);
  });

  test('Throw AppError, check incorrect inheritance instance', () => {
    const reject = () => {
      throw new AppNetworkError('Rejected with AppNetworkError');
    };
    const catcher = appErrorCatcher(defaultCatcher, AppAPINetworkError);
    const run = () => runCode(reject, catcher);
    expect(run).toThrow('Rejected with AppNetworkError');
  });

  test('Throw not app error, check AppError instance', () => {
    const reject = () => {
      throw new NetworkError('Rejected with NetworkError');
    };
    const catcher = appErrorCatcher(defaultCatcher, NetworkError);
    const run = () => runCode(reject, catcher);
    expect(run).toThrow('Rejected with NetworkError');
  });

  test('Throw AppError, check not app error instance', () => {
    const reject = () => {
      throw new AppAPINetworkError('Rejected with AppAPINetworkError');
    };
    const catcher = appErrorCatcher(defaultCatcher, NetworkError);
    const run = () => runCode(reject, catcher);
    expect(run).toThrow('Rejected with AppAPINetworkError');
  });

  test('Throw AppError, check Error', () => {
    const error = new AppError('Rejected with AppError');
    const expectedMessage = defaultCatcher(error);
    const catcher = appErrorCatcher(defaultCatcher, Error);
    const reject = () => { throw error; };

    const run = () => runCode(reject, catcher);
    expect(run).not.toThrow();
    expect(run()).toEqual(expectedMessage);
  });
});
