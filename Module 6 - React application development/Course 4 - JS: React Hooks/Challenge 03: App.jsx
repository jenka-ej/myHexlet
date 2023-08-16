// Реализуйте и экспортируйте по умолчанию компонент, который реализует приложение "записная книжка".
// В этом приложении можно добавлять, удалять и редактировать задачи с помощью модальных окон. 
// На любое действие возникает модальное окно, внутри которого можно выполнять разные действия.

// Начальный HTML:
// <div class="mb-3">
//   <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
// </div>

// После клика на добавление:
// <div class="mb-3">
//   <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
// </div>
// <div class="modal-dialog">
//   <div class="modal-content">
//     <div class="modal-header">
//       <div class="modal-title h4">Add</div>
//       <button type="button" class="btn-close" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//       <form>
//         <div class="form-group">
//           <input class="form-control" data-testid="input-body" name="body" required="" value="" />
//         </div>
//         <input class="btn btn-primary" type="submit" value="submit" />
//       </form>
//     </div>
//   </div>
// </div>

// После добавления первой задачи:
// <div class="mb-3">
//   <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
// </div>
// <div>
//   <span class="mr-3">first task!</span>
//   <button type="button" class="border-0 btn btn-link mr-3 text-decoration-none" data-testid="item-rename">rename</button>
//   <button type="button" class="border-0 btn btn-link text-decoration-none" data-testid="item-remove">remove</button>
// </div>

// Клик по переименованию:
// <div class="mb-3">
//   <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
// </div>
// <div>
//   <span class="mr-3">first task!</span>
//   <button type="button" class="border-0 btn btn-link mr-3 text-decoration-none" data-testid="item-rename">rename</button>
//   <button type="button" class="border-0 btn btn-link text-decoration-none" data-testid="item-remove">remove</button>
// </div>
// <div class="modal-dialog">
//   <div class="modal-content">
//     <div class="modal-header">
//       <div class="modal-title h4">Rename</div>
//       <button type="button" class="btn-close" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//       <form>
//         <div class="form-group">
//           <input class="form-control" data-testid="input-body" name="body" required="" value="first task!" />
//         </div>
//         <input class="btn btn-primary" type="submit" value="submit" />
//       </form>
//     </div>
//   </div>
// </div>

// После переименования все возвращается к предыдущему HTML, но с новым именем.

// Клик по удалению:
// <div class="mb-3">
//   <button type="button" data-testid="item-add" class="btn btn-secondary">add</button>
// </div>
// <div>
//   <span class="mr-3">changed name!</span>
//   <button type="button" class="border-0 btn btn-link mr-3 text-decoration-none" data-testid="item-rename">rename</button>
//   <button type="button" class="border-0 btn btn-link text-decoration-none" data-testid="item-remove">remove</button>
// </div>
// <div class="modal-dialog">
//   <div class="modal-content">
//     <div class="modal-header">
//       <div class="modal-title h4">Remove</div>
//       <button type="button" class="btn-close" aria-label="Close"></button>
//     </div>
//     <div class="modal-body">
//       <form>
//         <div class="form-group">
//           <input class="btn btn-danger" type="submit" value="remove" />
//         </div>
//       </form>
//     </div>
//   </div>
// </div>

// После удаления, запись пропадает.

// Реализуйте модальное окно для добавления задачи. Сделайте так, чтобы при появлении окна происходила фокусировка на поле для ввода. 
// Это важно с точки зрения удобства.

// Реализуйте модальное окно для обновления названия задачи. Сделайте так, чтобы при появлении окна происходила фокусировка на поле для ввода и 
// при этом выделялся весь текст. Это важно с точки зрения удобства.

// Реализуйте модальное окно для удаления задачи
// Все модальные окна должны закрываться после отправки формы

import React, { useState } from 'react';
import { useImmer } from 'use-immer';
import getModal from './modals/index.js';

