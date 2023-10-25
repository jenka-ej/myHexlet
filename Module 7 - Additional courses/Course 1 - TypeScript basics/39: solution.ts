// Реализуйте класс HttpError, который должен наследоваться от встроенного класса Error и принимать первым параметром код ошибки, а вторым — message.
// Также реализуйте классы NotFoundError, UnauthorizedError, ForbiddenError. Каждый из них должен наследоваться от класса HttpError и иметь свойство status,
// которое равно коду ошибки и message — сообщение, передающееся в базовый класс. Коды ошибок: 404, 401, 403.

// import { NotFoundError } from './errors';
 
// const error = new NotFoundError('Not Found');
// console.log(error.status); // 404
// console.log(error.message); // Not Found

class HttpError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

class NotFoundError extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

class UnauthorizedError extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export {
  HttpError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
};

/* __tests__ */

import {
  ForbiddenError, HttpError, NotFoundError, UnauthorizedError,
} from '../solution';

test('HttpError', () => {
  const error = new HttpError(500, 'Internal Server Error');
  expect(error.status).toBe(500);
  expect(error.message).toBe('Internal Server Error');

  const forbiddenError = new ForbiddenError('Access denied');
  expect(forbiddenError.status).toBe(403);
  expect(forbiddenError.message).toBe('Access denied');

  const notFoundError = new NotFoundError('Not found');
  expect(notFoundError.status).toBe(404);
  expect(notFoundError.message).toBe('Not found');

  const unauthorizedError = new UnauthorizedError('Unauthorized');
  expect(unauthorizedError.status).toBe(401);
  expect(unauthorizedError.message).toBe('Unauthorized');
});
