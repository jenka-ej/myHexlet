// Вам даны несколько интерфейсов. На их основе создайте интерфейс ISuperman, который должен расширять интерфейсы IBird и IPlane.
// Создайте объект superman, реализующий этот интерфейс. ISuperman должен иметь метод guessWho(), возвращающий строку с указанным аргументом.
// Если в качестве строки к нам приходит любое значение кроме superman (в любом регистре), то следует вернуть предположение "It's a ${value}?", иначе "It's a ${value}!"

// console.log(superman.guessWho('bird')); // "It's a bird?";
// console.log(superman.guessWho('plane')); // "It's a plane?";
// console.log(superman.guessWho('superman')); // "It's a superman!";

interface IFlying {
  canFly: true;
}

interface IBird extends IFlying {
  isLiving: true;
}

interface IPlane extends IFlying {
  canCarryPeople: true;
}

interface ISuperman extends IBird, IPlane {
  guessWho(text: string): string;
}

const superman: ISuperman = {
  canFly: true,
  isLiving: true,
  canCarryPeople: true,
  guessWho(text: string): string {
    const isSuperman = text.toLowerCase() === 'superman';
    return isSuperman ? `It's a ${text}!` : `It's a ${text}?`;
  },
};

export default superman;

/* __tests__ */

import superman from '../solution';

test('guess who', () => {
  expect(superman.guessWho('bird')).toBe("It's a bird?");
  expect(superman.guessWho('plane')).toBe("It's a plane?");
  expect(superman.guessWho('SupErMan')).toBe("It's a SupErMan!");
});