const App = () => {
  const [state, changeState] = useImmer({ tasks: [], currentTask: {} });
  const [modal, changeModal] = useState({ currentModal: null });
  const parseId = {
    'item-add': 'adding',
    'item-rename': 'renaming',
    'item-remove': 'removing',
  };

  const handleClose = () => {
    changeModal(() => ({ currentModal: null }));
  };

  const handleShow = (e, task = null) => {
    const id = parseId[e.target.attributes['data-testid'].value];
    if (task) {
      changeState(({ tasks }) => ({ tasks, currentTask: task }));
    }
    changeModal(() => ({ currentModal: id }));
  };

  const makeComponent = (props) => {
    if (!modal.currentModal) {
      return null;
    }
    const Component = getModal(modal.currentModal);
    return <Component props={props} />;
  };

  return (
    <>
      <div className="mb-3">
        <button type="button" data-testid="item-add" className="btn btn-secondary" onClick={(e) => handleShow(e)}>add</button>
      </div>
      {state.tasks.map((task, index) => {
        const { name } = task;
        const key = `item-${index}`;
        return (
          <div key={key}>
            <span className="mr-3">{name}</span>
            <button type="button" className="border-0 btn btn-link mr-3 text-decoration-none" data-testid="item-rename" onClick={(e) => handleShow(e, task)}>rename</button>
            <button type="button" className="border-0 btn btn-link text-decoration-none" data-testid="item-remove" onClick={(e) => handleShow(e, task)}>remove</button>
          </div>
        );
      })}
      {makeComponent({
        handleClose,
        state,
        changeState,
        changeModal,
      })}
    </>
  );
};

export default App;

/* Add.jsx */

import React, { useEffect, useRef } from 'react';
import _ from 'lodash';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

const Add = ({ props }) => {
  const {
    handleClose,
    state,
    changeState,
  } = props;
  const { tasks, currentTask } = state;

  const inputEl = useRef(null);
  useEffect(() => inputEl.current.focus(), []);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: () => {
      const newTask = { name: formik.values.body, id: _.uniqueId() };
      changeState(() => ({ tasks: [...tasks, newTask], currentTask }));
      handleClose();
    },
  });

  return (
    <Modal show onHide={handleClose} backdrop="static" keyboard="false">
      <div className="modal-header">
        <div className="modal-title h4">Add</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} />
      </div>
      <div className="modal-body">
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              data-testid="input-body"
              name="body"
              required=""
              onChange={formik.handleChange}
              value={formik.values.body}
              ref={inputEl}
              onBlur={formik.handleBlur}
            />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default Add;

/* Remove.jsx */

import React from 'react';
import { Modal, FormGroup } from 'react-bootstrap';

const Remove = ({ props }) => {
  const {
    handleClose,
    state,
    changeState,
  } = props;
  const { tasks, currentTask } = state;
  const { id } = currentTask;

  const handleRemove = (e) => {
    e.preventDefault();
    const newTasks = tasks.filter((task) => task.id !== id);
    changeState(() => ({ tasks: newTasks, currentTask }));
    handleClose();
  };

  return (
    <Modal show onHide={handleClose} backdrop="static" keyboard="false">
      <div className="modal-header">
        <div className="modal-title h4">Remove</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} />
      </div>
      <div className="modal-body">
        <form onSubmit={(e) => handleRemove(e)}>
          <FormGroup className="mb-3" />
          <input className="btn btn-danger" type="submit" value="remove" />
        </form>
      </div>
    </Modal>
  );
};

export default Remove;

/* Rename.jsx */

import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Modal, FormGroup, FormControl } from 'react-bootstrap';

