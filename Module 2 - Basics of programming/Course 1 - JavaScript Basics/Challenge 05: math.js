// Задача состоит в том, чтобы файл math.js импортировал в себя все функции из трех описанных выше файлов и выставил их наружу (то есть сделал их реэкспорт) 
// под следующими именами: pow, sum, sub, sqrt и multi. А так же экспортировал функцию cube() по умолчанию.
// В этом задании специально не сказано, где какая функция и под каким именем лежит.
// А так же не сказано, как они все экспортируются. Цель этого задания в том, чтобы вы хорошо разобрались с системой модулей,
// что очень упростит вашу жизнь в дальнейшем. Огромная просьба не подсматривать решение и подумать самостоятельно, а в случае чего задать вопрос в комьюнити.
// Не забудьте проанализировать файл с тестами, чтобы понять, как используется модуль math.js.

import cube from './numbers1.js';
import multi, { pow2 as pow, sum2 as sum, sub2 as sub } from './numbers2.js';
import sqrt from './numbers3.js';

export {
  pow,
  sum,
  sub,
  sqrt,
  multi,
};

export default cube;

/* numbers1.js */

export default (x) => x ** 3;

/* numbers2.js */

export const pow2 = (base, exp) => base ** exp;
export const sum2 = (a, b) => a + b;
export const sub2 = (a, b) => a - b;

export default (a, b) => a * b;

/* numbers3.js */

export default (x) => Math.sqrt(x);

/* __tests__ */

import cube, {
  sum, sub, sqrt, pow, multi,
} from '../math.js';

test('math', () => {
  expect(cube(3)).toBe(27);
  expect(sum(1, 3)).toBe(4);
  expect(sub(1, 3)).toBe(-2);
  expect(sqrt(4)).toBe(2);
  expect(pow(4, 2)).toBe(16);
  expect(multi(4, 2)).toBe(8);
});
