import {file1, file2, diff} from './compareData.js';
const plain = (objDiff) => {
  const result = [];
  const plainObjToText = (obj, path) => {
    const getChildren = (obj1) => Object.keys(obj1);
    const childrenObj = getChildren(obj);
    childrenObj.map((key) => {
      const value = obj[key];
      const objKeyIsObject = (typeof value === 'object' && value !== null && !Array.isArray(value));
      if (objKeyIsObject) {
        if (key[0] === '+' || key[0] === '-') {
          if (path === '') {
            const sign = key.slice(0, 1);
            const signKey = key.slice(2, key.length);
            return result.push([sign, `${signKey}`, '[complex value]']);
          }
          const sign = key.slice(0, 1);
          const signKey = key.slice(2, key.length);
          return result.push([sign, `${path}.${signKey}`, '[complex value]']);
        }
        if (path === '') {
          return plainObjToText(value, `${key}`);
        }
        return plainObjToText(value, `${path}.${key}`);
      }
      if (key[0] === '+' || key[0] === '-') {
        if (path === '') {
          const sign = key.slice(0, 1);
          const signKey = key.slice(2, key.length);
          return result.push([sign, `${signKey}`, value]);
        }
        const sign = key.slice(0, 1);
        const signKey = key.slice(2, key.length);
        return result.push([sign, `${path}.${signKey}`, value]);
      }
      return null;
    });
  };
  plainObjToText(objDiff, '');
  const finalResult = [];
  const plainResult = (mass) => {
    for (let i = 0; i < mass.length; i += 1) {
      const [signI, keyI, valueI] = mass[i];
      if (i + 1 < mass.length) {
        const [signJ, keyJ, valueJ] = mass[i + 1];
        if (keyI === keyJ) {
          finalResult.push([`${signI}${signJ}`, keyI, valueI, valueJ]);
          i += 1;
        } else {
          finalResult.push([signI, keyI, valueI]);
        }
      } else {
        finalResult.push([signI, keyI, valueI]);
      }
    }
  };
  plainResult(result);
  const text = (mass) => mass.map((massive) => {
    if (massive.length === 3) {
      const [sign, key, value] = massive;
      const valueS = (value === true
        || value === false
        || value === null
        || value === '[complex value]'
        || !isNaN(value));
      if (sign === '-') {
        return `Property '${key}' was removed`;
      }
      if (valueS) {
        return `Property '${key}' was added with value: ${value}`;
      } else if (value === '') {
        return `Property '${key}' was added with value: ''`;
      }
      return `Property '${key}' was added with value: '${value}'`;
    }
    const [sign, key, value1, value2] = massive;
    if (sign === '-+') {
      const valueS1 = (value1 === true
        || value1 === false
        || value1 === null
        || value1 === '[complex value]'
        || !isNaN(value1));
      const valueS2 = (value2 === true
        || value2 === false
        || value2 === null
        || value2 === '[complex value]'
        || !isNaN(value2));
      if (value1 === '') {
        if (valueS2) {
          return `Property '${key}' was updated. From '' to ${value2}`;
        }
        return `Property '${key}' was updated. From '' to '${value2}'`;
      } if (value2 === '') {
        if (valueS1) {
          return `Property '${key}' was updated. From ${value1} to ''`;
        }
        return `Property '${key}' was updated. From '${value1}' to ''`;
      } if (valueS1 && valueS2) {
        return `Property '${key}' was updated. From ${value1} to ${value2}`;
      } if (valueS1 && !valueS2) {
        return `Property '${key}' was updated. From ${value1} to '${value2}'`;
      } if (!valueS1 && valueS2) {
        return `Property '${key}' was updated. From '${value1}' to ${value2}`;
      }
      return `Property '${key}' was updated. From '${value1}' to '${value2}'`;
    }
    return null;
  });
  const plainResultText = JSON.stringify(text(finalResult)).split('"').join('')
    .split(',')
    .join('\n');
  const finalResultText = plainResultText.slice(1, plainResultText.length - 1);
  return finalResultText;
};
console.log(plain(diff(file1, file2)));

//output
/*
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
*/
