// В этой задаче вам предстоит сделать список задач похожий на Reminders из MacOS. Reminder позволяет планировать задачи и создавать списки задач. 
// По умолчанию, в нашей реализации сразу должен быть создан список General. Начальный HTML доступен в public/index.html. 
// После инициализации js он становится таким (туда добавляется General):

// <div class="row">
//   <div class="col">
//     <h3>Lists</h3>
//     <form class="form-inline mb-2" data-container="new-list-form">
//       <label for="new-list-name" class="sr-only">New list name</label>
//       <input
//         type="text"
//         id="new-list-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add List" />
//     </form>
//     <div data-container="lists">
//       <ul>
//         <li><b>General</b></li>
//       </ul>
//     </div>
//   </div>
//   <div class="col">
//     <h3>Tasks</h3>
//     <form class="form-inline mb-2" data-container="new-task-form">
//       <label for="new-task-name" class="sr-only">New task name</label>
//       <input
//         type="text"
//         id="new-task-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add Task" />
//     </form>
//     <div data-container="tasks"></div>
//   </div>
// </div>

// После добавления первой задачи в список General:

// <div class="row">
//   <div class="col">
//     <h3>Lists</h3>
//     <form class="form-inline mb-2" data-container="new-list-form">
//       <label for="new-list-name" class="sr-only">New list name</label>
//       <input
//         type="text"
//         id="new-list-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add List" />
//     </form>
//     <div data-container="lists">
//       <ul>
//         <li><b>General</b></li>
//       </ul>
//     </div>
//   </div>
//   <div class="col">
//     <h3>Tasks</h3>
//     <form class="form-inline mb-2" data-container="new-task-form">
//       <label for="new-task-name" class="sr-only">New task name</label>
//       <input
//         type="text"
//         id="new-task-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add Task" />
//     </form>
//     <div data-container="tasks">
//       <ul>
//         <li>My First Task</li>
//       </ul>
//     </div>
//   </div>
// </div>

// После создания нового списка (но до переключения на него):

// <div class="row">
//   <div class="col">
//     <h3>Lists</h3>
//     <form class="form-inline mb-2" data-container="new-list-form">
//       <label for="new-list-name" class="sr-only">New list name</label>
//       <input
//         type="text"
//         id="new-list-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add List" />
//     </form>
//     <div data-container="lists">
//       <ul>
//         <li><b>General</b></li>
//         <li><a href="#random">Random</a></li>
//       </ul>
//     </div>
//   </div>
//   <div class="col">
//     <h3>Tasks</h3>
//     <form class="form-inline mb-2" data-container="new-task-form">
//       <label for="new-task-name" class="sr-only">New task name</label>
//       <input
//         type="text"
//         id="new-task-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add Task" />
//     </form>
//     <div data-container="tasks">
//       <ul>
//         <li>My First Task</li>
//       </ul>
//     </div>
//   </div>
// </div>

// После переключения на список Random (клик по имени):

// <div class="row">
//   <div class="col">
//     <h3>Lists</h3>
//     <form class="form-inline mb-2" data-container="new-list-form">
//       <label for="new-list-name" class="sr-only">New list name</label>
//       <input
//         type="text"
//         id="new-list-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add List" />
//     </form>
//     <div data-container="lists">
//       <ul>
//         <li><a href="#general">General</a></li>
//         <li><b>Random</b></li>
//       </ul>
//     </div>
//   </div>
//   <div class="col">
//     <h3>Tasks</h3>
//     <form class="form-inline mb-2" data-container="new-task-form">
//       <label for="new-task-name" class="sr-only">New task name</label>
//       <input
//         type="text"
//         id="new-task-name"
//         class="form-control mr-2"
//         name="name"
//         required
//       />
//       <input type="submit" class="btn btn-primary" value="Add Task" />
//     </form>
//     <div data-container="tasks"></div>
//   </div>
// </div>

// Списки должны иметь уникальные имена. Добавление списка с уже существующим именем не должно производить никакого эффекта.

// Экспортируйте функцию по умолчанию, которая реализует всю необходимую логику.

