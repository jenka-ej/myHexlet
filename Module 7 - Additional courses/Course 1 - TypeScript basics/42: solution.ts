// Вам дан интерфейс IVehicle. Задача состоит в том, чтобы на основе этого интерфейса реализовать класс Car, который будет иметь метод calcFuelNeeded,
// принимающий расстояние в километрах и возвращающий расход топлива на указанную дистанцию.
// Класс Car также должен иметь функцию конструктор, которая принимает и реализует свойства, указанные в интерфейсе.

// const porche = new Car(4, 'red', true, 20);
// console.log(porche.calcFuelNeeded(200)); // 40

interface IVehicle {
  seats: number;
  colour: string;
  canHavePassengers: boolean;
  fuelPer100Kilometers: number;
  calcFuelNeeded(distance:number): number;
}

class Car implements IVehicle {
  constructor(
    public seats: number,
    public colour: string,
    public canHavePassengers: boolean,
    public fuelPer100Kilometers: number,
  ) {}

  calcFuelNeeded(distance: number): number {
    const fuelPerKilometer = this.fuelPer100Kilometers / 100;
    return fuelPerKilometer * distance;
  }
}

export default Car;

/* __tests__ */

import Car from '../solution';

test('Car', () => {
  const porche = new Car(4, 'red', true, 20);
  expect(porche.calcFuelNeeded(100)).toBe(20);

  const schoolBus = new Car(30, 'yellow', true, 24);
  expect(schoolBus.calcFuelNeeded(25)).toBe(6);

  const lada = new Car(4, 'white', true, 13);
  expect(lada.calcFuelNeeded(200)).toBe(26);
});
