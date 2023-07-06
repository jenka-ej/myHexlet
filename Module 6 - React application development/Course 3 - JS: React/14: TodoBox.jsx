import { uniqueId } from 'lodash';
import React from 'react';
import Item from './Item.jsx';

export default class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      taskInput: '',
    };
  }

  taskHandle = (e) => this.setState(() => ({ taskInput: e.target.value }));

  taskSubmit = (e) => {
    e.preventDefault();
    this.setState(({ tasks, taskInput }) => {
      const newTasks = [{ taskName: taskInput, id: uniqueId() }, ...tasks];
      return { tasks: newTasks, taskInput: '' };
    });
  };

  taskRemove = (value) => (e) => {
    e.preventDefault();
    this.setState(({ tasks }) => {
      const newTasks = tasks.filter((task) => task.id !== value);
      return { tasks: newTasks };
    });
  };

  render() {
    const { tasks, taskInput } = this.state;
    return (
      <div>
        <div className="mb-3">
          <form className="d-flex">
            <div className="me-3">
              <input type="text" value={taskInput} required="" className="form-control" placeholder="I am going..." onChange={this.taskHandle} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={this.taskSubmit}>add</button>
          </form>
        </div>
        {tasks.map((task) => <Item task={task} onRemove={this.taskRemove} key={task.id} />)}
      </div>
    );
  }
}

/* Item.jsx */

import React from 'react';

export default class Item extends React.Component {
  render() {
    const { task, onRemove } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-auto">
            <button type="button" className="btn btn-primary btn-sm" onClick={onRemove(task.id)}>-</button>
          </div>
          <div className="col">{task.taskName}</div>
        </div>
        <hr />
      </div>
    );
  }
}

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import TodoBox from './TodoBox.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<TodoBox />);

/* __tests__ */

import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TodoBox from '../src/TodoBox.jsx';

beforeEach(() => {
  render(<TodoBox />);
});

test('working', async () => {
  expect(screen.getByRole('textbox')).toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'my first task');
  expect(screen.getByRole('textbox')).toHaveDisplayValue('my first task');

  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByRole('textbox')).toHaveDisplayValue('');
  expect(screen.getByText('my first task')).toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'my second task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  await userEvent.type(screen.getByRole('textbox'), 'one more task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getByText('my second task')).toBeInTheDocument();
  expect(screen.getByText('one more task')).toBeInTheDocument();

  const secondTask = screen.getByText('my second task');
  const btnToRemoveSecondTask = within(secondTask.parentNode).getByRole('button', { name: '-' });
  await userEvent.click(btnToRemoveSecondTask);
  expect(screen.queryByText('my second task')).not.toBeInTheDocument();
  expect(screen.getByText('my first task')).toBeInTheDocument();
  expect(screen.getByText('one more task')).toBeInTheDocument();

  const firstTask = screen.getByText('my first task');
  const btnToRemoveFirstTask = within(firstTask.parentNode).getByRole('button', { name: '-' });
  await userEvent.click(btnToRemoveFirstTask);
  expect(screen.queryByText('my first task')).not.toBeInTheDocument();
  expect(screen.getByText('one more task')).toBeInTheDocument();
});

test('identical tasks', async () => {
  await userEvent.type(screen.getByRole('textbox'), 'my first task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  await userEvent.type(screen.getByRole('textbox'), 'my first task');
  await userEvent.click(screen.getByRole('button', { name: /add/i }));
  expect(screen.getAllByText('my first task')).toHaveLength(2);

  const btnToRemoveSecondTask = screen.getAllByRole('button', { name: '-' })[1];
  await userEvent.click(btnToRemoveSecondTask);
  expect(screen.getAllByText('my first task')).toHaveLength(1);
});
