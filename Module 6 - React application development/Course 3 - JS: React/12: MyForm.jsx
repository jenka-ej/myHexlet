// Реализуйте компонент <MyForm>, отображающий форму из шести элементов:
// 1) email – инпут типа email
// 2) password – инпут типа password
// 3) address – textarea
// 4) city – текстовый инпут
// 5) country – select со следующими значениями: argentina, russia, china
// 6) accept Rules – checkbox булево значение должно быть приведено к строке

// После сабмита формы появляется таблица, в которой показываются значения всех полей. Из этой формы можно вернуться в редактирование по кнопке Back. 
// При этом все данные должны оказаться на своих местах.

// Строки сортируются в алфавитном порядке по именам в первом столбце. В вашем случае результирующая таблица может отличаться, все зависит от того, 
// какие данные выбраны, но названия полей должны быть как указано в примере.

import React from 'react';

export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      address: '',
      city: '',
      country: '',
      acceptRules: false,
      submit: false,
    };
  }

  emailChange = (e) => this.setState({ email: e.target.value });

  passwordChange = (e) => this.setState({ password: e.target.value });

  addressChange = (e) => this.setState({ address: e.target.value });

  cityChange = (e) => this.setState({ city: e.target.value });

  countryChange = (e) => this.setState({ country: e.target.value });

  rulesChange = () => this.setState(({ acceptRules }) => ({ acceptRules: !acceptRules }));

  submitChange = (e) => {
    e.preventDefault();
    return this.setState(({ submit }) => ({ submit: !submit }));
  };

  renderForm = () => {
    const {
      email,
      password,
      address,
      city,
      country,
      acceptRules,
    } = this.state;
    return (
      <form name="myForm" onSubmit={this.submitChange}>
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="col-form-label">Email</label>
          <input type="email" name="email" className="form-control" id="email" placeholder="Email" onChange={this.emailChange} value={email} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="password" className="col-form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" placeholder="Password" onChange={this.passwordChange} value={password} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="address" className="col-form-label">Address</label>
          <textarea type="text" className="form-control" name="address" id="address" placeholder="1234 Main St" onChange={this.addressChange} value={address} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="city" className="col-form-label">City</label>
          <input type="text" className="form-control" name="city" id="city" onChange={this.cityChange} value={city} />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="country" className="col-form-label">Country</label>
          <select id="country" name="country" className="form-control" onChange={this.countryChange} value={country}>
            <option value="">Choose</option>
            <option value="argentina">Argentina</option>
            <option value="russia">Russia</option>
            <option value="china">China</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <div className="form-check">
            <label className="form-check-label" htmlFor="rules">
              <input id="rules" type="checkbox" name="acceptRules" className="form-check-input" checked={acceptRules} onChange={this.rulesChange} />
              Accept Rules
            </label>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  };

  renderResult = () => {
    const {
      email,
      password,
      address,
      city,
      country,
      acceptRules,
    } = this.state;
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.submitChange}>Back</button>
        <table className="table">
          <tbody>
            <tr>
              <td>acceptRules</td>
              <td>{acceptRules.toString()}</td>
            </tr>
            <tr>
              <td>address</td>
              <td>{address}</td>
            </tr>
            <tr>
              <td>city</td>
              <td>{city}</td>
            </tr>
            <tr>
              <td>country</td>
              <td>{country}</td>
            </tr>
            <tr>
              <td>email</td>
              <td>{email}</td>
            </tr>
            <tr>
              <td>password</td>
              <td>{password}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  render() {
    const { submit } = this.state;
    if (submit) {
      return this.renderResult();
    }
    return this.renderForm();
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import MyForm from './MyForm.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<MyForm />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import MyForm from '../src/MyForm.jsx';

test('MyForm', async () => {
  const { asFragment } = render(<MyForm />);

  expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /address/i })).toBeInTheDocument();
  expect(screen.getByRole('textbox', { name: /city/i })).toBeInTheDocument();
  expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument();
  expect(screen.getByRole('checkbox', { name: /accept rules/i })).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(asFragment()).toMatchSnapshot();
  expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument();

  await userEvent.click(screen.getByRole('button', { name: /back/i }));
  expect(screen.getByRole('form')).toHaveFormValues({
    acceptRules: false,
    address: '',
    city: '',
    country: '',
    email: '',
    password: '',
  });

  await userEvent.click(screen.getByRole('checkbox', { name: /accept rules/i }));
  await userEvent.type(screen.getByRole('textbox', { name: /city/i }), 'My City');
  await userEvent.type(screen.getByRole('textbox', { name: /email/i }), 'test@email.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'mysuperpass');
  await userEvent.selectOptions(screen.getByRole('combobox', { name: /country/i }), ['russia']);
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }));

  expect(asFragment()).toMatchSnapshot();

  await userEvent.click(screen.getByRole('button', { name: /back/i }));

  expect(screen.getByRole('form')).toHaveFormValues({
    acceptRules: true,
    address: '',
    city: 'My City',
    country: 'russia',
    email: 'test@email.com',
    password: 'mysuperpass',
  });
});
