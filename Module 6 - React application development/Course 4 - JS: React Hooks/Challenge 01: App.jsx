// В этой задаче вам предстоит реализовать таблицу с возможностью сортировки по столбцам.
// В качестве данных передаётся список с объектами, данные передаются через props.
// Вам нужно вывести таблицу, в которой каждый столбец будет указывать на значение в объекте.
// Клик по заглавию столбца сортирует таблицу. При первом клике - сортировка по возрастанию, при втором - по убыванию.
// Сортировка выполняется только по одному столбцу. По умолчанию список выводится в том порядке, в котором пришёл.
// Сами объекты могут иметь любую плоскую структуру, это значит, что ключи у них могут быть другими.

// Пример данных:
// const list = [
//   { id: 1, firstName: 'Amaya', lastName: 'Torphy', jobTitle: 'Legacy Group Facilitator', email: 'Rosie_Mann@gmail.com' },
//   { id: 2, firstName: 'Weston', lastName: 'Huel', jobTitle: 'Regional Data Agent', email: 'Tristian_Vandervort68@yahoo.com' },
//   { id: 3, firstName: 'Bridgette', lastName: 'Corwin', jobTitle: 'Internal Usability Officer', email: 'Sherman.Purdy@hotmail.com' },
// ];

// Пример таблицы:
// <table class="table">
//   <thead>
//     <tr>
//       <th>id</th>
//       <th>firstName</th>
//       <th>lastName</th>
//       <th>jobTitle</th>
//       <th>email</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr>
//       <td>1</td>
//       <td>Amaya</td>
//       <td>Torphy</td>
//       <td>Legacy Group Facilitator</td>
//       <td>Rosie_Mann@gmail.com</td>
//     </tr>
//     <tr>
//       <td>2</td>
//       <td>Weston</td>
//       <td>Huel</td>
//       <td>Regional Data Agent</td>
//       <td>Tristian_Vandervort68@yahoo.com</td>
//     </tr>
//     <tr>
//       <td>3</td>
//       <td>Bridgette</td>
//       <td>Corwin</td>
//       <td>Internal Usability Officer</td>
//       <td>Sherman.Purdy@hotmail.com</td>
//     </tr>
//   </tbody>
// </table>

// Реализуйте таблицу.

import React, { useState } from 'react';

