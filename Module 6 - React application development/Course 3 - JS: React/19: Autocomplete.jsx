// Реализуйте компонент <Autocomplete />, который представляет собой текстовое поле с автодополнением списка стран. 
// Автодополнение срабатывает только в том случае, если указан хотя бы один символ. Для пустого запроса ничего не выводится.

// Список стран можно получить, сделав запрос:
// const res = await axios.get('/countries', { params: { term: 'al' } });
// console.log(res.data); // => ["Albania","Algeria"]
// Где term – это начало слова (любое количество символов введенное пользователем)

// Начальный HTML:
// <div>
//   <form>
//     <input type="text" class="form-control" placeholder="Enter Country">
//   </form>
// </div>

// HTML после выбора "al":
// <div>
//   <form>
//     <input type="text" class="form-control" placeholder="Enter Country">
//   </form>
//   <ul>
//     <li>Albania</li>
//     <li>Algeria</li>
//   </ul>
// </div>

import axios from 'axios';
import React from 'react';

export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestData: [],
    };
  }

  handleRequest = async (e) => {
    e.preventDefault();
    const currentInput = e.target.value;
    if (currentInput === '') {
      this.setState(() => ({ requestData: [] }));
    } else {
      const res = await axios.get('/countries', { params: { term: currentInput } });
      this.setState(() => ({ requestData: res.data }));
    }
  };

  renderRequests() {
    const { requestData } = this.state;
    if (requestData.length !== 0) {
      return (
        <ul>
          {requestData.map((country) => <li key={country}>{country}</li>)}
        </ul>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        <form>
          <input type="text" className="form-control" placeholder="Enter Country" onChange={this.handleRequest} />
        </form>
        {this.renderRequests()}
      </div>
    );
  }
}

/* index.jsx */

import { createRoot } from 'react-dom/client';
import React from 'react';

import Autocomplete from './Autocomplete.jsx';

const container = document.getElementById('container');
const root = createRoot(container);
root.render(<Autocomplete />);

/* __tests__ */

import '@testing-library/jest-dom';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Autocomplete from '../src/Autocomplete.jsx';

const server = setupServer(
  rest.get('/countries', (req, res, ctx) => {
    const query = req.url.searchParams.get('term');

    switch (query) {
      case 'a':
        return res(
          ctx.status(200),
          ctx.json(['afghanistan', 'albania', 'algeria']),
        );
      case 'al':
        return res(
          ctx.status(200),
          ctx.json(['albania', 'algeria']),
        );
      case 'alb':
        return res(
          ctx.status(200),
          ctx.json(['albania']),
        );
      case '':
        return res(
          ctx.status(200),
          ctx.json([]),
        );
      default:
        throw new Error(`No match for query ${query}`);
    }
  }),
);

beforeAll(() => {
  server.listen({
    onUnhandledRequest(req) {
      console.error( // eslint-disable-line no-console
        'Found an unhandled %s request to %s',
        req.method,
        req.url.href,
      );
    },
  });
});

afterAll(() => {
  server.close();
});

it('Autocomplete', async () => {
  render(<Autocomplete />);

  const input = screen.getByRole('textbox');
  await userEvent.type(input, 'a');

  const result1 = await screen.findByRole('list');
  expect(result1).toContainElement(screen.getByText('afghanistan'));
  expect(result1).toContainElement(screen.getByText('albania'));
  expect(result1).toContainElement(screen.getByText('algeria'));

  await userEvent.type(input, 'l');

  const result2 = await screen.findByRole('list');

  await waitFor(() => {
    expect(result2).not.toContainElement(screen.queryByText('afghanistan'));
  });
  expect(result2).toContainElement(screen.getByText('albania'));
  expect(result2).toContainElement(screen.getByText('algeria'));

  await userEvent.type(input, 'b');
  const result3 = await screen.findByRole('list');
  await waitFor(() => {
    expect(result3).not.toContainElement(screen.queryByText('afghanistan'));
  });
  await waitFor(() => {
    expect(result3).not.toContainElement(screen.queryByText('algeria'));
  });
  expect(result3).toContainElement(screen.getByText('albania'));

  await userEvent.clear(input);

  await waitFor(() => {
    expect(input).toHaveValue('');
    const result4 = screen.queryByRole('list');
    expect(result4).not.toBeInTheDocument();
  });
});
