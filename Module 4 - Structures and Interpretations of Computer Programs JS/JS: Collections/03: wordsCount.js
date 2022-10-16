// Реализуйте и экспортируйте по умолчанию функцию, которая принимает на вход два параметра: список слов и список стоп-слов. 
// Задача функции вернуть объект типа Map, содержащий в себе частоту переданных слов. То есть, ключами являются сами слова, а значениями число повторений.
// Слова могут быть в разных регистрах, а подсчет должен работать без учета регистра. 
// Соответственно в результирующем наборе слова должны быть представлены в нижнем регистре.
// Порядок слов в выходе должен совпадать с порядком появления новых слов во входном наборе.
// stopWords – это список стоп-слов, которые не должны попадать в результирующую структуру. Стоп-слова указываются в нижнем регистре.

const wordsCount = (words, stopWords) => {
  const lowerKeys = words.map((word) => word.toLowerCase());
  const uniqKeys = lowerKeys.filter((word, index) => lowerKeys.indexOf(word) === index);
  const uniqKeys2 = uniqKeys.filter((word) => {
    let temp = '';
    stopWords.map((stopWord) => {
      if (word === stopWord) {
        temp = stopWord;
      }
      return null;
    });
    return word !== temp;
  });
  const cb = (acc, word) => {
    let count = 0;
    lowerKeys.map((lowWord) => {
      if (word === lowWord) {
        count += 1;
      }
      return null;
    });
    acc.push([word, count]);
    return acc;
  };
  const final = new Map(uniqKeys2.reduce(cb, []));
  return final;
};
export default wordsCount;

/* __tests__ */

import wordsCount from '../wordsCount';

const stopWords = ['and', 'or', 'a', 'the', ''];

test('wordsCount', () => {
  const actual = wordsCount([], []);
  expect(actual).toEqual(new Map());

  const data1 = ['HellO', 'h', 'And', 'heLlo', '', 'AND', 'DOG', 'oR', 'cat', 'HELLO', 'caT'];
  const expected1 = [['hello', 3], ['h', 1], ['dog', 1], ['cat', 2]];
  const actual1 = wordsCount(data1, stopWords);
  expect(actual1).toEqual(new Map(expected1));

  const data2 = ['aNd', 'maybe', 'MAYBE', 'whAt', 'WHerE', 'wHat', 'wha', 'hat', 'Or'];
  const expected2 = [['maybe', 2], ['what', 2], ['where', 1], ['wha', 1], ['hat', 1]];
  const actual2 = wordsCount(data2, stopWords);
  expect(actual2).toEqual(new Map(expected2));
});
