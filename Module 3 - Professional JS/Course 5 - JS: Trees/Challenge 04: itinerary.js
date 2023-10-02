// Реализуйте и экспортируйте по умолчанию функцию, которая выстраивает маршрут между городами.

// Функция принимает 3 аргумента:
// 1) дерево городов
// 2) город старта
// 3) город окончания маршрута
// и возвращает массив городов, выстроенный в том же порядке, в котором они находятся на пути следования по маршруту.

// Примеры
// const tree = ['Moscow', [
//   ['Smolensk'],
//   ['Yaroslavl'],
//   ['Voronezh', [
//     ['Liski'],
//     ['Boguchar'],
//     ['Kursk', [
//       ['Belgorod', [
//         ['Borisovka'],
//       ]],
//       ['Kurchatov'],
//     ]],
//   ]],
//   ['Ivanovo', [
//     ['Kostroma'], ['Kineshma'],
//   ]],
//   ['Vladimir'],
//   ['Tver', [
//     ['Klin'], ['Dubna'], ['Rzhev'],
//   ]],
// ]];
 
// itinerary(tree, 'Dubna', 'Kostroma');
// ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma']
 
// itinerary(tree, 'Borisovka', 'Kurchatov');
// ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov']

// import _ from 'lodash';

const buildWay = (tree, point, path = []) => {
  if (Array.isArray(tree[0])) {
    return tree.map((node) => buildWay(node, point, path));
  }
  const [newParentNode, children] = tree;
  if (newParentNode === point) {
    return [...path, newParentNode];
  }
  if (!children) {
    return null;
  }
  return children.map((node) => buildWay(node, point, [...path, newParentNode]));
};

const flattenWay = (array) => array.flat(Infinity).filter((el) => el !== null);

const centralNode = (path1, path2) => {
  const commonCities = path1.filter((city) => path2.includes(city));
  return commonCities[commonCities.length - 1];
};

const buildShortestWay = (path1, path2, mainCity) => {
  const shortPath1 = path1.reverse().filter((city) => !path2.includes(city));
  const shortPath2 = path2.filter((city) => !path1.includes(city));
  return [...shortPath1, mainCity, ...shortPath2];
};

export default (tree, cityA, cityB) => {
  const path1 = flattenWay(buildWay(tree, cityA));
  const path2 = flattenWay(buildWay(tree, cityB));
  const mainCity = centralNode(path1, path2);
  return buildShortestWay(path1, path2, mainCity);
};

/* __tests__ */

import itinerary from '../itinerary.js';

describe('Itinerary', () => {
  const tree = ['Moscow', [
    ['Smolensk'],
    ['Yaroslavl'],
    ['Voronezh', [
      ['Liski'],
      ['Boguchar'],
      ['Kursk', [
        ['Belgorod', [
          ['Borisovka'],
        ]],
        ['Kurchatov'],
      ]],
    ]],
    ['Ivanovo', [
      ['Kostroma'], ['Kineshma'],
    ]],
    ['Vladimir'],
    ['Tver', [
      ['Klin'], ['Dubna'], ['Rzhev'],
    ]],
  ]];

  it('route 1', () => {
    const route = ['Dubna', 'Tver', 'Moscow', 'Ivanovo', 'Kostroma'];
    expect(itinerary(tree, 'Dubna', 'Kostroma')).toEqual(route);
  });

  it('route 2', () => {
    const route = ['Borisovka', 'Belgorod', 'Kursk', 'Kurchatov'];
    expect(itinerary(tree, 'Borisovka', 'Kurchatov')).toEqual(route);
  });

  it('route 3', () => {
    const route = ['Rzhev', 'Tver', 'Moscow'];
    expect(itinerary(tree, 'Rzhev', 'Moscow')).toEqual(route);
  });

  it('route 4', () => {
    const route = ['Ivanovo', 'Moscow', 'Voronezh', 'Kursk'];
    expect(itinerary(tree, 'Ivanovo', 'Kursk')).toEqual(route);
  });

  it('route 5', () => {
    const route = ['Rzhev', 'Tver', 'Moscow', 'Voronezh', 'Kursk', 'Belgorod', 'Borisovka'];
    expect(itinerary(tree, 'Rzhev', 'Borisovka')).toEqual(route);
  });

  it('route 6', () => {
    const route = ['Tver', 'Dubna'];
    expect(itinerary(tree, 'Tver', 'Dubna')).toEqual(route);
  });
});
