// В этом упражнении необходимо реализовать записную книжку, которая взаимодействует с бекендом по следующим урлам:
// 1) GET /api/tasks — получить список задач
// Формат ответа — [{"id":"1","text":"first task","state":"finished"},{"id":"2","text":"second task","state":"active"}]
// 2) POST /api/tasks — создать новую задачу
// Формат запроса — {"text": "another task"}
// Формат ответа — {"id":"3","text":"another task","state":"active"}
// 3) PATCH /api/tasks/:id/finish — завершить задачу
// Формат ответа — {"id":"1","text":"first task","state":"finished"}
// 4) PATCH /api/tasks/:id/activate — переоткрыть завершенную задачу
// Формат ответа - {"id":"1","text":"first task","state":"active"}

// Начальный HTML, при первой загрузке на сервере задач нет(GET /api/tasks возвращает пустой массив):
// <div>
//   <div class="mb-3">
//     <form class="todo-form mx-3">
//       <div class="d-flex col-md-3">
//         <input type="text" value="" required="" class="form-control me-3" placeholder="I am going...">
//         <button type="submit" class="btn btn-primary">add</button>
//       </div>
//     </form>
//   </div>
// </div>

// HTML после того как добавлены последовательно три задачи "first task", "second task" и "another task".
// <div>
//   <div class="mb-3">
//     <form class="todo-form mx-3">
//       <div class="d-flex col-md-3">
//         <input type="text" value="" required="" class="form-control me-3" placeholder="I am going...">
//         <button type="submit" class="btn btn-primary">add</button>
//       </div>
//     </form>
//   </div>
//   <div class="todo-active-tasks">
//     <div class="row">
//       <div class="col-1">3</div>
//       <div class="col">
//         <a href="#" class="todo-task">another task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">2</div>
//       <div class="col">
//         <a href="#" class="todo-task">second task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">1</div>
//       <div class="col">
//         <a href="#" class="todo-task">first task</a>
//       </div>
//     </div>
//   </div>
// </div>

// На последнюю добавленную был совершен клик, который перевел задачу в выполненные:
// <div>
//   <div class="mb-3">
//     <form class="todo-form mx-3">
//       <div class="d-flex col-md-3">
//         <input type="text" value="" required="" class="form-control me-3" placeholder="I am going...">
//         <button type="submit" class="btn btn-primary">add</button>
//       </div>
//     </form>
//   </div>
//   <div class="todo-active-tasks">
//     <div class="row">
//       <div class="col-1">2</div>
//       <div class="col">
//         <a href="#" class="todo-task">second task</a>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">1</div>
//       <div class="col">
//         <a href="#" class="todo-task">first task</a>
//       </div>
//     </div>
//   </div>
//   <div class="todo-finished-tasks">
//     <div class="row">
//       <div class="col-1">3</div>
//       <div class="col">
//         <s><a href="#" class="todo-task">another task</a></s>
//       </div>
//     </div>
//   </div>
// </div>

// После клика по задаче "second task":
// <div>
//   <div class="mb-3">
//     <form class="todo-form mx-3">
//       <div class="d-flex col-md-3">
//         <input type="text" value="" required="" class="form-control me-3" placeholder="I am going...">
//         <button type="submit" class="btn btn-primary">add</button>
//       </div>
//     </form>
//   </div>
//   <div class="todo-active-tasks">
//     <div class="row">
//       <div class="col-1">1</div>
//       <div class="col">
//         <a href="#" class="todo-task">first task</a>
//       </div>
//     </div>
//   </div>
//   <div class="todo-finished-tasks">
//     <div class="row">
//       <div class="col-1">3</div>
//       <div class="col">
//         <s><a href="#" class="todo-task">another task</a></s>
//       </div>
//     </div>
//     <div class="row">
//       <div class="col-1">2</div>
//       <div class="col">
//         <s><a href="#" class="todo-task">second task</a></s>
//       </div>
//     </div>
//   </div>
// </div>

