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
