// Реализуйте функцию newYearCongratulate(), которая аналогична примеру на Kotlin из теории:
// sayHello('John'); // Hi John! Happy New Year!
// sayHello(2023, 'Mila'); // Hi Mila! Happy New Year 2023!

type Overload = {
  (firstPart: number, secondPart: string): string;
  (firstPart: string): string;
};

const newYearCongratulate: Overload = (firstPart: string | number, secondPart?: string): string => {
  if (typeof firstPart === 'number') {
    return `Hi ${secondPart}! Happy New Year ${firstPart}!`;
  }
  return `Hi ${firstPart}! Happy New Year!`;
};

export default newYearCongratulate;

/* __tests__ */

import sayHello from '../solution';

test('function', () => {
  expect(sayHello('John')).toBe('Hi John! Happy New Year!');
  expect(sayHello(2023, 'Mila')).toBe('Hi Mila! Happy New Year 2023!');
});