export default () => {
  const state = [
    {
      id: 'general',
      status: 'active',
    },
  ];

  const tasks = [];
  const temp = {
    list: '',
    task: '',
  };

  const renderList = (element) => {
    const currentId = element.textContent;
    const tasksContainer = document.querySelector('[data-container="tasks"] > ul');
    if (tasksContainer) {
      tasksContainer.remove();
    }
    if (tasks.filter((task) => task.id === currentId).length === 0) {
      return;
    }
    const ul = document.createElement('ul');
    tasks.map((task) => {
      if (task.id === currentId) {
        const li = document.createElement('li');
        li.textContent = task.task;
        ul.append(li);
      }
      return null;
    });
    document.querySelector('[data-container="tasks"]').append(ul);
  };

  const changeActive = (element) => {
    const currentId = element.textContent;
    const currentActive = state.filter((list) => list.status === 'active')[0];
    if (currentId === currentActive.id) {
      return;
    }
    currentActive.status = 'passive';
    const currentState = state.filter((list) => list.id === currentId)[0];
    currentState.status = 'active';
    const activeElementsToDelete = document.querySelector('[data-container="lists"] > ul > li > b');
    const a = document.createElement('a');
    a.setAttribute('href', `#${activeElementsToDelete.textContent}`);
    a.textContent = activeElementsToDelete.textContent;
    activeElementsToDelete.replaceWith(a);
    element.parentNode.innerHTML = `<b>${currentId}</b>`;
  };

  const generalBegin = () => {
    const div = document.querySelector('[data-container="lists"]');
    const ul = document.createElement('ul');
    div.append(ul);
    const li = document.createElement('li');
    ul.append(li);
    const b = document.createElement('b');
    b.textContent = 'general';
    li.append(b);
    li.addEventListener('click', (e) => {
      e.preventDefault();
      changeActive(e.target);
      renderList(e.target);
    });
  };
  generalBegin();

  const inputList = document.querySelector('#new-list-name');
  const inputTask = document.querySelector('#new-task-name');
  const submitList = document.querySelector('[data-container="new-list-form"] > [type="submit"]');
  const submitTask = document.querySelector('[data-container="new-task-form"] > [type="submit"]');

  inputList.addEventListener('keyup', (e) => {
    temp.list = e.target.value;
  });
  inputTask.addEventListener('keyup', (e) => {
    temp.task = e.target.value;
  });
  submitList.addEventListener('click', (e) => {
    e.preventDefault();
    if (state.filter((list) => list.id === temp.list).length !== 0) {
      return;
    }
    state.push({
      id: temp.list,
      status: 'passive',
    });
    inputList.value = '';
    inputList.focus();
    const div = document.querySelector('[data-container="lists"] > ul');
    const li = document.createElement('li');
    div.append(li);
    const a = document.createElement('a');
    a.setAttribute('href', `#${temp.list}`);
    a.textContent = temp.list;
    li.append(a);
    li.addEventListener('click', (event) => {
      event.preventDefault();
      changeActive(event.target);
      renderList(event.target);
    });
  });
  submitTask.addEventListener('click', (e) => {
    e.preventDefault();
    const activeList = state.filter((list) => list.status === 'active')[0].id;
    tasks.push({
      id: activeList,
      task: temp.task,
    });
    inputTask.value = '';
    inputTask.focus();
    if (!document.querySelector('[data-container="tasks"] > ul')) {
      const div = document.querySelector('[data-container="tasks"]');
      const ul = document.createElement('ul');
      div.append(ul);
    }
    const li = document.createElement('li');
    li.textContent = temp.task;
    document.querySelector('[data-container="tasks"] > ul').append(li);
  });
};

/* __tests__ */

import '@testing-library/jest-dom';
import fs from 'fs';
import path from 'path';
import testingLibraryDom from '@testing-library/dom';
import userEvent from '@testing-library/user-event';

import run from '../src/application.js';

const { screen } = testingLibraryDom;

beforeEach(() => {
  const initHtml = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
  document.body.innerHTML = initHtml;
  run();
});

test('application', async () => {
  const task1 = 'First Task in General';
  await userEvent.type(screen.getByLabelText(/new task name/i), task1);
  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue(task1);
  await userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue('');
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));

  const task2 = 'Second Task in General';
  await userEvent.clear(screen.getByLabelText(/new task name/i));
  await userEvent.type(screen.getByLabelText(/new task name/i), task2);
  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue(task2);
  await userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(screen.getByLabelText(/new task name/i)).toHaveDisplayValue('');
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));

  const list1 = 'Random';
  await userEvent.clear(screen.getByLabelText(/new task name/i));
  await userEvent.type(screen.getByRole('textbox', { name: /new list name/i }), list1);
  expect(screen.getByRole('textbox', { name: /new list name/i })).toHaveDisplayValue(list1);
  await userEvent.click(screen.getByRole('button', { name: /add list/i }));
  expect(screen.getByRole('textbox', { name: /new list name/i })).toHaveDisplayValue('');

  await userEvent.clear(screen.getByRole('textbox', { name: /new list name/i }));
  await userEvent.type(screen.getByRole('textbox', { name: /new list name/i }), list1);

  await userEvent.click(screen.getByRole('button', { name: /add list/i }));
  expect(screen.getAllByRole('textbox', { name: /new list name/i })).toHaveLength(1);

  expect(screen.getByRole('link', { name: list1 })).toBeInTheDocument();
  expect(document.querySelector('[data-container="lists"]')).toContainElement(screen.getByText(list1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));

  await userEvent.click(screen.getByText(list1));

  expect(screen.queryByRole('link', { name: list1 })).not.toBeInTheDocument();
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();

  const task3 = 'Task in Random';
  await userEvent.clear(screen.getByLabelText(/new task name/i));
  await userEvent.type(screen.getByLabelText(/new task name/i), task3);
  await userEvent.click(screen.getByRole('button', { name: /add task/i }));

  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task3));

  await userEvent.click(screen.getByRole('link', { name: /general/i }));

  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));

  await userEvent.click(screen.getByText(list1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task3));

  await userEvent.click(screen.getByRole('link', { name: /general/i }));

  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task1));
  expect(document.querySelector('[data-container="tasks"]')).toContainElement(screen.getByText(task2));
});

test('fresh application', () => {
  expect(document.querySelector('[data-container="tasks"]')).toBeEmptyDOMElement();
  expect(document.querySelector('[data-container="lists"]')).toContainElement(screen.getByRole('listitem'));
});
