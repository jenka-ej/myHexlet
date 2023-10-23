// Реализуйте объект по описанному типу Form. Укажите значения value для каждого из полей name и age, а также реализуйте функции валидации.
// Валидации могут быть любыми, реализуйте их как угодно на ваше усмотрение. Укажите значения value так, чтобы name.value проходило валидацию, а age.value — нет.

// console.log(form.name.validator(form.name.value)); // true
// console.log(form.age.validator(form.age.value)); // false

type Form = {
  age: {
    value: number,
    validator: (val: number) => boolean
  },
  name: {
    value: string,
    validator: (val: string) => boolean
  }
};

const form: Form = {
  age: {
    value: 17,
    validator: (val: number): boolean => val > 18,
  },
  name: {
    value: 'John',
    validator: (val: string): boolean => val.length > 1,
  },
};

export default form;

/* __tests__ */

import * as ta from 'type-assertions';

import form from '../solution';

test('form', () => {
  const nameValidator = form.name.validator;
  const ageValidator = form.age.validator;

  expect(nameValidator(form.name.value)).toBe(true);
  expect(ageValidator(form.age.value)).toBe(false);

  ta.assert<ta.Equal<Parameters<typeof nameValidator>, [string]>>();
  ta.assert<ta.Equal<Parameters<typeof ageValidator>, [number]>>();
});
