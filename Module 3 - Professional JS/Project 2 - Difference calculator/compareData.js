const file1 = {
  "common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  },
  "group1": {
    "baz": "bas",
    "foo": "bar",
    "nest": {
      "key": "value"
    }
  },
  "group2": {
    "abc": 12345,
    "deep": {
      "id": 45
    }
  }
};
const file2 = {
  "common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  },
  "group1": {
    "foo": "bar",
    "baz": "bars",
    "nest": "str"
  },
  "group3": {
    "deep": {
      "id": {
        "number": 45
      }
    },
    "fee": 100500
  }
};
const diff = (obj1, obj2) => {
  const getChildren = (obj) => Object.keys(obj);
  const childrenObj1 = getChildren(obj1);
  const childrenObj2 = getChildren(obj2);
  const childrenMass = childrenObj1.concat(childrenObj2);
  const final = childrenMass.filter((child, index) => childrenMass.indexOf(child) === index).sort();
  const cb = (acc, key) => {
    const obj1HasKey = Object.getOwnPropertyDescriptor(obj1, key);
    const obj2HasKey = Object.getOwnPropertyDescriptor(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];
    const obj1KeyIsObject = (typeof value1 === 'object' && value1 !== null && !Array.isArray(value1));
    const obj2KeyIsObject = (typeof value2 === 'object' && value2 !== null && !Array.isArray(value2));
    if (obj1HasKey && obj2HasKey && obj1KeyIsObject && obj2KeyIsObject) {
      acc[`${key}`] = diff(value1, value2);
      return acc;
    } else if (obj1HasKey && obj2HasKey && obj1KeyIsObject && !obj2KeyIsObject) {
      acc[`- ${key}`] = value1;
      acc[`+ ${key}`] = value2;
      return acc;
    } else if (obj1HasKey && obj2HasKey && !obj1KeyIsObject && obj2KeyIsObject) {
      acc[`- ${key}`] = value1;
      acc[`+ ${key}`] = value2;
      return acc;
    } else if (obj1HasKey && !obj2HasKey && obj1KeyIsObject) {
      acc[`- ${key}`] = value1;
      return acc;
    } else if (!obj1HasKey && obj2HasKey && obj2KeyIsObject) {
      acc[`+ ${key}`] = value2;
      return acc;
    } else if (obj1HasKey && obj2HasKey) {
      if (value1 === value2) {
        acc[`${key}`] = value1;
        return acc;
      }
      acc[`- ${key}`] = value1;
      acc[`+ ${key}`] = value2;
      return acc;
    } else if (obj1HasKey && !obj2HasKey) {
      acc[`- ${key}`] = value1;
      return acc;
    } else {
      acc[`+ ${key}`] = value2;
      return acc;
    }
  };
  return final.reduce(cb, {});
};
