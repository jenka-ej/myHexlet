// Опишите тип состояния DataState и перечисление LoadingStatus, затем реализуйте функцию handleData(),
// которая принимает на вход DataState и возвращает строку в зависимости от состояния:

// 1) Строку 'loading...' при LoadingStatus.Loading
// 2) Текст ошибки из error.message при LoadingStatus.Error
// 3) Строку из числового поля data при LoadingStatus.Success
// 4) Если статус не входит в перечисление, функция возвращает строку 'unknown'.

// const loading: DataState = { status: LoadingStatus.Loading };
// console.log(handleData(loading)); // loading...

// const error: DataState = { status: LoadingStatus.Error, error: new Error('some error') };
// console.log(handleData(error)); // some error

// const success: DataState = { status: LoadingStatus.Success, data: 42 };
// console.log(handleData(success)); // 42

enum LoadingStatus {
  Loading = 'loading',
  Error = 'error',
  Success = 'success',
}

type DataState = { status: LoadingStatus.Loading }
| { status: LoadingStatus.Error, error: Error }
| { status: LoadingStatus.Success, data: number };

function handleData(info: DataState): string {
  switch (info.status) {
    case ('loading'):
      return 'loading...';
    case ('error'):
      return info.error.message;
    case ('success'):
      return info.data.toString();
    default:
      return 'unknown';
  }
}

export { DataState, LoadingStatus };
export default handleData;

/* __tests__ */

import handleData, { DataState, LoadingStatus } from '../solution';

test('handleData', () => {
  const loading: DataState = { status: LoadingStatus.Loading };
  expect(handleData(loading)).toBe('loading...');

  const success: DataState = { status: LoadingStatus.Success, data: 42 };
  expect(handleData(success)).toBe('42');

  const error: DataState = { status: LoadingStatus.Error, error: new Error('error') };
  expect(handleData(error)).toBe('error');

  const unknown = { status: 'unknown' };
  // @ts-expect-error type '{ status: 'unknown' }' is not assignable to type 'DataState'.
  expect(handleData(unknown)).toBe('unknown');
});