const App = ({ list }) => {
  const [state, updState] = useState({ by: null, order: true, list });
  const headers = Object.keys(list[0]);

  const compare = (a, b, by) => {
    if (a[by] > b[by]) {
      return 1;
    }
    if (a[by] < b[by]) {
      return -1;
    }
    return 0;
  };

  const sort = (by, order) => {
    const newList = [...list];
    if (order) {
      return newList.sort((a, b) => compare(a, b, by));
    }
    return newList.sort((a, b) => compare(a, b, by)).reverse();
  };

  const changeBy = (target) => {
    const { by, order } = state;
    if (target === by) {
      return updState(() => ({
        by,
        order: !order,
        list: sort(target, !order),
      }));
    }
    return updState(() => ({
      by: target,
      order: true,
      list: sort(target, true),
    }));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th id={header} key={header} onClick={(e) => changeBy(e.target.id)}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {state.list.map((user, index) => {
          const {
            id,
            firstName,
            lastName,
            jobTitle,
            email,
          } = user;
          const key = `list-${index}`;
          return (
            <tr key={key}>
              <td>{id}</td>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>{jobTitle}</td>
              <td>{email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

/* index.jsx */

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App.jsx';

import users from '../__fixtures__/users.js';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<App list={users} />);

/* __fixtures__/users.js */

export default [
  {
    id: 1,
    firstName: 'Gwendolyn',
    lastName: 'Lind',
    jobTitle: 'District Integration Director',
    email: 'Nora.Corkery@yahoo.com',
  },
  {
    id: 2,
    firstName: 'Cecile',
    lastName: 'Mosciski',
    jobTitle: 'Principal Functionality Agent',
    email: 'Lionel_Wilkinson54@gmail.com',
  },
  {
    id: 3,
    firstName: 'Colleen',
    lastName: 'Kihn',
    jobTitle: 'Principal Interactions Specialist',
    email: 'Pete63@yahoo.com',
  },
  {
    id: 4,
    firstName: 'Gabriella',
    lastName: 'Ernser',
    jobTitle: 'Senior Interactions Officer',
    email: 'Broderick55@hotmail.com',
  },
  {
    id: 5,
    firstName: 'Mortimer',
    lastName: 'Brakus',
    jobTitle: 'Legacy Research Facilitator',
    email: 'Ashleigh_West@hotmail.com',
  },
  {
    id: 6,
    firstName: 'Nella',
    lastName: 'Murphy',
    jobTitle: 'Direct Communications Orchestrator',
    email: 'Imelda.Padberg@yahoo.com',
  },
  {
    id: 7,
    firstName: 'Ed',
    lastName: 'Ullrich',
    jobTitle: 'Customer Operations Designer',
    email: 'Joanie62@hotmail.com',
  },
  {
    id: 8,
    firstName: 'Marlon',
    lastName: 'Toy',
    jobTitle: 'Chief Accountability Designer',
    email: 'Loyce.Feeney56@gmail.com',
  },
  {
    id: 9,
    firstName: 'Christine',
    lastName: 'Hodkiewicz',
    jobTitle: 'National Research Representative',
    email: 'Murl_Kirlin@yahoo.com',
  },
  {
    id: 10,
    firstName: 'Florencio',
    lastName: 'Toy',
    jobTitle: 'Lead Creative Architect',
    email: 'Shyann_DuBuque@hotmail.com',
  },
];

/* routes.js */

const routes = {
  getData: () => '/api/data',
};

export default routes;

/* __tests__ */

import '@testing-library/jest-dom';

import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import _ from 'lodash';
import users from '../__fixtures__/users.js';

import App from '../src/components/App.jsx';

const getPropertiesList = (data) => {
  const headers = ['id', 'firstName', 'lastName', 'jobTitle', 'email'];
  const groupedRows = _.chunk(data, headers.length);
  const result = headers.reduce((acc, header, index) => {
    const currValues = (header === 'id')
      ? groupedRows.map((item) => +item[index])
      : groupedRows.map((item) => item[index]);

    return { ...acc, [header]: currValues };
  }, {});

  return result;
};

beforeEach(() => {
  const vdom = (
    <App list={users} />
  );
  render(vdom);
});

test('Init', async () => {
  const elements = await screen.getAllByRole('cell').map((item) => item.textContent);
  const headers = await screen.getAllByRole('columnheader');

  const groupedData = getPropertiesList(elements);
  headers.forEach((header) => {
    const property = header.textContent;
    const expectedList = users.map((user) => user[property]);
    expect(groupedData[property]).toEqual(expectedList);
  });
});

test('Sort asc', async () => {
  const headers = await screen.getAllByRole('columnheader');
  headers.forEach(async (header) => {
    fireEvent.click(header);
    const elements = await screen.getAllByRole('cell').map((item) => item.textContent);
    const groupedData = getPropertiesList(elements);
    const property = header.textContent;
    const expectedList = users
      .map((user) => user[property])
      .sort((a, b) => (a > b ? 1 : -1));
    expect(groupedData[property]).toEqual(expectedList);
  });
});

test('Sort desc', async () => {
  const headers = await screen.getAllByRole('columnheader');
  headers.forEach(async (header) => {
    fireEvent.click(header);
    fireEvent.click(header);
    const elements = await screen.getAllByRole('cell').map((item) => item.textContent);
    const groupedData = getPropertiesList(elements);
    const property = header.textContent;
    const expectedList = users
      .map((user) => user[property])
      .sort((a, b) => (a < b ? 1 : -1));
    expect(groupedData[property]).toEqual(expectedList);
  });
});
