// Существуют сервисы бронирования отелей, такие как Booking, Kayak, Ostrovok. 
// Каждый из них имеет какую-то комиссию и политику ценообразования.
// В течение этой задачи нам предстоит реализовать API, работающее с этими сервисами и поиск самого выгодного предложения из них.
// Наш сервис должен показывать честную цену, с учетом всех комиссий и преобразований. Валюта отображения – рубли.

// Политика ценообразования для сервисов:
// 1) Ostrovok: цену нужно увеличивать на налог 12%, платится за каждое бронирование
// 2) Booking: цену нужно преобразовывать из долларов в рубли по курсу 1:75
// 3) Kayak: никаких изменений, показывают конечную и удобную цену для нас

// Описание отеля в каждом сервисе выглядит одинаково:

// cost будет разный в зависимости от сервиса и его политики ценообразования
// именно это число нужно "нормализовывать" для сравнения
// const hotel = { name: 'hexletInn', cost: 600 };

// Реализуйте и экспортируйте по умолчанию функцию, обрабатывающую данные от разных сервисов бронирования.
// Она должна устанавливать для каждого цену, с учётом коэффициента этого сервиса.
// Функция возвращает массив отелей и сервисов, попавших в условие. Данные для обработки берутся из файла src/data.js

// import findAllMatching from './src/gateway.js';
// Цены на отели возвращаются уже в нормализованном виде
// возвращается массив отелей объединенных с именем сервиса из которого они извлекаются
// const hotelInfos = findAllMatching();
// [
  // { hotel: { cost: 224, name: 'volga' }, service: 'ostrovok' }
  // { hotel: { cost: 500, name: 'hexletInn' }, service: 'booking' }
// ]

// Шлюз поддерживает фильтрацию по минимальной и максимальной цене:
// По умолчанию min и max не заданы, но их можно указать
// findAllMatching({ min: 200, max: 300 });
 
// Можно указывать только один предикат
// findAllMatching({ max: 500 });
// findAllMatching({ min: 100 });

// Реализуйте логику функции, работающей со шлюзом таким образом, чтобы она принимала от пользователя диапазон цен,
// обращалась к сервису и выбирала из него наиболее выгодное предложение:

// import findTheCheapestService from './src/index.js';
// findTheCheapestService({ min: 200, max: 300 });
// { hotel: { cost: 224, name: 'volga' }, service: 'ostrovok' }

import findAllMatching from './gateway.js';

const findTheCheapestService = (predicates = {}) => {
  const services = findAllMatching(predicates);
  const minCost = services.map(({ hotel }) => {
    const { cost } = hotel;
    return cost;
  }).sort((a, b) => a - b)[0];
  const cheapestService = services.filter(({ hotel }) => {
    const { cost } = hotel;
    return cost === minCost;
  })[0];
  return cheapestService;
};

export default findTheCheapestService;

/* gateway.js */

import hotelsByService from './data.js';

const findAllMatching = (range = {}) => {
  const newRange = { ...range };
  newRange.min = newRange.min || 0;
  newRange.max = newRange.max || Infinity;
  const { min, max } = newRange;
  const recosting = {
    ostrovok: 1.12,
    booking: 75,
    kayak: 1,
  };
  const result = hotelsByService.reduce((acc, company) => {
    const { service, hotels } = company;
    const ratio = recosting[service];
    const recostingHotels = hotels.map(({ name, cost }) => {
      const newCost = Math.floor(cost * ratio * 10) / 10;
      const condition = newCost >= min && newCost <= max;
      return condition ? { hotel: { name, cost: newCost }, service } : null;
    }).filter((hotel) => hotel !== null);
    const newAcc = [...acc, ...recostingHotels];
    return newAcc;
  }, []);
  return result;
};

export default findAllMatching;

/* data.js */

export default [
  {
    service: 'ostrovok',
    hotels: [
      { name: 'hexletInn', cost: 600 },
      { name: 'volga', cost: 620 },
      { name: 'mariiot', cost: 550 },
      { name: 'azimut', cost: 810 },
    ],
  },
  {
    service: 'booking',
    hotels: [
      { name: 'hexletInn', cost: 15 },
      { name: 'volga', cost: 11 },
      { name: 'mariiot', cost: 9 },
      { name: 'azimut', cost: 10.7 },
    ],
  },
  {
    service: 'kayak',
    hotels: [
      { name: 'hexletInn', cost: 680 },
      { name: 'volga', cost: 750 },
      { name: 'mariiot', cost: 500 },
      { name: 'azimut', cost: 810 },
    ],
  },
];

/* __tests__ */

import findTheCheapestService from '../src/index.js';

test('with min/max', () => {
  const expected1 = { hotel: { cost: 616, name: 'mariiot' }, service: 'ostrovok' };
  const predicates1 = { min: 600, max: 800 };
  const result1 = findTheCheapestService(predicates1);
  expect(result1).toEqual(expected1);

  const expected2 = { hotel: { cost: 672, name: 'hexletInn' }, service: 'ostrovok' };
  const predicates2 = { min: 650, max: 700 };
  const result2 = findTheCheapestService(predicates2);
  expect(result2).toEqual(expected2);
});

test('only min', () => {
  const expected = { hotel: { cost: 802.5, name: 'azimut' }, service: 'booking' };
  const predicates = { min: 800 };
  const result = findTheCheapestService(predicates);
  expect(result).toEqual(expected);
});

test('only max', () => {
  const expected = { hotel: { cost: 500, name: 'mariiot' }, service: 'kayak' };
  const predicates = { max: 570 };
  const result = findTheCheapestService(predicates);
  expect(result).toEqual(expected);
});

test('nothing', () => {
  const expected = { hotel: { cost: 500, name: 'mariiot' }, service: 'kayak' };
  const result = findTheCheapestService();
  expect(result).toEqual(expected);
});
