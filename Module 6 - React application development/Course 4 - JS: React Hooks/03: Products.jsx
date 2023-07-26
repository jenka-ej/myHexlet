// Доработайте калькулятор суммы покупок так, чтобы в него подгружался список продуктов.
// Используйте асинхронную функцию getProducts() для получения списка продуктов.
// Добавьте в компонент загрузку данных. Данные должны загружаться только один раз при первом рендеринге компонента.

import React, { useState, useEffect } from 'react';

import Product from './Product.jsx';
import getProducts from './utils.js';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [countProducts, setCountProducts] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const handleIncrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    setTotalPrice(totalPrice + price);

    const newCountProducts = { ...countProducts, [id]: count + 1 };
    setCountProducts(newCountProducts);
  };

  const handleDecrement = ({ id, price }) => {
    const count = countProducts[id] ?? 0;
    if (count === 0) {
      return;
    }
    setTotalPrice(totalPrice - price);

    const newCountProducts = { ...countProducts, [id]: count - 1 };
    setCountProducts(newCountProducts);
  };

  useEffect(() => {
    const makeProducts = async () => {
      const newProducts = await getProducts();
      setProducts(newProducts);
    };
    makeProducts();
  }, []);

  return (
    <>
      <ul data-testid="products">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            countProduct={countProducts[product.id]}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        ))}
      </ul>
      <div>
        {`Итого цена: ${totalPrice}`}
      </div>
    </>
  );
};

export default Products;

/* Product.jsx */

import React from 'react';

const Product = (props) => {
  const {
    product,
    countProduct,
    handleIncrement,
    handleDecrement,
  } = props;
  const { name, id, price } = product;

  return (
    <li data-testid={id} key={id}>
      <div className="col-2 ">
        {`${name}. Цена: ${price} р.`}
      </div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary" data-testid={`decrement-${id}`} type="button" onClick={() => handleDecrement(product)}>-</button>
        </div>
        <input type="number" value={countProduct || ''} disabled placeholder="0" className="col-1" />
        <div className="input-group-append">
          <button className="btn btn-outline-secondary" data-testid={`increment-${id}`} type="button" onClick={() => handleIncrement(product)}>+</button>
        </div>
      </div>
      <hr />
    </li>
  );
};

export default Product;

/* products.json */

[
  {
    "name": "Хлеб",
    "id": 1,
    "price": 25,
    "count": 0
  },
  {
    "name": "Молоко",
    "id": 2,
    "price": 45,
    "count": 0
  },
  {
    "name": "Чай",
    "id": 3,
    "price": 150,
    "count": 0
  }
]

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Products from './Products.jsx';

const mountNode = document.getElementById('container');
const root = ReactDOM.createRoot(mountNode);
root.render(<Products />);

/* utils.js */

import 'whatwg-fetch';

export default async () => {
  const response = await fetch('/src/products.json');
  return response.json();
};

/* __tests__ */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import { rest } from 'msw';
import { setupServer } from 'msw/node';

import Products from '../src/Products.jsx';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('check work', async () => {
  const products = [
    {
      name: 'Хлеб', id: 1, price: 25, count: 0,
    },
    {
      name: 'Молоко', id: 2, price: 45, count: 0,
    },
  ];

  const requestHanler = jest.fn((req, res, ctx) => res(ctx.json(products)));

  server.use(rest.get('/src/products.json', requestHanler));

  await render(<Products />);

  expect(await screen.getByTestId('products')).toBeInTheDocument();

  await waitFor(async () => {
    expect(screen.getByTestId(products[0].id)).toBeInTheDocument();
  });

  await userEvent.click(await screen.getByTestId(`increment-${products[0].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[0].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[1].id}`));
  await userEvent.click(await screen.getByTestId(`increment-${products[1].id}`));
  await userEvent.click(await screen.getByTestId(`decrement-${products[0].id}`));
  const totalPrice = products[0].price + products[1].price * 2;
  expect(screen.getByText(`Итого цена: ${totalPrice}`)).toBeInTheDocument();

  expect(requestHanler).toHaveBeenCalledTimes(1);
});
