// Быстрая сортировка, сортировка Хоара (англ. quicksort), часто называемая qsort (по имени в стандартной библиотеке языка Си) — широко известный алгоритм сортировки, 
// разработанный английским информатиком Чарльзом Хоаром во время его работы в МГУ в 1960 году.
// Общая идея алгоритма состоит в следующем:
// Выбрать из списка элемент, называемый опорным. Это может быть любой из элементов списка или же число, вычисленное на основе значений элементов.
// Сравнить все остальные элементы с опорным и переставить их в списке так, чтобы разбить список на три непрерывных отрезка, следующих друг за другом: «меньшие опорного»,
// «равные» и «большие».
// Для отрезков «меньших» и «больших» значений выполнить рекурсивно ту же последовательность операций, если длина отрезка больше единицы.

import { l, isEmpty, head, tail, cons, concat, filter, toString as listToString } from '@hexlet/pairs-data';

const sort = (list) => {
  if (isEmpty(list)) {
    return l();
  }
  const base = head(list);
  const lessBase = filter((el) => el < base, list);
  const equalBase = filter((el) => el === base, list);
  const moreBase = filter((el) => el > base, list);
  return concat(concat(sort(lessBase), equalBase), sort(moreBase));
};
export default sort;

/* __tests__ */

import { l, toString as listToString } from '@hexlet/pairs-data';
import sort from '../sort.js';

describe('Sort', () => {
  it('set 1', () => {
    const result = sort(l());
    expect(listToString(result)).toBe(listToString(l()));

    const result2 = sort(l(5, -3, 2, 10, 4, 4, 5));
    expect(listToString(result2)).toBe(listToString(l(-3, 2, 4, 4, 5, 5, 10)));

    const result3 = sort(l(3, 3, 0, -1, 0, 4, -5));
    expect(listToString(result3)).toBe(listToString(l(-5, -1, 0, 0, 3, 3, 4)));

    const result4 = sort(l(5, -3, 2, 10, 4, 3, 5));
    expect(listToString(result4)).toBe(listToString(l(-3, 2, 3, 4, 5, 5, 10)));
  });
});
