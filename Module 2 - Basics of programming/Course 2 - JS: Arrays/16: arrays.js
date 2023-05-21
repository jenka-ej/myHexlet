// Реализуйте и экспортируйте по умолчанию функцию, которая сортирует массив используя пузырьковую сортировку.

const bubbleSort = (arr) => {
  let stepsCount = arr.length - 1;
  let swapped;
  do {
    swapped = false;
    for (let i = 0; i < stepsCount; i += 1) {
      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    stepsCount -= 1;
  } while (swapped);

  return arr;
};

export default bubbleSort;

/* __tests__ */

import bubbleSort from '../arrays';

it('bubbleSort', () => {
  expect(bubbleSort([])).toEqual([]);
  expect(bubbleSort([10, 1, 3])).toEqual([1, 3, 10]);
  expect(bubbleSort([0, 4, 0, 10, -3])).toEqual([-3, 0, 0, 4, 10]);
});
