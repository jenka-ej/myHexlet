const enlargeArrayImage = (array) => array
  .reduce((acc, massive) => {
    const doubleElement = (element) => element + element;
    acc.push(massive.map((element) => doubleElement(element)).join('').split(''));
    acc.push(massive.map((element) => doubleElement(element)).join('').split(''));
    return acc;
  }, []);
export default enlargeArrayImage;

/* __tests__ */

import enlargeArrayImage from '../enlargeArrayImage.js';

test('solution', () => {
  const arr1 = [
    ['*', '*', '*', '*'],
    ['*', ' ', ' ', '*'],
    ['*', ' ', ' ', '*'],
    ['*', '*', '*', '*'],
  ];

  const arr1Enlarged = [
    ['*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*'],
    ['*', '*', '*', '*', '*', '*', '*', '*'],
  ];

  const arr2 = [
    [' ', ' ', '*', ' ', ' '],
    [' ', '*', ' ', '*', ' '],
    [' ', '*', ' ', '*', ' '],
    ['*', ' ', ' ', ' ', '*'],
    ['*', ' ', ' ', ' ', '*'],
    [' ', '*', ' ', '*', ' '],
    [' ', '*', ' ', '*', ' '],
    [' ', ' ', '*', ' ', ' '],
  ];

  const arr2Enlarged = [
    [' ', ' ', ' ', ' ', '*', '*', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', '*', '*', ' ', ' ', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    ['*', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*'],
    ['*', '*', ' ', ' ', ' ', ' ', ' ', ' ', '*', '*'],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', '*', '*', ' ', ' ', '*', '*', ' ', ' '],
    [' ', ' ', ' ', ' ', '*', '*', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', '*', '*', ' ', ' ', ' ', ' '],
  ];

  const arr3 = [
    ['@', '@'],
    ['@', '|'],
    ['—', '|'],
    ['@', '|'],
    ['@', '@'],
  ];

  const arr3Enlarged = [
    ['@', '@', '@', '@'],
    ['@', '@', '@', '@'],
    ['@', '@', '|', '|'],
    ['@', '@', '|', '|'],
    ['—', '—', '|', '|'],
    ['—', '—', '|', '|'],
    ['@', '@', '|', '|'],
    ['@', '@', '|', '|'],
    ['@', '@', '@', '@'],
    ['@', '@', '@', '@'],
  ];

  const arr4 = [
    ['x'],
  ];

  const arr4Enlarged = [
    ['x', 'x'],
    ['x', 'x'],
  ];

  const result1 = enlargeArrayImage(arr1);
  expect(result1).toEqual(arr1Enlarged);

  const result2 = enlargeArrayImage(arr2);
  expect(result2).toEqual(arr2Enlarged);

  const result3 = enlargeArrayImage(arr3);
  expect(result3).toEqual(arr3Enlarged);

  const result4 = enlargeArrayImage(arr4);
  expect(result4).toEqual(arr4Enlarged);
});