const Rename = ({ props }) => {
  const {
    handleClose,
    state,
    changeState,
  } = props;
  const { tasks, currentTask } = state;
  const { name, id } = currentTask;

  const inputEl = useRef(null);
  useEffect(() => inputEl.current.select(), []);

  const formik = useFormik({
    initialValues: {
      body: name,
    },
    onSubmit: () => {
      const newName = formik.values.body;
      const newTasks = tasks.map((task) => {
        if (task.id === id) {
          return { name: newName, id };
        }
        return task;
      });
      changeState(() => ({ tasks: newTasks, currentTask }));
      handleClose();
    },
  });

  return (
    <Modal show onHide={handleClose} backdrop="static" keyboard="false">
      <div className="modal-header">
        <div className="modal-title h4">Rename</div>
        <button type="button" className="btn-close" aria-label="Close" onClick={handleClose} />
      </div>
      <div className="modal-body">
        <form onSubmit={formik.handleSubmit}>
          <FormGroup className="mb-3">
            <FormControl
              data-testid="input-body"
              name="body"
              required=""
              onChange={formik.handleChange}
              value={formik.values.body}
              ref={inputEl}
              onBlur={formik.handleBlur}
            />
          </FormGroup>
          <input className="btn btn-primary" type="submit" value="submit" />
        </form>
      </div>
    </Modal>
  );
};

export default Rename;

/* index.js */

import Add from './Add.jsx';
import Remove from './Remove.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Remove,
  renaming: Rename,
};

export default (modalName) => modals[modalName];

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import App from './App.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<App />);

/* __tests__ */

import React from 'react';
import { waitFor, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

import App from '../src/App.jsx';

// TODO: временное решение, пока не обновится либа
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/Warning: ReactDOM.render is no longer supported in React 18./.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
//

describe('App', () => {
  it('application', () => {
    const { asFragment } = render(<App />, { legacyRoot: true, root: 'concurrent' });
    expect(asFragment()).toMatchSnapshot();
  });

  it('application 2', async () => {
    const { asFragment } = render(<App />, { legacyRoot: true, root: 'concurrent' });
    expect(asFragment()).toMatchSnapshot();

    const addButton = screen.getByTestId('item-add');

    await userEvent.click(addButton);
    await waitFor(() => {
      expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
    });
    await userEvent.click(screen.getByLabelText(/close/i));
    await waitFor(() => {
      expect(screen.queryByTestId('input-body')).not.toBeInTheDocument();
    });

    await userEvent.click(addButton);
    expect(await screen.findByTestId('input-body')).toBeInTheDocument();

    const addingSubmitButton = screen.getByText('submit');
    const addingFormInput = screen.getByTestId('input-body');
    await act(() => userEvent.type(addingFormInput, 'first task!'));
    await act(() => userEvent.click(addingSubmitButton));

    await waitFor(() => {
      expect(addingSubmitButton).not.toBeInTheDocument();
      expect(screen.getByText('first task!')).toBeInTheDocument();
    });

    await act(() => userEvent.click(screen.getByTestId('item-rename')));
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/close/i));
    await waitFor(() => {
      expect(screen.queryByTestId('input-body')).not.toBeInTheDocument();
    });

    await act(() => userEvent.click(screen.getByTestId('item-rename')));

    const renamingFormInput = screen.getByTestId('input-body');
    const renamingSubmitButton = screen.getByText('submit');
    await userEvent.clear(renamingFormInput);
    await act(() => userEvent.type(renamingFormInput, 'changed name!'));
    await act(() => userEvent.click(renamingSubmitButton));
    await waitFor(() => {
      expect(renamingSubmitButton).not.toBeInTheDocument();
    });
    expect(screen.getByText('changed name!')).toBeInTheDocument();

    await act(() => userEvent.click(screen.getByTestId('item-remove')));
    expect(screen.getByLabelText(/close/i)).toBeInTheDocument();
    await userEvent.click(screen.getByLabelText(/close/i));
    await waitFor(() => {
      expect(screen.queryByRole('button', { name: /close/i })).not.toBeInTheDocument();
    });

    await act(() => userEvent.click(screen.getByTestId('item-remove')));

    const removingSubmitButton = screen.getByText('remove', { selector: 'input' });
    await userEvent.click(removingSubmitButton);
    await waitFor(async () => {
      expect(await screen.queryByText('changed name!')).not.toBeInTheDocument();
    });
  });
});
