// Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход список компаний (пример списка в файле src/index.js) и 
// использует этот список для формирования кнопок (по одной на каждую компанию). 
// Нажатие на кнопку приводит к выводу описания компании (если есть описание другой компании, оно заменяется). 
// Повторное нажатие удаляет вывод. Данные должны полностью удаляться, скрытие с помощью классов не подходит. По умолчанию не показывается никакое описание.

// Пример начального вывода (может отличаться от вашего):

// <div class="container m-3">
//   <button class="btn btn-primary">
//     Hexlet
//   </button>
//   <button class="btn btn-primary">
//     Google
//   </button>
//   <button class="btn btn-primary">
//     Facebook
//   </button>
// </div>

// После клика на второй кнопке добавляется описание:

// <div class="container m-3">
//   <button class="btn btn-primary">
//     Hexlet
//   </button>
//   <button class="btn btn-primary">
//     Google
//   </button>
//   <button class="btn btn-primary">
//     Facebook
//   </button>
//   <div>search engine</div>
// </div>

// После клика на третьей кнопке описание заменяется на новое:

// <div class="container m-3">
//   <button class="btn btn-primary">
//     Hexlet
//   </button>
//   <button class="btn btn-primary">
//     Google
//   </button>
//   <button class="btn btn-primary">
//     Facebook
//   </button>
//   <div>social network</div>
// </div>

// После повторного клика на третьей кнопке описание удаляется:

// <div class="container m-3">
//   <button class="btn btn-primary">
//     Hexlet
//   </button>
//   <button class="btn btn-primary">
//     Google
//   </button>
//   <button class="btn btn-primary">
//     Facebook
//   </button>
// </div>

export default (companies) => {
  const state = {
    companies,
    uiState: [],
  };
  const create = (allCompanies) => {
    const container = document.querySelector('div');
    allCompanies.map((company) => {
      const button = document.createElement('button');
      button.classList.add('btn');
      button.classList.add('btn-primary');
      button.textContent = company.name;
      container.append(button);
      const uiCompany = {
        id: company.id,
        visibility: 'hidden',
      };
      state.uiState.push(uiCompany);
      return null;
    });
  };
  create(companies);

  const render = (currentState) => {
    if (document.querySelector('#description')) {
      document.querySelector('#description').remove();
    }
    const filterUi = currentState.uiState.filter((ui) => ui.visibility === 'shown');
    if (filterUi.length === 0) {
      return;
    }
    const uiId = filterUi[0].id;
    currentState.companies.map((company) => {
      if (company.id === uiId) {
        const description = document.createElement('div');
        description.setAttribute('id', 'description');
        description.textContent = company.description;
        document.querySelector('.container').append(description);
        return null;
      }
      return null;
    });
  };

  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      const currentId = state.companies.filter((company) => company.name === e.target.textContent);
      state.uiState.map((company) => {
        if (company.id === currentId[0].id) {
          if (company.visibility === 'hidden') {
            company.visibility = 'shown';
            return null;
          }
          company.visibility = 'hidden';
          return null;
        }
        company.visibility = 'hidden';
        return null;
      });
      render(state);
    });
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom, { waitFor } from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

let companies;

beforeEach(() => {
  companies = [
    { id: 1, name: 'Hexlet', description: 'online courses' },
    { id: 2, name: 'Google', description: 'search engine' },
    { id: 3, name: 'Facebook', description: 'social network' },
  ];

  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run(companies);
});

test('working process', async () => {
  const company1 = companies[0];
  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).toHaveTextContent(company1.description);
  });

  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).not.toHaveTextContent(company1.description);
  });

  const company2 = companies[1];
  await userEvent.click(screen.getByText(company2.name));
  await waitFor(() => {
    expect(document.body).toHaveTextContent(company2.description);
  });

  // button 1
  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).toHaveTextContent(company1.description);
  });

  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).not.toHaveTextContent(company2.description);
  });

  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).toHaveTextContent(company1.description);
  });

  await userEvent.click(screen.getByText(company1.name));
  await waitFor(() => {
    expect(document.body).not.toHaveTextContent(company1.description);
  });

  const company3 = companies[2];
  await userEvent.click(screen.getByText(company3.name));
  await waitFor(() => {
    expect(document.body).toHaveTextContent(company3.description);
  });

  await userEvent.click(screen.getByText(company3.name));
  await waitFor(() => {
    expect(document.body).not.toHaveTextContent(company3.description);
  });
});

test('initial state', async () => {
  companies.forEach((c) => {
    expect(document.body).not.toHaveTextContent(c.description);
  });

  companies.forEach((c) => {
    expect(document.body).toHaveTextContent(c.name);
  });
});
