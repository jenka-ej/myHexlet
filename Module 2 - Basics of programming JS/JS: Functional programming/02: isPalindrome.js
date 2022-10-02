const isPalindrome = (str) => {
  if (str.length < 2) {
    return true;
  }
  if (str[0] === str[str.length - 1]) {
    const newStr = str.substring(1, str.length - 1);
    return isPalindrome(newStr);
  }
  return false;
};
export default isPalindrome;

/* __tests__ */

import isPalindrome from '../isPalindrome';

test('isPalindrome', () => {
  expect(isPalindrome('a')).toBe(true);
  expect(isPalindrome('aa')).toBe(true);
  expect(isPalindrome('404')).toBe(true);
  expect(isPalindrome('abba')).toBe(true);
  expect(isPalindrome('radar')).toBe(true);
  expect(isPalindrome('absba')).toBe(true);
  expect(isPalindrome('aibohphobia')).toBe(true);

  expect(isPalindrome('abaoba')).toBe(false);
  expect(isPalindrome('aashgkhdj')).toBe(false);
  expect(isPalindrome('palindrome')).toBe(false);
  expect(isPalindrome('aibohapohobia')).toBe(false);
});
