// Реализуйте и экспортируйте по умолчанию функцию, которая возвращает объект, соответствующий JSON из файла example.json в этом упражнении. 
// Всё, что вам нужно сделать, это:
// 1) Определить функцию
// 2) Посмотреть на содержимое example.json и руками сформировать объект аналогичной структуры
// 3) Вернуть полученный объект из функции

const objects = () => {
  const obj1 = {
    files: [
      'src/objects.js',
    ],
    config: true,
  };
  return obj1;
};
export default objects;

/* __tests__ */

import fs from 'fs';
import getJsonFileData from '../objects.js';

it('getJsonFileData', () => {
  const actual = getJsonFileData();
  const fileContent = fs.readFileSync('./example.json', 'utf-8');
  const expected = JSON.parse(fileContent);
  expect(actual).toEqual(expected);
});
