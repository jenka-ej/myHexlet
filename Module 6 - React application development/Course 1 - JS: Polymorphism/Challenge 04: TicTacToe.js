// Реализуйте класс TicTacToe, который представляет собой игру крестики-нолики. Принцип его работы описан в коде ниже:
// По умолчанию выбран easy уровень. Его можно изменить, передав в конструктор строку 'normal'
// const game = new TicTacToe();
 
// Если переданы аргументы, то ходит игрок. Первый аргумент – строка, второй – столбец.
// game.go(1, 1);

// Ход компьютера
// game.go();
 
// game.go(0, 1);
// game.go();
 
// Метод go возвращает true, если текущий ход победный и false в ином случае
// const isWinner = game.go(2, 1); // true

import Easy from './strategies/Easy.js';
import Normal from './strategies/Normal.js';

class TicTacToe {
  constructor(mode = 'easy', field = [0, 1, 2, 3, 4, 5, 6, 7, 8]) {
    const setting = {
      easy: new Easy(),
      normal: new Normal(),
    };
    this.mode = setting[mode];
    this.field = field;
  }

  makeMove(x, y, owner) {
    const index = x * 3 + y;
    this.field[index] = owner;
  }

  checkWinner() {
    if (this.field[0] === 'player' && this.field[3] === 'player' && this.field[6] === 'player') {
      return true;
    }
    if (this.field[0] === 'player' && this.field[1] === 'player' && this.field[2] === 'player') {
      return true;
    }
    if (this.field[1] === 'player' && this.field[4] === 'player' && this.field[7] === 'player') {
      return true;
    }
    if (this.field[3] === 'player' && this.field[4] === 'player' && this.field[5] === 'player') {
      return true;
    }
    if (this.field[2] === 'player' && this.field[5] === 'player' && this.field[8] === 'player') {
      return true;
    }
    if (this.field[6] === 'player' && this.field[7] === 'player' && this.field[8] === 'player') {
      return true;
    }
    if (this.field[0] === 'player' && this.field[4] === 'player' && this.field[8] === 'player') {
      return true;
    }
    if (this.field[2] === 'player' && this.field[4] === 'player' && this.field[6] === 'player') {
      return true;
    }
    if (this.field[0] === 'ai' && this.field[3] === 'ai' && this.field[6] === 'ai') {
      return true;
    }
    if (this.field[0] === 'ai' && this.field[1] === 'ai' && this.field[2] === 'ai') {
      return true;
    }
    if (this.field[1] === 'ai' && this.field[4] === 'ai' && this.field[7] === 'ai') {
      return true;
    }
    if (this.field[3] === 'ai' && this.field[4] === 'ai' && this.field[5] === 'ai') {
      return true;
    }
    if (this.field[2] === 'ai' && this.field[5] === 'ai' && this.field[8] === 'ai') {
      return true;
    }
    if (this.field[6] === 'ai' && this.field[7] === 'ai' && this.field[8] === 'ai') {
      return true;
    }
    if (this.field[0] === 'ai' && this.field[4] === 'ai' && this.field[8] === 'ai') {
      return true;
    }
    if (this.field[2] === 'ai' && this.field[4] === 'ai' && this.field[6] === 'ai') {
      return true;
    }
    return false;
  }

  go(i = this.mode, j = this.mode) {
    if (i === this.mode && j === this.mode) {
      const aiMoves = this.mode.move();
      const nextMove = aiMoves.reduce((acc, coordinate) => {
        if (this.field[coordinate] === 'player' || this.field[coordinate] === 'ai') {
          return acc;
        }
        if (acc.length !== 0) {
          return acc;
        }
        acc.push(coordinate);
        return acc;
      }, []);
      this.makeMove(Math.floor(nextMove / 3), nextMove % 3, 'ai');
    } else {
      this.makeMove(i, j, 'player');
    }
    return this.checkWinner();
  }
}

export default TicTacToe;

/* Easy.js */
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

/* Normal.js */
// Реализуйте стратегию, которая пытается заполнить поля, пробегаясь построчно слева направо и снизу вверх (начиная с левого нижнего угла). 
// Как только она встречает свободное поле, то вставляет туда значение.

class Normal {
  constructor() {
    this.moves = [6, 7, 8, 3, 4, 5, 0, 1, 2];
  }

  move() {
    return this.moves;
  }
}

export default Normal;

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
