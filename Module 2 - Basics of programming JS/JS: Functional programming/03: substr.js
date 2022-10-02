const substr = (str, firstIndex = 0, lengthSubstring = str.length) => {
  let newFirstIndex = firstIndex;
  let newLengthSubstring = lengthSubstring;
  if (newFirstIndex < 0) {
    newFirstIndex = 0;
  }
  if (newLengthSubstring === 0 || newFirstIndex >= str.length) {
    return '';
  }
  if (newLengthSubstring < 0) {
    newLengthSubstring = 1;
  }
  let result = '';
  if (newFirstIndex + newLengthSubstring > str.length) {
    for (let i = newFirstIndex; i < str.length; i += 1) {
      result += str[i];
    }
    return result;
  }
  for (let i = newFirstIndex; i < newFirstIndex + newLengthSubstring; i += 1) {
    result += str[i];
  }
  return result;
};
export default substr;

/* __tests__ */

import substr from '../substr';

test('substr', () => {
  expect(substr('')).toEqual('');
  expect(substr('abba', 4, -10)).toEqual('');
  expect(substr('abba')).toEqual('abba');
  expect(substr('abba', 1, 0)).toEqual('');
  expect(substr('abba', 0, 1)).toEqual('a');
  expect(substr('abba', 1, 2)).toEqual('bb');
  expect(substr('abba', -10, 2)).toEqual('ab');
  expect(substr('abba', -1, 100)).toEqual('abba');
  expect(substr('abba', -1, -1)).toEqual('a');
  expect(substr('abba', 1, -10)).toEqual('b');
  expect(substr('abba', 1, 10)).toEqual('bba');
  expect(substr('abba', 0, 4)).toEqual('abba');
  expect(substr('abba', 0, 5)).toEqual('abba');
});
