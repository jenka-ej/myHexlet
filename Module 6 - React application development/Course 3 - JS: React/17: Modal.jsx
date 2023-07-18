// Реализуйте компонент <Modal> (Модальное окно)

// Использование:
// export default class Component extends React.Component {
//   state = { modal: false };
 
//   toggle = (e) => {
//     this.setState({
//       modal: !this.state.modal,
//     });
//   }
 
//   render() {
//     return (
//       <div>
//         <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
//         <Modal isOpen={this.state.modal}>
//           <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
//           <Modal.Body>
//             Lorem ipsum dolor sit amet, consectetur adipisicing elit
//           </Modal.Body>
//           <Modal.Footer>
//             <button type="button" className="modal-close-button btn btn-secondary" onClick={this.toggle}>Cancel</button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// HTML закрытого состояния:
// <div>
//   <button type="button" class="modal-open-button btn btn-danger">Open</button>
//   <div class="modal" style="display: none;" role="dialog">
//     <div class="modal-dialog">
//       <div class="modal-content">
//         <div class="modal-header">
//           <div class="modal-title">Modal title</div>
//           <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
//           </button>
//         </div>
//         <div class="modal-body">Lorem ipsum dolor sit amet, consectetur adipisicing elit</div>
//         <div class="modal-footer">
//           <button type="button" class="modal-close-button btn btn-default">Cancel</button>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>

// В открытом состоянии строчка: <div class="modal" style="display: none;"> заменяется на <div class="modal fade show" style="display: block;">
// У открытого модального окна две кнопки закрывающие его: крестик справа вверху и кнопка Cancel справа внизу

import cn from 'classnames';
import React from 'react';

const Header = (props) => {
  const { children, toggle } = props;
  return (
    <div className="modal-header">
      <div className="modal-title">{children}</div>
      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggle} />
    </div>
  );
};

const Body = (props) => {
  const { children } = props;
  return (
    <div className="modal-body">{children}</div>
  );
};

const Footer = (props) => {
  const { children } = props;
  return (
    <div className="modal-footer">{children}</div>
  );
};

export default class Modal extends React.Component {
  static Header = Header;

  static Body = Body;

  static Footer = Footer;

  render() {
    const { children, isOpen } = this.props;
    const modalClass = cn({
      modal: true,
      fade: isOpen,
      show: isOpen,
    });
    const modalStyle = {
      display: isOpen ? 'block' : 'none',
    };
    return (
      <div className={modalClass} style={modalStyle} role="dialog">
        <div className="modal-dialog">
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

/* Component.jsx */

import React from 'react';
import Modal from './Modal.jsx';

export default class Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = { modal: false };
  }

  toggle = () => {
    const { modal } = this.state;
    this.setState({
      modal: !modal,
    });
  };

  render() {
    const { modal } = this.state;
    return (
      <div>
        <button type="button" className="modal-open-button btn btn-danger" onClick={this.toggle}>Open</button>
        <Modal isOpen={modal}>
          <Modal.Header toggle={this.toggle}>Modal title</Modal.Header>
          <Modal.Body>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="modal-close-button btn btn-secondary" onClick={this.toggle}>Cancel</button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import Component from './Component.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<Component />);

/* __tests__ */

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Component from '../src/Component.jsx';

test('Component 1', async () => {
  render(<Component />);

  const modal = screen.getByRole('dialog', { hidden: true });
  expect(modal).not.toBeVisible();

  const openingButton = screen.getByRole('button', { name: /open/i });
  await userEvent.click(openingButton);
  expect(modal).toBeVisible();

  const closingButton1 = screen.getByRole('button', { name: /close/i });
  const closingButton2 = screen.getByRole('button', { name: /cancel/i });

  await userEvent.click(closingButton1);
  expect(modal).not.toBeVisible();
  expect(modal).not.toHaveClass('fade', 'show');

  await userEvent.click(openingButton);
  expect(modal).toBeVisible();
  expect(modal).toHaveClass('fade', 'show');

  await userEvent.click(closingButton2);
  expect(modal).not.toBeVisible();
  expect(modal).not.toHaveClass('fade', 'show');

  await userEvent.click(openingButton);
  expect(modal).toBeVisible();
  expect(modal).toHaveClass('fade', 'show');
});