// Реализуйте компонент <TodoBox>
// Первоначальная подгрузка задач с сервера должна происходить сразу после монтирования компонента в DOM
// Список выполненных задач должен идти после списка активных задач, при этом задачи в каждом списке должны идти в том порядке, 
// в котором они добавлялись (сверху последняя)

// Реализуйте компонент <Item> отвечающий за вывод конкретной записи
// Выполненная задача должна быть обёрнута в тэг <s> чтобы элемент отображался как перечеркнутый

import axios from 'axios';
import React from 'react';
import Item from './Item.jsx';
import routes from './routes.js';

export default class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentInput: '',
      tasks: [],
    };
  }

  async componentDidMount() {
    const temp = await axios.get(routes.tasksPath());
    this.setState(() => ({ tasks: temp.data }));
  }

  handleInput = (e) => {
    e.preventDefault();
    this.setState(() => ({ currentInput: e.target.value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { currentInput, tasks } = this.state;
    const temp = await axios.post(routes.tasksPath(), { text: currentInput });
    const newTasks = [temp.data].concat(tasks);
    this.setState(() => ({ currentInput: '', tasks: newTasks }));
  };

  changeState = (currentId) => async (e) => {
    e.preventDefault();
    const { tasks } = this.state;
    const currentTask = tasks.filter(({ id }) => Number(id) === Number(currentId))[0];
    const { id, state } = currentTask;
    let temp;
    if (state === 'active') {
      temp = await axios.patch(routes.finishTaskPath(id));
    }
    if (state === 'finished') {
      temp = await axios.patch(routes.activateTaskPath(id));
    }
    const newTasks = tasks.reduce((acc, task) => {
      if (Number(task.id) === Number(currentId)) {
        acc.push(temp.data);
      } else {
        acc.push(task);
      }
      return acc;
    }, []);
    this.setState(() => ({ tasks: newTasks }));
  };

  taskRender = (task) => {
    const { id } = task;
    return (
      <Item.Box task={task} key={id}>
        <Item.Text>{task}</Item.Text>
        <Item.Href onClick={this.changeState}>{task}</Item.Href>
      </Item.Box>
    );
  };

  render() {
    const { currentInput, tasks } = this.state;
    const activeTasks = tasks.filter(({ state }) => state === 'active');
    const finishedTasks = tasks.filter(({ state }) => state === 'finished');
    return (
      <div>
        <div className="mb-3">
          <form className="todo-form mx-3">
            <div className="d-flex col-md-3">
              <input type="text" value={currentInput} required className="form-control me-3" placeholder="I am going..." onChange={this.handleInput} />
              <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>add</button>
            </div>
          </form>
        </div>
        <Item.Active tasks={activeTasks}>
          {activeTasks.map((activeTask) => this.taskRender(activeTask))}
        </Item.Active>
        <Item.Finished tasks={finishedTasks}>
          {finishedTasks.map((finishedTask) => this.taskRender(finishedTask))}
        </Item.Finished>
      </div>
    );
  }
}

/* Item.jsx */

import React from 'react';

const Box = ({ children, task }) => {
  const { id } = task;
  return (
    <div className="row" key={id}>{children}</div>
  );
};

const Text = ({ children }) => {
  const { id } = children;
  return (
    <div className="col-1">{id}</div>
  );
};

const Href = ({ children, onClick }) => {
  const { id, text, state } = children;
  if (state === 'active') {
    return (
      <div className="col">
        <a href="#" className="todo-task" onClick={onClick(id)}>{text}</a>
      </div>
    );
  }
  return (
    <div className="col">
      <s><a href="#" className="todo-task" onClick={onClick(id)}>{text}</a></s>
    </div>
  );
};

const Active = ({ children, tasks }) => {
  if (tasks.length === 0) {
    return null;
  }
  return (
    <div className="todo-active-tasks">
      {children}
    </div>
  );
};

const Finished = ({ children, tasks }) => {
  if (tasks.length === 0) {
    return null;
  }
  return (
    <div className="todo-finished-tasks">
      {children}
    </div>
  );
};

export default class Item extends React.Component {
  static Box = Box;

  static Text = Text;

  static Href = Href;

  static Active = Active;

  static Finished = Finished;
}

/* routes.js */

const host = '/api';

export default {
  tasksPath: () => [host, 'tasks'].join('/'),
  finishTaskPath: (id) => [host, 'tasks', id, 'finish'].join('/'),
  activateTaskPath: (id) => [host, 'tasks', id, 'activate'].join('/'),
};

/* index.jsx */

import ReactDOM from 'react-dom/client';
import React from 'react';

import TodoBox from './TodoBox.jsx';

const root = ReactDOM.createRoot(document.getElementById('container'));
root.render(<TodoBox />);

/* __tests__ */

import React from 'react';
import nock from 'nock';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import TodoBox from '../src/TodoBox.jsx';

const host = 'http://localhost';

beforeAll(() => {
  nock.disableNetConnect();
});

afterAll(() => {
  nock.enableNetConnect();
});

test('TodoBox 1', async () => {
  const scope = nock(host)
    .get('/api/tasks')
    .reply(200, []);

  render(<TodoBox />);
  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();
  const submitBtn = screen.getByRole('button', { name: 'add' });
  expect(submitBtn).toBeInTheDocument();

  await waitFor(() => {
    const requestIsPerformed = scope.isDone();
    expect(requestIsPerformed).toBe(true);
  });

  nock(host)
    .post('/api/tasks', {
      text: 'new task',
    })
    .reply(200, { id: 1, state: 'active', text: 'new task' });

  await userEvent.type(input, 'new task');
  await userEvent.click(submitBtn);

  expect(await screen.findByRole('link', { name: 'new task' })).toBeInTheDocument();

  nock(host)
    .post('/api/tasks', {
      text: 'new task 2',
    })
    .reply(200, { id: 2, state: 'active', text: 'new task 2' });

  await userEvent.type(input, 'new task 2');
  await userEvent.click(submitBtn);

  expect(await screen.findByRole('link', { name: 'new task' })).toBeInTheDocument();
  expect(await screen.findByRole('link', { name: 'new task 2' })).toBeInTheDocument();
});

test('TodoBox 2', async () => {
  const tasks = [
    { id: 2, text: 'task 2', state: 'finished' },
    { id: 1, text: 'task 1', state: 'active' },
  ];
  const scope = nock(host)
    .get('/api/tasks')
    .reply(200, tasks);

  const { asFragment, container } = render(<TodoBox />);

  await waitFor(() => {
    const requestIsPerformed = scope.isDone();
    expect(requestIsPerformed).toBe(true);
  });
  expect(asFragment()).toMatchSnapshot();

  const activeTask = await screen.findByRole('link', { name: 'task 1' });

  const scope2 = nock(host)
    .patch(`/api/tasks/${tasks[1].id}/finish`)
    .reply(200, () => ({ ...tasks[1], state: 'finished' }));

  await userEvent.click(activeTask);

  await waitFor(() => {
    const requestIsPerformed = scope2.isDone();
    expect(requestIsPerformed).toBe(true);
    expect(container.getElementsByClassName('todo-finished-tasks')[0]).toHaveTextContent('task 1');
  });
  expect(asFragment()).toMatchSnapshot();

  const finishedTask = await screen.findByRole('link', { name: 'task 2' });
  const scope3 = nock(host)
    .patch(`/api/tasks/${tasks[0].id}/activate`)
    .reply(200, { ...tasks[0], state: 'active' });

  await userEvent.click(finishedTask);

  await waitFor(() => {
    const requestIsPerformed = scope3.isDone();
    expect(requestIsPerformed).toBe(true);
    expect(container.getElementsByClassName('todo-active-tasks')[0]).toHaveTextContent('task 2');
  });
  expect(asFragment()).toMatchSnapshot();
});
