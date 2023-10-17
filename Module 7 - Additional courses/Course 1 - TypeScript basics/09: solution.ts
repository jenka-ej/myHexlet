// Реализуйте перечисление ModalStatus с двумя значениями: Opened и Closed
// Реализуйте функцию buildModal(). Он возвращает объект, который описывает модальное окно. Параметры функции:
// 1) Текст, который должен быть внутри окна после инициализации
// 2) Статус, с которым надо создать объект окна
// Функция возвращает объект с двумя полями: text (здесь хранится переданный текст) и status (здесь хранится переданный статус)

// const modal = buildModal('hexlet forever', ModalStatus.Opened);
// { text: 'hexlet forever', status: ModalStatus.Opened }

enum ModalStatus {
  Opened,
  Closed,
}

function buildModal(text: string, status: ModalStatus): { text: string, status: ModalStatus } {
  return { text, status };
}

export { ModalStatus };
export default buildModal;

/* __tests__ */

import * as ta from 'type-assertions';

import buildModal, { ModalStatus } from '../solution';

test('function', () => {
  expect(buildModal('hexlet', ModalStatus.Opened))
    .toEqual({ text: 'hexlet', status: ModalStatus.Opened });

  expect(buildModal('code-basics', ModalStatus.Closed))
    .toEqual({ text: 'code-basics', status: ModalStatus.Closed });

  ta.assert<ta.Equal<ReturnType<typeof buildModal>, { text: string, status: ModalStatus }>>();
});
