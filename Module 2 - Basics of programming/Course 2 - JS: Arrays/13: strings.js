// Реализуйте и экспортируйте по умолчанию функцию, которая заменяет каждое вхождение указанных слов в предложении на последовательность $#%! и 
// возвращает полученную строку. Аргументы:
// 1) Текст
// 2) Набор стоп слов
// Словом считается любая непрерывная последовательность символов, включая любые спецсимволы (без пробелов).

const makeCensored = (text, stopWords) => {
  const words = text.split(' ');

  const result = [];
  for (const word of words) {
    const newWord = stopWords.includes(word) ? '$#%!' : word;
    result.push(newWord);
  }

  return result.join(' ');
};

export default makeCensored;

/* __tests__ */

import makeCensored from '../strings.js';

describe('makeCensored', () => {
  it('test 1', () => {
    const sentence = 'When you play the game of thrones, you win or you die';
    const actual = makeCensored(sentence, ['die']);
    const expected = 'When you play the game of thrones, you win or you $#%!';
    expect(actual).toEqual(expected);
  });

  it('test 2', () => {
    const sentence = 'chicken chicken? chicken! chicken';
    const actual = makeCensored(sentence, ['chicken']);
    const expected = '$#%! chicken? chicken! $#%!';
    expect(actual).toEqual(expected);
  });

  it('test 3', () => {
    const sentence = 'chicken chicken? chicken! ? chicken';
    const actual = makeCensored(sentence, ['?', 'chicken']);
    const expected = '$#%! chicken? chicken! $#%! $#%!';
    expect(actual).toEqual(expected);
  });

  it('test 4', () => {
    const sentence = 'chicken chicken? chicken! ? ! @ chicken';
    const actual = makeCensored(sentence, ['?', '!', '@', 'chicken']);
    const expected = '$#%! chicken? chicken! $#%! $#%! $#%! $#%!';
    expect(actual).toEqual(expected);
  });
});
