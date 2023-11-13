// Реализуйте интерфейс EmployeeSalary, где ключом выступает имя (string), а значением — зарплата (number).
// Также реализуйте функцию buildSalaryStatistics(employees: EmployeeSalary):
// SalaryStatistics, которая должна возвращать минимальную (поле min), среднюю (поле avg) и самую высокую (поле max) зарплату.

// const employees: EmployeeSalary = {
//   mango: 100,
//   poly: 50,
//   ajax: 150,
// };
 
// employees.ironMan = 1000;
 
// buildSalaryStatistics(employees); // { min: 50, max: 1000, avg: 325 }

interface SalaryStatistics {
  min: number;
  max: number;
  avg: number;
}

interface EmployeeSalary {
  [key: string]: number;
}

function buildSalaryStatistics(employees: EmployeeSalary): SalaryStatistics {
  const values = Object.values(employees);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const avg = values.reduce((acc, value) => acc + value, 0) / values.length;
  return { min, max, avg };
}

export {
  EmployeeSalary,
  buildSalaryStatistics,
};

/* __tests__ */

import { buildSalaryStatistics, EmployeeSalary } from '../solution';

test('buildSalaryStatistics', () => {
  const employees: EmployeeSalary = {
    mango: 100,
    poly: 50,
    ajax: 150,
  };

  const expected = {
    min: 50,
    max: 150,
    avg: 100,
  };

  expect(buildSalaryStatistics(employees)).toEqual(expected);

  employees.ironMan = 1000;
  expect(buildSalaryStatistics(employees)).toEqual({
    min: 50,
    max: 1000,
    avg: 325,
  });
});
