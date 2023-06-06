// Реализуйте стратегию, которая пытается заполнить поля, пробегаясь построчно слева направо и сверху вниз (начиная с левого верхнего угла). 
// Как только она встречает свободное поле, то вставляет туда значение.

class Easy {
  constructor() {
    this.moves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  move() {
    return this.moves;
  }
}

export default Easy;

/* __tests__ */

import TicTacToe from '../TicTacToe.js';

describe('TicTacToe', () => {
  it('test easy game 1', () => {
    const game = new TicTacToe();
    game.go(1, 1);
    game.go();
    game.go(0, 1);
    game.go();
    const isWinner = game.go(2, 1);
    expect(isWinner).toBeTruthy();
  });

  it('test easy game 2', () => {
    const game = new TicTacToe();
    game.go(1, 1);
    game.go();
    game.go(1, 2);
    expect(game.go()).toBeFalsy();
    expect(game.go(2, 2)).toBeFalsy();
    const isWinner = game.go();
    expect(isWinner).toBeTruthy();
  });

  it('test easy game 3', () => {
    const game = new TicTacToe();
    game.go(0, 0);
    game.go();
    expect(game.go(1, 1)).toBeFalsy();
    expect(game.go()).toBeFalsy();
    const isWinner = game.go(2, 2);
    expect(isWinner).toBeTruthy();
  });

  it('test normal game 1', () => {
    const game = new TicTacToe('normal');
    game.go(0, 2);
    game.go();
    game.go(0, 1);
    expect(game.go()).toBeFalsy();
    expect(game.go(1, 2)).toBeFalsy();
    const isWinner = game.go();
    expect(isWinner).toBeTruthy();
  });

  it('test normal game 2', () => {
    const game = new TicTacToe('normal');
    game.go();
    game.go(2, 1);
    game.go();
    game.go(1, 0);
    expect(game.go()).toBeFalsy();
    expect(game.go(1, 2)).toBeFalsy();
    const isWinner = game.go();
    expect(isWinner).toBeTruthy();
  });

  it('test normal game 3', () => {
    const game = new TicTacToe('normal');
    game.go(2, 2);
    game.go();
    expect(game.go(1, 1)).toBeFalsy();
    expect(game.go()).toBeFalsy();
    const isWinner = game.go(0, 0);
    expect(isWinner).toBeTruthy();
  });
});
