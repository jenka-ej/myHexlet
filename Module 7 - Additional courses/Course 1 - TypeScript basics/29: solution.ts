// Реализуйте функцию makeTurn(), принимающую строку left или right и перемещающую черепашку вперед-назад по одномерной карте длиной пять.
// Если ход невозможен, должно выброситься исключение.

// const { makeTurn, state } = startGame();
// console.log(state); // ['turtle', null, null, null, null]
 
// makeTurn('left') // ERROR
 
// makeTurn('right');
// makeTurn('right');
// console.log(state); // [null, null, 'turtle', null, null]

type Turtle = 'turtle' | null;

type Game = {
  makeTurn: (direction: 'left' | 'right') => void;
  state: Array<Turtle>;
};

const startGame = (): Game => {
  const state: Array<Turtle> = ['turtle', null, null, null, null];

  function makeTurn(direction: 'left' | 'right'): void {
    const currentIndex: number = state.findIndex((el) => el === 'turtle');
    const nextIndex = direction === 'left' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0 || nextIndex === state.length) {
      throw new Error('ERROR');
    }
    state[currentIndex] = null;
    state[nextIndex] = 'turtle';
  }

  return { makeTurn, state };
};

export default startGame;

/* __tests__ */

import * as ta from 'type-assertions';

import startGame from '../solution';

test('startTurtleGame', () => {
  const { makeTurn, state } = startGame();

  expect(state).toEqual(['turtle', null, null, null, null]);

  expect(() => makeTurn('left')).toThrow();
  expect(state).toEqual(['turtle', null, null, null, null]);

  makeTurn('right');
  expect(state).toEqual([null, 'turtle', null, null, null]);

  makeTurn('right');
  makeTurn('right');
  expect(state).toEqual([null, null, null, 'turtle', null]);

  makeTurn('right');
  expect(state).toEqual([null, null, null, null, 'turtle']);

  expect(() => makeTurn('right')).toThrow();

  makeTurn('left');
  expect(state).toEqual([null, null, null, 'turtle', null]);

  ta.assert<ta.Equal<ReturnType<typeof makeTurn>, void>>();
});
